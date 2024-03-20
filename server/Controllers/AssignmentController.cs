using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.TagHelpers;
using server.DTOs.Assignment;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly IAssignmentRepository _asign_repo;
        private readonly ITaskGroupRepository _group_repo;
        private readonly IPriorityRepository _prio_repo;
        private readonly IUserRepository _user_repo;
        private readonly ITeamRepository _team_repo;

        private readonly IProjectRepository _project_repo;

        public AssignmentController(IAssignmentRepository asign_repo, IUserRepository user_repo
        , ITaskGroupRepository group_repo, IPriorityRepository prio_repo, ITeamRepository team_repo,IProjectRepository project_repo)
        {
            _asign_repo = asign_repo;
            _group_repo = group_repo;
            _project_repo = project_repo;
            _prio_repo = prio_repo;
            _user_repo = user_repo;
            _team_repo = team_repo;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateAssignment([FromBody]CreateAssignmentDto dto)
        {
            //da li su datumi dobri
            if(dto.Start >= dto.End)
                return BadRequest("End date comes before start date");

            //da li je grupa validna
            var group = await _group_repo.GetTaskGroupByIdAsync(dto.TaskGroupId);
            if(group==null)
                return NotFound("That task group does not exist");

            //proverava da li su useri validni
            var users = new List<User>();
            var project  = await _project_repo.GetProjectByIdAsync(group.ProjectId);
            if(project==null)
                return BadRequest("projekat ne postoji");
            var team = await _team_repo.GetTeamUsersByIdAsync(project.TeamId);

            foreach (var userId in dto.UserIds)
            {
                if(!team.Contains(userId))
                    return BadRequest("User " + userId + " is not on project " + group.ProjectId);
                var user = await _user_repo.GetUserByIdAsync(userId);
                users.Add(user);
            }

            var dependencies = new List<Assignment>();
            foreach (var dependentId in dto.DependentOn)
            {
                var dependent = await _asign_repo.GetAssignmentByidAsync(dependentId);
                if(dependent==null)
                    return BadRequest("DependentOn Assignments for this Task are not good !!!");
                
                dependencies.Add(dependent);
            }
            
            //da li je prio validan
            var prio = await _prio_repo.GetPriority(dto.PriorityId);
            if(prio==null)
                return BadRequest("Priority with "+ dto.PriorityId+ " does not exist");
            
            var a = await _asign_repo.CreateAssignmentAsync(dto.fromCreateDtoToAssignment(users,dependencies,group));

            
            return Ok(a.toAssignmentDto(dto.UserIds,dto.DependentOn));
        }
        [HttpGet]
        [Route("getByGroup/{group_id}")]

        public async Task<IActionResult> GetAllAssignmentsByGroup([FromRoute] int group_id)
        {
            var tasks =  await _asign_repo.GetAllGroupAssignmentsAsync(group_id);
            List<AssignmentDto> res = new List<AssignmentDto>();

            for (int i = 0; i < tasks.Count; i++)
            {
                List<int> ids = new List<int>();
                List<int> dep = new List<int>();
                var users = await _asign_repo.GetAssignmentUsersAsync(tasks[i].Id);
                var dependencies = await _asign_repo.GetAllDependentOnOfAssignmentAsync(tasks[i].Id);
                foreach (var item in dependencies)
                {
                    dep.Add(item.Id);   
                }
                foreach (var user in users)
                {
                    ids.Add(user.Id);
                }
                res.Add(tasks[i].toAssignmentDto(ids,dep));
            }

            return Ok(res);
        }

        [HttpGet]
        [Route("getByUser/{user_id}")]
        public async Task<IActionResult> GetAllAssignmentsByUser([FromRoute] int user_id)
        {
            var user =  await _user_repo.GetUserByIdAsync(user_id);
            if(user==null)
                return BadRequest("User " + user_id + " does not exist");
            var tasks = await _asign_repo.GetAllUserAssignmentsAsync(user_id);
            List<AssignmentDto> res = new List<AssignmentDto>();

            for (int i = 0; i < tasks.Count; i++)
            {
                List<int> ids = new List<int>();
                List<int> dep = new List<int>();
                var dependencies = await _asign_repo.GetAllDependentOnOfAssignmentAsync(tasks[i].Id);
                foreach (var item in dependencies)
                {
                    dep.Add(item.Id);   
                }
                var users = await _asign_repo.GetAssignmentUsersAsync(tasks[i].Id);
                foreach (var user1 in users)
                {
                    ids.Add(user1.Id);
                }
                res.Add(tasks[i].toAssignmentDto(ids,dep));
            }

            return Ok(res);
        }

        [HttpGet]
        [Route("getById/{task_id}")]
        public async Task<IActionResult> GetAssignmentById([FromRoute] int task_id)
        {
            var task = await _asign_repo.GetAssignmentByidAsync(task_id);
            var users =  await _asign_repo.GetAssignmentUsersAsync(task_id);
            if(task==null)
                return BadRequest("Task does not exist");

            
            List<int> ids = new List<int>();
            List<int> dep = new List<int>();
            var dependencies = await _asign_repo.GetAllDependentOnOfAssignmentAsync(task.Id);
            foreach (var item in dependencies)
            {
                dep.Add(item.Id);   
            }
            foreach (var user1 in users)
            {
                ids.Add(user1.Id);
            }
            

            return Ok(task.toAssignmentDto(ids,dep));
        }

        [HttpPut]
        [Route("update/{task_id}")]
        public async Task<IActionResult> UpdateAssignmentById([FromBody]UpdateAssignmentDto dto,[FromRoute] int task_id)
        {
            //da li su datumi dobri
            if(dto.Start >= dto.End)
                return BadRequest("End date comes before start date");
            var asignment = await _asign_repo.UpdateAssignmentAsync(dto,task_id);

            if(asignment==null)
                return BadRequest("Assignment does not exist");
            
            var users = await _asign_repo.GetAssignmentUsersAsync(task_id);
            List<int> dep = new List<int>();
            var dependencies = await _asign_repo.GetAllDependentOnOfAssignmentAsync(asignment.Id);
            foreach (var item in dependencies)
            {
                dep.Add(item.Id);   
            }
            List<int> ids = new List<int>();
            foreach (var user1 in users)
            {
                ids.Add(user1.Id);
            }
            

            return Ok(asignment.toAssignmentDto(ids,dep));
        }

        [HttpGet("getAssignmentsByProject/{project_id}")]
        public async Task<IActionResult> GetAllAssignmentsByProject([FromRoute] int project_id)
        {
            var groups = await _group_repo.GetAllProjectTaskGroupsAsync(new Project{Id = project_id});
            var res = new List<AssignmentDto>();
            foreach (var group in groups)
            {
                var assignments = await _asign_repo.GetAllGroupAssignmentsAsync(group.Id);
                foreach (var asignment in assignments)
                {
                    var users = await _asign_repo.GetAssignmentUsersAsync(asignment.Id);
                    List<int> dep = new List<int>();
                    var dependencies = await _asign_repo.GetAllDependentOnOfAssignmentAsync(asignment.Id);
                    foreach (var item in dependencies)
                    {
                        dep.Add(item.Id);   
                    }
                    List<int> ids = new List<int>();
                    foreach (var user1 in users)
                    {
                        ids.Add(user1.Id);
                    }
                    res.Add(asignment.toAssignmentDto(ids,dep));
                }
            }

            return Ok(res);
        }
    }
}