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
        [HttpGet("{roleId}/permissions")]
        public async Task<IActionResult> GetPermissionsByRoleId(int roleId)
        {
            var permissions = await _role_repo.GetPermissionsByRoleIdAsync(roleId);
            return Ok(permissions);
        }
    }
}