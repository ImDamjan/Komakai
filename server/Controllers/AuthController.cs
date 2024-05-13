using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.ObjectPool;
using Microsoft.IdentityModel.JsonWebTokens;
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
        private readonly IEmailService _emailService;
        private readonly IRoleRepository _role_repo;

        public AuthController(IUserRepository userRepository, IConfiguration configuration,IEmailService emailService, IRoleRepository role_repo)
        {
            _emailService = emailService;
            _repos = userRepository;
            _configuration = configuration;
            _role_repo = role_repo;
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
                Username = request.Username,
                Password = passwordHash,
                Email = request.Email,
                Name = request.Name,
                Lastname = request.Lastname,
                RoleId = request.RoleId,
                IsActivated = true
            };

            var role = await _role_repo.GetRoleByIdAsync(request.RoleId);
            if (role != null)
            {
                newUser.JobTitle = role.Name;
            }
            else
            {
                newUser.JobTitle = "Unknown";
            }

            //Dodavanje korsnika u DBContext
            await _repos.AddUserAsync(newUser);

            var emailRequest = new EmailDto
            {
                To = request.Email,
                Subject = "Registration Successful",
                Body = $"Dear {request.Username},\n\nYour registration is successful!\n\nUsername: {request.Username}\nPassword: {request.Password}\n\nThank you for registering."
                //TO DO Napraviti klasu sa telom email-a.
            };

            await _emailService.SendEmailAsync(emailRequest);

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

            var token = await CreateToken(user);
            if(token == null)
                return BadRequest("Login unsuccessful");

            return Ok(token);
        }

        [NonAction]
        public async Task<string?> CreateToken(User user)
        {
            var role = await _role_repo.GetRoleByIdAsync(user.RoleId);
            if(role==null)
                return null;
            //postavi username kao claim
            List<Claim> claims = new List<Claim>
            {
                //izmenjeno je zbog toga sto na frontu nije moglo da se uzme
                new Claim("user_id",user.Id.ToString()),
                new Claim("fullname",user.Name + " "+user.Lastname),
                new Claim("role_id", user.RoleId.ToString()),
                new Claim("role", role.Name.ToString())
            };

            //kreiraj i verifikuj json token
            var tokenValue = _configuration.GetValue<string>("Jwt:Token");
            if(tokenValue==null)
                return null;
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





        [HttpPost("forgotpassword")]
        public async Task<ActionResult> ForgotPassword(string email)
        {
            var user = await _repos.GetUserByEmailAsync(email);
            if (user == null)
            {
                // Korisnik nije pronadjen
                return Ok("If the provided email exists in our system, a password reset email has been sent.");
            }

            // Reset token
            string resetToken = GenerateResetToken();
            user.PasswordResetToken = resetToken;
            user.PasswordResetTokenExpiry = DateTime.Now.AddHours(1); // Vreme isticanja tokena

            await _repos.SaveChangesAsync(); 

            // Send email with reset link
            var resetLink = $"{Request.Scheme}://{Request.Host}/resetpassword?token={resetToken}";
            var emailRequest = new EmailDto
            {
                To = email,
                Subject = "Password Reset Request",
                Body = $"Please click the following link to reset your password: <a href=\"{resetLink}\">{resetLink}</a>"
            };
            await _emailService.SendEmailAsync(emailRequest);

            return Ok("If the provided email exists in our system, a password reset email has been sent.");
        }


        [HttpPost("resetpassword")]
        public async Task<ActionResult> ResetPassword(ResetPasswordDto model)
        {
            // Find the user by the reset token
            var user = await _repos.GetUserByResetTokenAsync(model.ResetToken);
            if (user == null)
            {
                // Invalid or expired reset token
                return BadRequest("Invalid or expired reset token.");
            }

            // Check if the reset token is expired
            if (user.PasswordResetTokenExpiry < DateTime.Now)
            {
                // Expired reset token
                return BadRequest("Expired reset token.");
            }

            // Hash the new password
            string newPasswordHash = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
            user.Password = newPasswordHash;

            // Clear the reset token and expiry
            user.PasswordResetToken = null;
            user.PasswordResetTokenExpiry = null;

            // Update the user in the database
            await _repos.SaveChangesAsync();

            // Return a success message
            return Ok("Password reset successful.");
        }

        // Generisanje tokena
        private string GenerateResetToken()
        {
            return Guid.NewGuid().ToString();
        }

    }

}
