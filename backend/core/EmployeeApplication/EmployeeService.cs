using System.Net.Mail;
using AutoMapper;
using core.Base;
using core.Base.Authentication;
using core.Base.Exceptions;
using core.Data;
using core.EmployeeApplication.Dtos;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Employee = core.Data.Entities.Employee;

namespace core.EmployeeApplication
{
    public class EmployeeService
        : BaseService<GetEmployeeDto, CreateEmployeeDto, ModifyEmployeeDto, Employee>,
            IEmployeeService
    {
        
        private readonly IConfiguration config;
        private readonly DataContext ctx;
        private readonly IMapper mapper;
        private readonly IEmployeeTokenAccessor employeeAccessor;

        public EmployeeService(
            IConfiguration config,
            DataContext ctx,
            IMapper mapper,
            IEmployeeTokenAccessor employeeAccessor
        )
            : base(ctx, mapper)
        {
            this.config = config;
            this.ctx = ctx;
            this.mapper = mapper;
            this.employeeAccessor = employeeAccessor;
        }

        public override async Task<GetEmployeeDto> CreateAsync(CreateEmployeeDto createDto)
        {
            var newEmployee = await base.CreateAsync(createDto);
            return newEmployee;
        }
        public async Task<GetEmployeeDto> GetAsync()
        {
            var entity = await ctx.Employees.Where(e => e.Id == new Guid(employeeAccessor.Id)).FirstOrDefaultAsync() ?? throw new EntityNotFoundException<Employee>();
            return mapper.Map<GetEmployeeDto>(entity);
        }
        public async Task<List<GetEmployeeDto>> GetChats()
        {
            var unreadChats = ctx.Employees.Include(e => e.ReceivedMessages)
                .Where(e => e.Id != new Guid(employeeAccessor.Id))
                .Where(e => e.ReceivedMessages.Any(m => m.SenderId == new Guid(employeeAccessor.Id) && !m.Read))
                .Select(mapper.Map<GetEmployeeDto>)
                .ToList();
            
            var otherChats = ctx.Employees.Include(e => e.ReceivedMessages)
                .Where(e => e.Id != new Guid(employeeAccessor.Id))
                .Where(e => (e.ReceivedMessages.Any(m => m.SenderId == new Guid(employeeAccessor.Id) && m.Read)))
                .Select(mapper.Map<GetEmployeeDto>)
                .ToList();

            var noChatEmployees = ctx.Employees.Include(e => e.ReceivedMessages)
                .Where(e => e.Id != new Guid(employeeAccessor.Id))
                .Where(e => e.ReceivedMessages.Where(m => m.SenderId == new Guid(employeeAccessor.Id)).Count() == 0)
                .Select(mapper.Map<GetEmployeeDto>)
                .ToList();


            unreadChats.Sort((a, b) => b.ReceivedMessages.Max(m => m.CreatedAt).CompareTo(a.ReceivedMessages.Max(m => m.CreatedAt)));
            otherChats.Sort((a, b) => b.ReceivedMessages.Max(m => m.CreatedAt).CompareTo(a.ReceivedMessages.Max(m => m.CreatedAt)));
            var allChats = unreadChats.Concat(otherChats).Concat(noChatEmployees).ToList();
            return allChats;
        }
        public async Task<GetEmployeeDto> ModifyAsync(ModifyEmployeeDto modifyDto)
        {
            var newEmployee = await base.ModifyAsync(modifyDto.Id, modifyDto);
            return newEmployee;
        }

    }
}