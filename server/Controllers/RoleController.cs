using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RoleController : ControllerBase
    {
        private readonly IRoleRepository _role_repo;
        public RoleController(IRoleRepository role_repo)
        {
            _role_repo = role_repo;
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
    }
}