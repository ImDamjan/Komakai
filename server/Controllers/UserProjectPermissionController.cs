using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Permissions;

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

            var userProjectPermission = userProjectPermissionDto.ToEntity();
            await _userProjectPermissionRepo.AddUserProjectPermission(userProjectPermission);

            return Ok(userProjectPermission);
        }
    }
}
