using AutoMapper;
using core.Data;
using core.Data.Entities;
using FluentValidation;

namespace core.EmployeeApplication.Dtos
{
    public record CreateEmployeeDto
    {
        public string Username { get; set; }
        public string Firstname { get; set; }
        public string Lastname { get; set; }
        public string Password { get; set; }
        public bool IsHR { get; set; }
    }

    public class CreateEmployeeDtoMappingProfile : Profile
    {
        public CreateEmployeeDtoMappingProfile()
        {
            CreateMap<CreateEmployeeDto, Employee>();
        }
    }

    public class CreateEmployeeDtoValidator : AbstractValidator<CreateEmployeeDto>
    {
        public CreateEmployeeDtoValidator(DataContext ctx) { }
    }
}
