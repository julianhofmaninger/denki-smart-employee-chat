using System.ClientModel;
using System.Net.Mail;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;
using core.Base;
using core.Base.Authentication;
using core.Base.Exceptions;
using core.Base.SignalR;
using core.ClientApplication.Dtos;
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

namespace core.ClientApplication
{
    public class ClientService
        : BaseService<GetClientDto, CreateClientDto, ModifyClientDto, Client>,
            IClientService
    {
        
        private readonly IConfiguration config;
        private readonly DataContext ctx;
        private readonly IMapper mapper;
        private readonly IEmployeeTokenAccessor employeeTokenAccessor;
        IHubContext<SignalRHub> hubContext;

        public ClientService(
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
        public async Task<GetClientDto> GetAsync()
        {
            var entity = await ctx.Clients.Where(e => e.EmployeeId == new Guid(employeeTokenAccessor.Id)).FirstOrDefaultAsync() ?? throw new EntityNotFoundException<Client>();
            return mapper.Map<GetClientDto>(entity);
        }
        public async Task<GetClientDto> CreateAsync(CreateClientDto createDto)
        {
            var newClient = await base.CreateAsync(createDto);
            return newClient;
        }
        public async Task<GetClientDto> ModifyAsync(ModifyClientDto modifyDto)
        {
            var newClient = await base.ModifyAsync(modifyDto.Id, modifyDto);
            return newClient;
        }

    }
}