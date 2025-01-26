using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using FluentValidation;

namespace core.ClientApplication.Dtos
{
    public record ModifyClientDto
    {
        public Guid Id { get; set; }
        public string ClientId { get; set; }
        public Guid EmployeeId { get; set; }
    }

    public class ModifyClientDtoMappingProfile : Profile
    {
        public ModifyClientDtoMappingProfile()
        {
            CreateMap<ModifyClientDto, Client>();
        }
    }
}
