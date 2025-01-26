using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using FluentValidation;

namespace core.MessageApplication.Dtos
{
    public record ModifyMessageDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public bool Read { get; set; }
    }

    public class ModifyMessageDtoMappingProfile : Profile
    {
        public ModifyMessageDtoMappingProfile()
        {
            CreateMap<ModifyMessageDto, Message>();
        }
    }
}
