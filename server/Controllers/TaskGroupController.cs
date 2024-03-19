using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Assignment;
using server.Mappers;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskGroupController : ControllerBase
    {
        private readonly IProjectRepository _project_repo;
        private readonly ITaskGroupRepository _group_repo;
        public TaskGroupController(ITaskGroupRepository group_repo, IProjectRepository project_repo)
        {
            _group_repo = group_repo;
            _project_repo = project_repo;
        }


        [HttpPost("createTaskGroup")]
        public async Task<IActionResult> Create([FromBody] CreateTaskGroupDto dto)
        {
            var project = await _project_repo.GetProjectByIdAsync(dto.ProjectId);
            if(project==null)
                return BadRequest("That project does not exist");
            var group = await _group_repo.CreateAsync(dto.fromCreateTaskGroupDtoToTaskGroup());
            return Ok(group.toTaskGroupDto());
        } 
    }
}