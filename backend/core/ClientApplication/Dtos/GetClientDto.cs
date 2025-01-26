using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using core.EmployeeApplication.Dtos;
using FluentValidation;

namespace core.ClientApplication.Dtos
{
    public record GetClientDto
    {
        public Guid Id { get; set; }
        public string ClientId { get; set; }
        public Guid EmployeeId { get; set; }
    }

    public class GetClientDtoMappingProfile : Profile
    {
        public GetClientDtoMappingProfile()
        {
            CreateMap<Client, GetClientDto>();
        }
    }
}
