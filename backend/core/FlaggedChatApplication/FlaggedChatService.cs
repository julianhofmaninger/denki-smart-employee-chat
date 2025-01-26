using System.Net.Mail;
using AutoMapper;
using core.Base;
using core.Base.Authentication;
using core.Base.Exceptions;
using core.Data;
using core.FlaggedChatApplication.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using FlaggedChat = core.Data.Entities.FlaggedChat;

namespace core.FlaggedChatApplication
{
    public class FlaggedChatService
        : BaseService<GetFlaggedChatDto, CreateFlaggedChatDto, ModifyFlaggedChatDto, FlaggedChat>,
            IFlaggedChatService
    {
        
        private readonly IConfiguration config;
        private readonly DataContext ctx;
        private readonly IMapper mapper;
        private readonly IEmployeeTokenAccessor employeeTokenAccessor;

        public FlaggedChatService(
            IConfiguration config,
            DataContext ctx,
            IMapper mapper,
            IEmployeeTokenAccessor employeeTokenAccessor
        )
            : base(ctx, mapper)
        {
            this.config = config;
            this.ctx = ctx;
            this.mapper = mapper;
            this.employeeTokenAccessor = employeeTokenAccessor;
        }
        public async Task<ResultSetDto<GetFlaggedChatDto>> GetListAsync()
        {
            ResultSetDto<GetFlaggedChatDto> result = new();
            var flaggedChats = await ctx.FlaggedChats.OrderBy(f => f.CreatedAt)
            .Include(f => f.Employee)
            .Include(f => f.Employee2)
            .ToListAsync();
            
            result.Results = mapper.Map<List<GetFlaggedChatDto>>(flaggedChats);
            result.ResultCount = flaggedChats.Count;
            return result;
        }
        public async Task<GetFlaggedChatDto> GetAsync()
        {
            var entity = await ctx.FlaggedChats.Where(e => e.Id == new Guid(employeeTokenAccessor.Id)).FirstOrDefaultAsync() ?? throw new EntityNotFoundException<FlaggedChat>();
            return mapper.Map<GetFlaggedChatDto>(entity);
        }
        public async Task<GetFlaggedChatDto> ModifyAsync(ModifyFlaggedChatDto modifyDto)
        {
            var newFlaggedChat = await base.ModifyAsync(modifyDto.Id, modifyDto);
            return newFlaggedChat;
        }

    }
}