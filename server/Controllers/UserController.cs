using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Mappers;
using server.Repositories;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repos;
        public UserController(IUserRepository repos)
        {
            _repos = repos;
        }

        [HttpGet("userProjects/{id}")]
        public async Task<IActionResult> GetAllUserProjects([FromRoute]int id)
        {
            var projects = await _repos.GetAllUserProjectsAsync(id);
            var projectDtos = projects.Select(p=>p.ToProjectDto());
            return Ok(projectDtos);
        }
    }
}