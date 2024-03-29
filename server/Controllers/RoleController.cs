using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Permissions;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _role_repo;
        private readonly IPermissionRepository _permission_repo;
        public RoleController(IRoleRepository role_repo, IPermissionRepository permission_repo)
        {
            _role_repo = role_repo;
            _permission_repo = permission_repo;
        }
        [HttpGet("getAll")]
        public async Task<IActionResult> GetAllRoles()
        {
            var roles = await _role_repo.GetAllRolesAsync();
            
            var dtos = roles.Select(r=>r.toRoleDto());

            return Ok(dtos);
        }

        [HttpGet("getById{id}")]
        public async Task<IActionResult> GetRoleById([FromRoute] int id)
        {
            var role = await _role_repo.GetRoleByIdAsync(id);
            if(role==null)
                return NotFound("Role not found");

            return Ok(role.toRoleDto());
        }

        [HttpGet("{roleId}/permissions")]
        public async Task<IActionResult> GetRolePermissions(int roleId)
        {
            var role = await _role_repo.GetRoleByIdAsync(roleId);
            if (role == null)
                return NotFound("Role not found");

            var permissions = role.RolePermissions.Select(rp => rp.Permission).ToList();
            var dtos = permissions.Select(p => p.ToPermissionDto()).ToList();
            return Ok(dtos);
        }

        [HttpPost("{roleId}/assignPermission")]
        public async Task<IActionResult> AssignPermissionToRole(int roleId, int permissionId)
        {
            var role = await _role_repo.GetRoleByIdAsync(roleId);
            if (role == null)
                return NotFound("Role not found");

            var permission = await _permission_repo.GetPermissionByIdAsync(permissionId);
            if (permission == null)
                return NotFound("Permission not found");

            if (role.RolePermissions.Any(rp => rp.PermissionId == permissionId))
                return BadRequest("Permission is already assigned to the role");

            role.RolePermissions.Add(new RolePermission { PermissionId = permissionId });
            await _role_repo.SaveChangesAsync();

            return Ok("Permission assigned to role successfully");
        }
    }
}