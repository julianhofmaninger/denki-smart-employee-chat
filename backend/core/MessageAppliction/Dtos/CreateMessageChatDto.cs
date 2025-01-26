using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using FluentValidation;

namespace core.MessageApplication.Dtos
{
    public record CreateMessageDto
    {
        public string Text { get; set; }
        public bool Read { get; set; }
        public Guid SenderId { get; set; }
        public Guid ReceiverId { get; set; }
    }

    public class CreateMessageDtoMappingProfile : Profile
    {
        public CreateMessageDtoMappingProfile()
        {
            CreateMap<CreateMessageDto, Message>();
        }
    }
}
