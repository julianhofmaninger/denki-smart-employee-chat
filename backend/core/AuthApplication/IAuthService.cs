using core.AuthApplication.Dtos;


namespace core.AuthApplication
{
    public interface IAuthService
    {
        Task<GetTokenDto> Login(PostLoginDto loginDto);
    }
}
