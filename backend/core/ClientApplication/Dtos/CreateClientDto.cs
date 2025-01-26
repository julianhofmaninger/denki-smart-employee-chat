using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using FluentValidation;

namespace core.ClientApplication.Dtos
{
    public record CreateClientDto
    {
        public string ClientId { get; set; }
        public Guid EmployeeId { get; set; }
    }

    public class CreateClientDtoMappingProfile : Profile
    {
        public CreateClientDtoMappingProfile()
        {
            CreateMap<CreateClientDto, Client>();
        }
    }
}
