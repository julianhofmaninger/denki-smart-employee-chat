using System.ComponentModel.DataAnnotations;
using AutoMapper;
using core.Data;
using core.Data.Entities;
using core.EmployeeApplication.Dtos;
using FluentValidation;

namespace core.MessageApplication.Dtos
{
    public record GetMessageDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public bool Read { get; set; }
        public DateTime CreatedAt { get; set; }
        public Guid SenderId { get; set; }
        //public GetEmployeeDto Sender { get; set; }
        public Guid ReceiverId {  get; set; }
        //public GetEmployeeDto Receiver { get; set; }
    }

    public class GetMessageDtoMappingProfile : Profile
    {
        public GetMessageDtoMappingProfile()
        {
            CreateMap<Message, GetMessageDto>();
        }
    }
}
