using core.EmployeeApplication;
using core.EmployeeApplication.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class EmployeeController : BaseController
    {
        private readonly IEmployeeService employeeService;

        public EmployeeController(IEmployeeService employeeService)
        {
            this.employeeService = employeeService;
        }

        [HttpGet]
        public async Task<GetEmployeeDto> Get()
        {
            return await employeeService.GetAsync();
        }
        [HttpGet("Chats")]
        public async Task<List<GetEmployeeDto>> GetChats()
        {
            return await employeeService.GetChats();
        }
        [HttpPost]
        public async Task<GetEmployeeDto> Create([FromBody] CreateEmployeeDto createDto)
        {
            return await employeeService.CreateAsync(createDto);
        }
        [HttpPut]
        public async Task<GetEmployeeDto> Update([FromBody] ModifyEmployeeDto modifyDto)
        {
            return await employeeService.ModifyAsync(modifyDto);
        }
        [HttpDelete("{eid}")]
        public async Task Delete(Guid eid)
        {
            await employeeService.DeleteAsync(eid);
        }
    }
}
