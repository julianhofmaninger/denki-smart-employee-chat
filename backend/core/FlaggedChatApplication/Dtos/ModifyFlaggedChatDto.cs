using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using FluentValidation;

namespace core.FlaggedChatApplication.Dtos
{
    public record ModifyFlaggedChatDto
    {
        public Guid Id { get; set; }
        public double ConflictPotential { get; set; }
        public float SenstivieLeak { get; set; }
        public string[] CriticalPhrases { get; set; }
    }

    public class ModifyFlaggedChatDtoMappingProfile : Profile
    {
        public ModifyFlaggedChatDtoMappingProfile()
        {
            CreateMap<ModifyFlaggedChatDto, FlaggedChat>();
        }
    }
}
