using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using core.Data.Enums;
using Microsoft.Extensions.Configuration;
using core.Data.Entities;


namespace AuthApplication.Logic;

public class TokenLogic
{
    // Specify how long until the token expires
    private const int ExpirationMinutes = 30;
    public TokenLogic()
    {
        // _logger = logger;
    }

    public static string CreateToken(Employee user, Guid employeeId, IConfiguration config)
    {
        var claims = CreateClaims(user, employeeId);
        var expiration = DateTime.UtcNow.AddMinutes(600);


        var token = CreateJwtToken(
            CreateClaims(user, employeeId),
            CreateSigningCredentials(config),
            expiration,
            config
        );
        var tokenHandler = new JwtSecurityTokenHandler();
        
        return tokenHandler.WriteToken(token);
    }

    private static JwtSecurityToken CreateJwtToken(List<Claim> claims, SigningCredentials credentials,
        DateTime expiration, IConfiguration config) =>
        new(
            config["Jwt:Issuer"],
            config["Jwt:Audience"],
            claims,
            expires: expiration,
            signingCredentials: credentials
        );

    private static List<Claim> CreateClaims(Employee user, Guid employeeId)
    {

        var name = user.Firstname + " " + user.Lastname;
        var accountName = user.Username;
        var role = user.IsHR ? "HR" : "Employee";

        try
        {
            var claims = new List<Claim>
            {
                new (JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new (JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
                new (ClaimTypes.Name, name),
                new (ClaimTypes.WindowsAccountName, accountName),
                new (ClaimTypes.Role, role.ToString()),
                new (ClaimTypes.SerialNumber, employeeId.ToString())
            };
            
            return claims;
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw;
        }
    }
    private static SigningCredentials CreateSigningCredentials(IConfiguration config)
    {
        var symmetricSecurityKey = config["Jwt:Secret"];
        
        return new SigningCredentials(
            new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(symmetricSecurityKey)
            ),
            SecurityAlgorithms.HmacSha256
        );
    }
}