using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.DTOs.Users;
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
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _repos.GetAllUsersAsync();
            var dtos = users.Select(u=>u.toUserRoleDto(u.Role.toRoleDto()));
            return Ok(dtos);
        }

        [HttpGet("getAssignmentUsers/{asign_id}")]
        public async Task<IActionResult> getAssignmentUsers([FromRoute]int asign_id)
        {
            var users = await _repos.GetAssignmentUsersAsync(asign_id);
            var dtos = users.Select(x => x.toUserDto());
            return Ok(dtos);
        }


        [HttpGet("getUserById/{id}")]
        public async Task<ActionResult<User>> GetUserById(int id)
        {
            var user=await _repos.GetUserByIdAsync(id);
            if(user==null)
            {
                return NotFound();
            }
            return Ok(user.toUserDto());
        }
        [HttpGet("getProjectUsers/{project_id}")]
        public async Task<IActionResult> getProjectUsers([FromRoute] int project_id)
        {
            var users = await _repos.GetUserByProjectId(project_id);
            var dtos = users.Select(u=>u.toUserDto());
            return Ok(dtos);
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

        [HttpPut("updateUserInfo/{user_id}")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserDto dto,int user_id)
        {
            var user =  await _repos.UpdateUserAsync(dto,user_id);
            if(user==null)
                return NotFound("user not found");

            return Ok(user.toUserDto());
        }

        /*


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

        [HttpPut("{userId}/updateProfilePicture")]
        public async Task<IActionResult> UpdateProfilePicture(int userId, IFormFile file)
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

            var uploadsFolder = Path.Combine(_webHostEnvironment.WebRootPath, "ProfilePictures");

            /* TO DO: Zasto se stare slike ne obrisu?
            // Delete the old profile picture file, if it exists
            if (!string.IsNullOrEmpty(user.ProfilePicturePath))
            {
                var oldFilePath = Path.Combine(uploadsFolder, user.ProfilePicturePath);
                
                if (System.IO.File.Exists(oldFilePath))
                {
                    System.IO.File.Delete(oldFilePath);
                }
            }
            

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
        
        
        [HttpDelete("{userId}/profilePicture")]
        public async Task<IActionResult> DeleteProfilePicture(int userId)
        {
            await _repos.DeleteProfilePictureAsync(userId);
            return NoContent();
        }
        */


        //BLOBS

        [HttpPost("{userId}/uploadProfilePicture")]
        public async Task<IActionResult> UploadProfilePicture(int userId, [FromBody] byte[] pictureBytes)
        {
            try
            {
                var user = await _repos.GetUserByIdAsync(userId);

                if (user == null)
                    return NotFound("user not found");

                if (pictureBytes == null || pictureBytes.Length == 0)
                    return BadRequest("Invalid picture data");

                user.ProfilePicture = pictureBytes;

                await _repos.SaveChangesAsync();

                return Ok("Profile picture uploaded successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex}");
            }
        }
    }
}
