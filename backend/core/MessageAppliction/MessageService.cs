using System.ClientModel;
using System.Net.Mail;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;
using core.Base;
using core.Base.Authentication;
using core.Base.Exceptions;
using core.Base.SignalR;
using core.Data;
using core.Data.Entities;
using core.FlaggedChatApplication.Dtos;
using core.MessageApplication.Dtos;
using Microsoft.AspNetCore.SignalR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using OpenAI;
using OpenAI.Assistants;
using Message = core.Data.Entities.Message;

namespace core.MessageApplication
{
    public class MessageService
        : BaseService<GetMessageDto, CreateMessageDto, ModifyMessageDto, Message>,
            IMessageService
    {
        
        private readonly IConfiguration config;
        private readonly DataContext ctx;
        private readonly IMapper mapper;
        private readonly IEmployeeTokenAccessor employeeTokenAccessor;
        IHubContext<SignalRHub> hubContext;

        public MessageService(
            IConfiguration config,
            DataContext ctx,
            IMapper mapper,
            IEmployeeTokenAccessor employeeTokenAccessor, 
            IHubContext<SignalRHub> hubContext
        )
            : base(ctx, mapper)
        {
            this.config = config;
            this.ctx = ctx;
            this.mapper = mapper;
            this.employeeTokenAccessor = employeeTokenAccessor;
            this.hubContext = hubContext;
        }
        public async Task<GetMessageDto> GetAsync(Guid mId)
        {
            var entity = await ctx.Messages.Where(e => e.Id == mId).FirstOrDefaultAsync() ?? throw new EntityNotFoundException<Message>();
            return mapper.Map<GetMessageDto>(entity);
        }
        public async Task<ResultSetDto<GetMessageDto>> GetListAsync(Guid senderId, Guid receiverId)
        {
            var messages = await ctx.Messages
                .Where(e => (e.ReceiverId == receiverId && e.SenderId == senderId) || (e.ReceiverId == senderId && e.SenderId == receiverId))
                .OrderBy(m => m.CreatedAt)
                .ToListAsync();

            var result = new ResultSetDto<GetMessageDto>() { ResultCount = messages.Count(), Results = messages.Select(mapper.Map<GetMessageDto>) };
            return result;
        }
        public async Task<GetMessageDto> CreateAsync(CreateMessageDto createDto)
        {
            var newMessage = await base.CreateAsync(createDto);

            var messages = await ctx.Messages
                .Where(e => (e.ReceiverId == createDto.ReceiverId && e.SenderId == createDto.SenderId) || (e.ReceiverId == createDto.SenderId && e.SenderId == createDto.ReceiverId))
                .Include(m => m.Sender).OrderBy(m => m.CreatedAt).ToListAsync();

            var client = new OpenAIClient(config.GetValue<string>("OpenAI:ApiKey")).GetAssistantClient();
            AssistantCreationOptions assistantOptions = new()
            {
                Name = "Chat Analysis Assistant",
                Instructions = "The output structure must be a valid JSON object with a structure like: { \"ConflictPotential\": double, \"SensitiveLeak\": double, \"CriticalPhrases\": string[] } Your actual task is: You read the chats of employees to find potential foul language, use of swear words, conflict potential of leakage of confidential information. The conflict potential estimation should mainly focus on the presence of foul word or abusive language in general. If two employees have a different point of view on something but discuss it in appropriate manner we do not talk about conflict potential. .After reading you should analyse and estimate how likely this text is critical in any of the mentioned areas. Highlight any sections that support your reasoning."
                //Instructions = "The output structure must be a valid JSON object with a structure like: { \"ConflictPotential\": double, \"SensitiveLeak\": double, \"CriticalPhrases\": string[] } Your actual task is: You read the chats of employees to find potential foul language, use of swear words, conflict potential of leakage of confidential information. After reading you should analyse and estimate how likely this text is critical in any of the mentioned areas. Highlight any sections that support your reasoning."
            };
            Assistant assistant = client.CreateAssistant("gpt-4o", assistantOptions);
            ThreadCreationOptions threadMessages = new();
            foreach(var message in messages)
            {
                threadMessages.InitialMessages.Add(new ThreadInitializationMessage(MessageRole.User, new List<MessageContent>() { message.Sender.Firstname + " " + message.Sender.Lastname + ": " + message.Text } ));
            }

            ThreadRun threadRun = client.CreateThreadAndRun(assistant.Id, threadMessages);
            do
            {
                Thread.Sleep(TimeSpan.FromSeconds(1));
                threadRun = client.GetRun(threadRun.ThreadId, threadRun.Id);
            } while (!threadRun.Status.IsTerminal);

            ThreadMessage? response = client.GetMessages(threadRun.ThreadId, new MessageCollectionOptions() { Order = MessageCollectionOrder.Ascending })
                .Where(m => m.Role == MessageRole.Assistant).FirstOrDefault();

            if(response != null && response.Content.Count > 0){
                try
                {
                    var analysis = JsonSerializer.Deserialize<OpenAIAnalysisDto>(response.Content[0].Text.Replace("```json", "").Replace("```", ""));
                    if (analysis != null && (analysis.ConflictPotential > 0.5 || analysis.SensitiveLeak > 0.5))
                    {
                        var flaggedChat = new CreateFlaggedChatDto()
                        {
                            ConflictPotential = (float)analysis.ConflictPotential,
                            SenstivieLeak = (float)analysis.SensitiveLeak,
                            CriticalPhrases = analysis.CriticalPhrases,
                            EmployeeId = createDto.SenderId,
                            Employee2Id = createDto.ReceiverId
                        };
                        ctx.Add(mapper.Map<FlaggedChat>(flaggedChat));
                        await ctx.SaveChangesAsync();
                    }
                }
                catch(Exception ex)
                {

                }

            }   
            var clientId = ctx.Clients.Where(c => c.EmployeeId == createDto.ReceiverId).FirstOrDefault()?.ClientId;
            if(clientId != null) await hubContext.Clients.Client(clientId).SendAsync("ReceiveMessage", "user", JsonSerializer.Serialize(newMessage));
            return newMessage;
        }
        public async Task<GetMessageDto> ModifyAsync(ModifyMessageDto modifyDto)
        {
            var newMessage = await base.ModifyAsync(modifyDto.Id, modifyDto);
            return newMessage;
        }

    }
}