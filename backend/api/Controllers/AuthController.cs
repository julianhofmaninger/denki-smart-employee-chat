using core.AuthApplication;
using core.AuthApplication.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    public class AuthController : BaseController
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }   

        [HttpPost("Login")]
        public async Task<GetTokenDto> LoginUser([FromBody] PostLoginDto loginDto)
        {
            return await authService.Login(loginDto);
        }
    }
}
