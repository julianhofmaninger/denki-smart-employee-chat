using AutoMapper;
using core.Data.Entities;
using core.MessageApplication.Dtos;

namespace core.EmployeeApplication.Dtos
{
    public record GetEmployeeDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public bool IsHR { get; set; }
        public ICollection<GetMessageDto> ReceivedMessages { get; set; }
        public ICollection<GetMessageDto> SentMessages { get; set; }
    }

    public class GetEmployeeDtoMappingProfile : Profile
    {
        public GetEmployeeDtoMappingProfile()
        {
            CreateMap<Employee, GetEmployeeDto>();
        }
    }
}
