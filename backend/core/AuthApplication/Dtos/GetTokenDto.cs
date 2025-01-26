using AutoMapper;
using core.EmployeeApplication.Dtos;

namespace core.AuthApplication.Dtos
{
    public record GetTokenDto
    {
        public string AccessToken { get; set;}
        public string RefreshToken { get; set;}
        public string Role { get; set;}
        public GetEmployeeDto? Employee { get; set; } 
    }
}
