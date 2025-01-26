using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using FluentValidation;

namespace core.FlaggedChatApplication.Dtos
{
    public record CreateFlaggedChatDto
    {
        public double ConflictPotential { get; set; }
        public float SenstivieLeak { get; set; }
        public string[] CriticalPhrases { get; set; }
        public Guid EmployeeId { get; set; }
        public Guid Employee2Id { get; set; }
    }

    public class CreateFlaggedChatDtoMappingProfile : Profile
    {
        public CreateFlaggedChatDtoMappingProfile()
        {
            CreateMap<CreateFlaggedChatDto, FlaggedChat>();
        }
    }
}
