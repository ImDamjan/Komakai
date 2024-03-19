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
            //provera da li projekat postoji
            var project = await _project_repo.GetProjectByIdAsync(dto.ProjectId);            
            if(project==null)
                return BadRequest("That project does not exist");

            //provera da li parent_task_group postoji i da li pripada datom projektu
            if(dto.ParentTaskGroupId!=null)
            {
                
                var tg = await _group_repo.GetTaskGroupByIdAsync((int)dto.ParentTaskGroupId);
                if(tg==null)
                    return BadRequest("That parent task group does not exist");
                if(tg.ProjectId!=project.Id)
                    return BadRequest("That parent task does not belong to the given project");
            }

            var group = await _group_repo.CreateAsync(dto.fromCreateTaskGroupDtoToTaskGroup());
            return Ok(group.toTaskGroupDto());
        }
        [HttpGet("getTaskGroupById/{task_group_id}")]
        public async Task<IActionResult> GetById([FromRoute] int task_group_id)
        {
            var t = await _group_repo.GetTaskGroupByIdAsync(task_group_id);
            if(t==null)
                return BadRequest("That group does not exist");
            
            return Ok(t.toTaskGroupDto());
        }
    }
}