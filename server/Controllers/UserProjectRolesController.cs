using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Permissions;
using server.Mappers;
using server.Repositories;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProjectRolesController : ControllerBase
    {
        private readonly IUserProjectRolesRepository _userProjectRolesRepository;

        public UserProjectRolesController(IUserProjectRolesRepository userProjectRolesRepository)
        {
            _userProjectRolesRepository = userProjectRolesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserProjectRolesDto>>> GetUserProjectRoles()
        {
            var userProjectRoles = await _userProjectRolesRepository.GetAllUserProjectRoles();
            var userProjectRolesDto = userProjectRoles.Select(UserProjectRolesMapper.MapToDto);
            return Ok(userProjectRolesDto);
        }
    }
}
