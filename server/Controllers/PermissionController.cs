using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Permissions;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private readonly IPermissionRepository _permissionRepo;

        public PermissionController(IPermissionRepository permissionRepo)
        {
            _permissionRepo = permissionRepo;
        }

        [HttpGet("{permissionId}")]
        public async Task<ActionResult<PermissionDto>> GetPermissionById(int permissionId)
        {
            var permission = await _permissionRepo.GetPermissionByIdAsync(permissionId);
            if (permission == null)
            {
                return NotFound();
            }

            var permissionDto = permission.ToPermissionDto(); // Use the mapper to convert to DTO
            return permissionDto;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PermissionDto>>> GetAllPermissions()
        {
            var permissions = await _permissionRepo.GetAllPermissionsAsync();
            var permissionDtos = new List<PermissionDto>();
            foreach (var permission in permissions)
            {
                permissionDtos.Add(permission.ToPermissionDto()); // Use the mapper to convert to DTO
            }
            return Ok(permissionDtos);
        }

        [HttpPost]
        public async Task<IActionResult> AddPermission(PermissionDto permissionDto)
        {
            if (permissionDto == null)
            {
                return BadRequest();
            }

            var permission = new Permission
            {
                // Map the properties from DTO to entity manually if necessary
                Name = permissionDto.Name
            };

            await _permissionRepo.AddPermissionAsync(permission);

            var createdDto = permission.ToPermissionDto(); // Use the mapper to convert to DTO

            return CreatedAtAction(nameof(GetPermissionById), new { permissionId = createdDto.Id }, createdDto);
        }

        [HttpPut("{permissionId}")]
        public async Task<IActionResult> UpdatePermission(int permissionId, PermissionDto permissionDto)
        {
            if (permissionId != permissionDto.Id)
            {
                return BadRequest();
            }

            var permission = await _permissionRepo.GetPermissionByIdAsync(permissionId);
            if (permission == null)
            {
                return NotFound();
            }

            // Map the properties from DTO to entity manually if necessary
            permission.Name = permissionDto.Name;

            try
            {
                await _permissionRepo.UpdatePermissionAsync(permission);
            }
            catch (Exception)
            {
                if (await _permissionRepo.GetPermissionByIdAsync(permissionId) == null)
                {
                    return NotFound();
                }
                throw;
            }

            return NoContent();
        }

        [HttpDelete("{permissionId}")]
        public async Task<IActionResult> DeletePermission(int permissionId)
        {
            var permission = await _permissionRepo.GetPermissionByIdAsync(permissionId);
            if (permission == null)
            {
                return NotFound();
            }

            await _permissionRepo.DeletePermissionAsync(permissionId);

            return NoContent();
        }
    }
}


