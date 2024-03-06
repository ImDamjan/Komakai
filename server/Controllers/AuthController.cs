using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using server.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();
        private readonly IConfiguration _configuration;

        public AuthController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        //Registracija
        [HttpPost("register")]
        public ActionResult<User> Register(UserRequestDto request)
        {
            //hash
            string passwordHash
                = BCrypt.Net.BCrypt.HashPassword(request.Password);

            user.Username = request.Username;
            user.Lastname = request.Lastname;
            user.PasswordHash = passwordHash;
            user.Email = request.Email;

            return Ok(user);
        }

        //Login
        [HttpPost("login")]
        public ActionResult<User> Login(UserRequestDto request)
        {
            if(user.Username != request.Username)
            {
                return BadRequest("User or Password incorrect");
            }

            if(!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("User or Password incorrect");
            }

            string token = CreateToken(user);

            return Ok(token);
        }

        [NonAction]
        public string CreateToken(User user)
        {
            //postavi username kao claim
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Username)
            };

            //kreiraj i verifikuj json token
            var tokenValue = _configuration.GetValue<string>("Jwt:Token");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenValue));

            //kredencijali
            var creds = new SigningCredentials(key,SecurityAlgorithms.HmacSha512Signature);

            //token
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );

            //write token
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            //return token
            return jwt;

        }

    }

}
