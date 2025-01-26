
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using AuthApplication.Logic;
using AutoMapper;
using core.AuthApplication.Dtos;
using core.Base.Exceptions;
using core.Data;
using core.Data.Entities;
using core.EmployeeApplication.Dtos;
using Microsoft.Extensions.Configuration;

namespace core.AuthApplication
{
    public class AuthService : IAuthService
    {
        private readonly DataContext ctx;
        private readonly IMapper mapper;
        private readonly IConfiguration config;

        public AuthService(IConfiguration config, DataContext ctx, IMapper mapper)
        {
            this.config = config;
            this.ctx = ctx;
            this.mapper = mapper;
        }

        public async Task<GetTokenDto> Login(PostLoginDto loginDto)
        {
            var employee = ctx.Employees.FirstOrDefault(e => e.Username == loginDto.Username && e.Password == loginDto.Password);
            if (employee == null) throw new EntityNotFoundException<Employee>();
            var token = TokenLogic.CreateToken(employee, employee.Id, config);
            var tokenHandler = new JwtSecurityTokenHandler();
                    
            return new GetTokenDto
            {
                AccessToken = token,
                RefreshToken = "",
                Role = tokenHandler.ReadJwtToken(token).Claims.First(c => c.Type == ClaimTypes.Role).Value,
                Employee = mapper.Map<GetEmployeeDto>(employee)
            };
            
            throw new Exception("Not Authenticated");
        }
    }
}
