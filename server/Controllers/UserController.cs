using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        public UserController(IUserRepository repos)
        {
            _repos = repos;
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

        [HttpGet("byRole/{roleName}")]
        public async Task<ActionResult<IEnumerable<User>>> GetUsersByRole(string roleName)
        {
            var users=await _repos.GetUsersByRoleAsync(roleName);
            return Ok(users);
        }



        //Salje se id project_managera za kojeg hocemo plus se salje period string vrednost (week,month)
        [HttpGet("userProjectStates/{id}/{period}")]
        public async Task<IActionResult> GetAllUserStatesProjects([FromRoute]int id,[FromRoute] string period)
        {
            var res = await _repos.GetAllUserProjectStates(id,period);
            return Ok(res);
        }
    }
}