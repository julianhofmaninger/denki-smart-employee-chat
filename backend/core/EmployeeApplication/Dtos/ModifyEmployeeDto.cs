using AutoMapper;
using core.Data.Entities;

namespace core.EmployeeApplication.Dtos
{
    public record ModifyEmployeeDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public bool IsHR { get; set; }
    }

    public class ModifyEmployeeDtoMappingProfile : Profile
    {
        public ModifyEmployeeDtoMappingProfile()
        {
            CreateMap<ModifyEmployeeDto, Employee>();
        }
    }
}
