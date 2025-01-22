using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;

namespace core.Base.Authentication
{
    public class EmployeeTokenAccessor : IEmployeeTokenAccessor
    {
        public EmployeeTokenAccessor(IHttpContextAccessor httpContext)
        {
            this.httpContext = httpContext.HttpContext;
        }

        private readonly bool dev = true;
        private readonly HttpContext httpContext;
        public string Id
        {
            get
            {
                var authorizationHeader = httpContext.Request.Headers["Authorization"];
                if (authorizationHeader == StringValues.Empty) throw new UnauthorizedAccessException("User not authorized");
                string token = "";
                foreach (var value in authorizationHeader)
                {
                    if(value != null)
                    {
                        token = value.Replace("Bearer ", "");
                        break;
                    }
                }
                var handler = new JwtSecurityTokenHandler();
                var jwtSecurityToken = handler.ReadJwtToken(token);
                var id = jwtSecurityToken.Claims.First(claim => claim.Type == ClaimTypes.SerialNumber).Value;
                return id;
            }
        }
        public string Name
        {
            get
            {
                var name = httpContext
                    ?.User?.Claims?.FirstOrDefault(c => c.Type == ClaimTypes.Name)
                    ?.Value;


                if (name == null && !dev)
                    throw new UnauthorizedAccessException("User not authorized");
                if (name == null)
                    return "anonymous";
                else
                    return name;
            }
        }
    }
}
