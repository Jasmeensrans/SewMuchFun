using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Security.Cryptography;

namespace API.Services
{
    public class TokenService
    {
        public string CreateToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7),
                SigningCredentials = creds
            };
            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
        // public RefreshToken GenerateRefreshToken()
        // {
        //     var randomNumber = new byte[32];
        //     using var rng = RandomNumberGenerator.Create();
        //     rng.GetBytes(randomNumber);
        //     return new RefreshToken{Token = Convert.ToBase64String(randomNumber)};
        // }
        
    }
}