using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Data;
using server.DTOs.Users;
using server.Interfaces;
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
        private readonly IUserRepository _repos;
        private readonly IConfiguration _configuration;

        public AuthController(IUserRepository userRepository, IConfiguration configuration)
        {
            _repos = userRepository;
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
                Name = request.Name,
                Lastname = request.Lastname,
            };

            var role=await _repos.GetRoleByNameAsync(request.Role); 
            if (role == null)
            {
                return BadRequest("Invalid role");
            }
            newUser.RoleId= role.Id;


            //Dodavanje korsnika u DBContext
            await _repos.AddUserAsync(newUser);

            return Ok(newUser);
        }

        //Login
        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto request)
        {

            var user = await _repos.GetUserByUsernameAsync(request.Username);
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
