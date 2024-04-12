using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Assignment;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskGroupController : ControllerBase
    {
        private readonly IProjectRepository _project_repo;
        private readonly ITaskGroupRepository _group_repo;
        private readonly IAssignmentRepository _asign_repo;
        public TaskGroupController(IAssignmentRepository asign_repo,ITaskGroupRepository group_repo, IProjectRepository project_repo)
        {
            _group_repo = group_repo;
            _asign_repo = asign_repo;
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

        [HttpGet("getTaskGroupsByProject/{project_id}")]
        public async Task<IActionResult> GetByProjectId([FromRoute] int project_id)
        {
            //provera da li projekat postoji
            var project = await _project_repo.GetProjectByIdAsync(project_id);            
            if(project==null)
                return BadRequest("That project does not exist");
            
            // var group = await _group_repo.GetAllProjectTaskGroupsAsync(project_id);

            // var dtos = group.Select(g=>g.toTaskGroupDto());

            var initial = await _group_repo.getInitialTaskGroupOfProject(project_id);
            if(initial==null)
                return NotFound("initi group not found");
            var tree = await makeTree(initial);

            return Ok(tree);
        }


        [NonAction]
        public async Task<TaskGroupTasksDto> makeTree(TaskGroup initial)
        {   
            var tasks =  await _asign_repo.GetAllGroupAssignmentsAsync(initial.Id);
            var task_group_children = await _group_repo.getChildrenGroups(initial.Id);
            List<AssignmentDto> asignments = new List<AssignmentDto>();
            List<TaskGroupTasksDto> children = new List<TaskGroupTasksDto>();
            foreach (var task in tasks)
            {
                var userDtos = task.Users.Select(x=>x.toUserDto(x.Role.toRoleDto())).ToList();
                
                asignments.Add(task.toAssignmentDto(userDtos,task.Priority.toPrioDto(),
                task.State.toStateDto(),task.User.toUserDto(task.User.Role.toRoleDto()),initial.toTaskGroupDto()));
            }
            
            foreach (var child in task_group_children)
            {
                var dto = await makeTree(child);
                children.Add(dto);          
            }

            return initial.toTaskGroupTasksDto(children,asignments);
            
        }

        [HttpPut("updateTaskGroup")]
        public async Task<IActionResult> Update([FromBody] TaskGroupDto dto)
        {

            var group = await _group_repo.GetTaskGroupByIdAsync(dto.Id);
            if(group==null)
                return BadRequest("Task group does not exist");
            group.Title = dto.Title;
            group.ProjectId = dto.ProjectId;
            group.ParentTaskGroupId = dto.ParentTaskGroupId;

            await _group_repo.UpdateTaskGroupAsync(group);
            
            return Ok(group.toTaskGroupDto());

        }
    }
}