using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using core.EmployeeApplication.Dtos;
using FluentValidation;

namespace core.FlaggedChatApplication.Dtos
{
    public record GetFlaggedChatDto
    {
        public Guid Id { get; set; }
        public double ConflictPotential { get; set; }
        public float SenstivieLeak { get; set; }
        public string[] CriticalPhrases { get; set; }
        public GetEmployeeDto Employee { get; set; }
        public GetEmployeeDto Employee2 { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public class GetFlaggedChatDtoMappingProfile : Profile
    {
        public GetFlaggedChatDtoMappingProfile()
        {
            CreateMap<FlaggedChat, GetFlaggedChatDto>();
        }
    }
}
