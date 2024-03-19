using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Assignment;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskGroupController : ControllerBase
    {
        private readonly ITaskGroupRepository _group_repo;
        public TaskGroupController(ITaskGroupRepository group_repo)
        {
            _group_repo = group_repo;
        }


        [HttpPost("createTaskGroup")]
        public async Task<IActionResult> Create([FromBody] CreateTaskGroupDto dto)
        {

            return Ok();
        } 
    }
}