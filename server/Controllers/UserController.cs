using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Interfaces;
using server.Mappers;
using server.Models;
using server.Repositories;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repos;
        private readonly IWebHostEnvironment _webHostEnvironment;
        public UserController(IUserRepository repos, IWebHostEnvironment webHostEnvironment)
        {
            _repos = repos;
            _webHostEnvironment = webHostEnvironment;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAllUsers()
        {
            var users = await _repos.GetAllUsersAsync();
            return Ok(users);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user=await _repos.GetUserByIdAsync(id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user);
        }

        [HttpGet("byRole/{roleName}"), Authorize(Roles ="5")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersByRole(string roleName)
        {
            var users=await _repos.GetUsersByRoleAsync(roleName);
            return Ok(users);
        }


        [HttpGet("user/resettoken/{resetToken}")]
        public async Task<ActionResult<User>> GetUserByResetToken(string resetToken)
        {
            var user = await _repos.GetUserByResetTokenAsync(resetToken);
            if (user == null)
            {
                return NotFound("User not found for the provided reset token.");
            }

            return Ok(user);
        }

        [HttpGet("user/email/{email}")]
        public async Task<ActionResult<User>> GetUserByEmail(string email)
        {
            var user = await _repos.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found for the provided email.");
            }

            return Ok(user);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var deleted = await _repos.DeleteUserByIdAsync(id);
            if (!deleted)
            {
                return NotFound(); // User with the specified ID not found
            }

            return NoContent(); // User deleted successfully
        }


        [HttpPost("{userId}/uploadProfilePicture")]
        public async Task<IActionResult> UploadProfilePicture(int userId, IFormFile file)
        {
            var user = await _repos.GetUserByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }

            if (file == null || file.Length == 0)
            {
                return BadRequest("Invalid file");
            }

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "profilePictures");
            var uniqueFileName = Guid.NewGuid().ToString() + "_" + file.FileName;
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            user.ProfilePicturePath = Path.Combine("profilePictures", uniqueFileName);
            await _repos.SaveChangesAsync();

            return Ok(new { filePath });
        }
    }
}
