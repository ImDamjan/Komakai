using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user = new User();

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
                return BadRequest("User not found");
            }

            if(!BCrypt.Net.BCrypt.Verify(request.Password, user.PasswordHash))
            {
                return BadRequest("Wrong password");
            }

            return Ok(user);
        }

    }

}
