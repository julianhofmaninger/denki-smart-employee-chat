using AutoMapper;

namespace core.AuthApplication.Dtos
{
    public record PostLoginDto
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }
}
