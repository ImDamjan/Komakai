using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Permissions;
using server.Mappers;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProjectPermissionController : ControllerBase
    {
        private readonly IUserProjectPermissionRepository _userProjectPermissionRepo;

        public UserProjectPermissionController(IUserProjectPermissionRepository userProjectPermissionRepo)
        {
            _userProjectPermissionRepo = userProjectPermissionRepo;
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddUserProjectPermission([FromBody] UserProjectPermissionDto userProjectPermissionDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userProjectPermission = UserProjectPermissionMapper.MapToEntity(userProjectPermissionDto);
            await _userProjectPermissionRepo.AddUserProjectPermission(userProjectPermission);

            return Ok(userProjectPermission);
        }

        [HttpDelete("remove/{id}")]
        public async Task<IActionResult> RemovePermission(int id)
        {
            var permission = await _userProjectPermissionRepo.GetUserProjectPermissionById(id);
            if (permission == null)
            {
                return NotFound();
            }

            await _userProjectPermissionRepo.RemoveUserProjectPermission(permission);
            return NoContent();
        }
    }
}
