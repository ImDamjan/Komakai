using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
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
        private readonly ProjectManagmentDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(ProjectManagmentDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        //Registracija
        [HttpPost("register")]
        public async Task<ActionResult<User>> Register(UserRegistrationDto request)
        {
            //hash
            string passwordHash
                = BCrypt.Net.BCrypt.HashPassword(request.Password);

            //Kreiranje novog korisnika
            var newUser = new User
            {
                //Id = request.Id,
                Username = request.Username,
                Password = passwordHash,
                Email = request.Email,
                Name = request.Name
            };

            //Dodavanje korsnika u DBContext
            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }

        //Login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto request)
        {

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Username == request.Username);
            if(user==null)
            {
                return BadRequest("User or Password incorrect");
            }

            if(!BCrypt.Net.BCrypt.Verify(request.Password, user.Password))
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
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
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
