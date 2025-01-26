using core.EmployeeApplication.Dtos;

namespace core.EmployeeApplication
{
    public interface IEmployeeService
    {
        Task<GetEmployeeDto> CreateAsync(CreateEmployeeDto createDto);
        Task<GetEmployeeDto> GetAsync();
        Task<List<GetEmployeeDto>> GetChats();
        Task<GetEmployeeDto> ModifyAsync(ModifyEmployeeDto modifyDto);
        Task DeleteAsync(Guid eid);
    }
}
