using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static User user =new User();

        //Registracija
        [HttpPost("register")]
        public ActionResult<User> Register(UserRequestDto request)
        {
            //hash
            string passwordHash
                = BCrypt.Net.BCrypt.HashPassword(request.Password);

            user.Username=request.Username;
            user.Lastname=request.Lastname;
            user.PasswordHash=passwordHash;
            user.Email=request.Email;

            return Ok(user);
        }
    }

}
