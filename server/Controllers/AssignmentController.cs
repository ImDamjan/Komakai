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
    //najverovatnije ce trebati da se promene dto-ovi
    [Route("api/[controller]")]
    [ApiController]
    public class AssignmentController : ControllerBase
    {
        private readonly IAssignmentRepository _asign_repo;
        private readonly ITaskGroupRepository _group_repo;
        private readonly IPriorityRepository _prio_repo;
        private readonly IUserRepository _user_repo;
        private readonly IStateRepository _state_repo;
        private readonly IProjectRepository _project_repo;

        public AssignmentController(IAssignmentRepository asign_repo, IUserRepository user_repo
        , ITaskGroupRepository group_repo, IPriorityRepository prio_repo,IProjectRepository project_repo, IStateRepository state_repo)
        {
            _state_repo = state_repo;
            _asign_repo = asign_repo;
            _group_repo = group_repo;
            _project_repo = project_repo;
            _prio_repo = prio_repo;
            _user_repo = user_repo;
        }
        //Mozda ce morati da se ubaci i project ID u dto ?
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
               return NotFound("Project does not exist.ID:" + group.ProjectId);


            var team = await _user_repo.GetUserByProjectId(group.ProjectId);

            foreach (var userId in dto.Assignees)
            {
                var user = team.FirstOrDefault(u=>u.Id==userId);
                if(user==null)
                    return NotFound("User " + userId + " is not on project " + group.ProjectId);
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
                return NotFound("Priority with "+ dto.PriorityId+ " does not exist");
            var state = await _state_repo.GetStateByIdAsync(dto.StateId);
            if(state==null)
                return NotFound("State with "+ dto.StateId+ " does not exist");
            var owner = await _user_repo.GetUserByIdAsync(dto.Owner);
            if(owner==null)
                return NotFound("Owner with "+ dto.Owner+ " does not exist");
            var ownerDto = owner.toUserDto();
            var stateDto = state.toStateDto();
            var teamDto = users.Select(u=>u.toUserDto()).ToList();
            var groupdto = group.toTaskGroupDto();
            var prioDto = prio.toPrioDto();
            var a = await _asign_repo.CreateAssignmentAsync(dto.fromCreateDtoToAssignment(users,dependencies,group));
            return Ok(a.toAssignmentDto(teamDto,prioDto,stateDto,ownerDto,groupdto));
        }

        [HttpGet("getDependentOnAssignments/{asing_id}")]
        public async Task<IActionResult> GetDependentAssignments([FromRoute] int asing_id)
        {
            var tasks = await _asign_repo.GetAllDependentOnOfAssignmentAsync(asing_id);

            List<AssignmentDto> res = new List<AssignmentDto>();

            for (int i = 0; i < tasks.Count; i++)
            {
                var prio = await _prio_repo.GetPriority(tasks[i].PriorityId);
                if(prio==null)
                    return NotFound("Priority with "+ tasks[i].PriorityId+ " does not exist");
                var state = await _state_repo.GetStateByIdAsync(tasks[i].StateId);
                if(state==null)
                    return NotFound("State with "+ tasks[i].StateId+ " does not exist");
                var owner = await _user_repo.GetUserByIdAsync(tasks[i].Owner);
                if(owner==null)
                    return NotFound("Owner with "+ tasks[i].Owner+ " does not exist");

                var group = await _group_repo.GetTaskGroupByIdAsync(tasks[i].TaskGroupId);
                if(group==null)
                    return NotFound("That task group does not exist");
                var team = await _user_repo.GetAssignmentUsersAsync(tasks[i].Id);

                var ownerDto = owner.toUserDto();
                var stateDto = state.toStateDto();
                var teamDto = team.Select(u=>u.toUserDto()).ToList();
                var groupdto = group.toTaskGroupDto();
                var prioDto = prio.toPrioDto();
                res.Add(tasks[i].toAssignmentDto(teamDto,prioDto,stateDto,ownerDto,groupdto));
            }

            return Ok(res);

        }



        [HttpGet]
        [Route("getByGroup/{group_id}")]

        public async Task<IActionResult> GetAllAssignmentsByGroup([FromRoute] int group_id)
        {
            var tasks =  await _asign_repo.GetAllGroupAssignmentsAsync(group_id);
            List<AssignmentDto> res = new List<AssignmentDto>();

            for (int i = 0; i < tasks.Count; i++)
            {
                var ownerDto = tasks[i].User.toUserDto();
                var stateDto = tasks[i].State.toStateDto();
                var teamDto = tasks[i].Users.Select(u=>u.toUserDto()).ToList();
                var groupdto = tasks[i].TaskGroup.toTaskGroupDto();
                var prioDto = tasks[i].Priority.toPrioDto();
                res.Add(tasks[i].toAssignmentDto(teamDto,prioDto,stateDto,ownerDto,groupdto));
            }

            return Ok(res);
        }

        [HttpGet]
        [Route("getByUser/{user_id}")]
        public async Task<IActionResult> GetAllAssignmentsByUser([FromRoute] int user_id)
        {
            var user =  await _user_repo.GetUserByIdAsync(user_id);
            if(user==null)
                return NotFound("User " + user_id + " does not exist");
            var tasks = await _asign_repo.GetAllUserAssignmentsAsync(user_id);
            List<AssignmentDto> res = new List<AssignmentDto>();

            for (int i = 0; i < tasks.Count; i++)
            {
                var ownerDto = tasks[i].User.toUserDto();
                var stateDto = tasks[i].State.toStateDto();
                var teamDto = tasks[i].Users.Select(u=>u.toUserDto()).ToList();
                var groupdto = tasks[i].TaskGroup.toTaskGroupDto();
                var prioDto = tasks[i].Priority.toPrioDto();
                res.Add(tasks[i].toAssignmentDto(teamDto,prioDto,stateDto,ownerDto,groupdto));
            }

            return Ok(res);
        }

        [HttpGet]
        [Route("getById/{asign_id}")]
        public async Task<IActionResult> GetAssignmentById([FromRoute] int asign_id)
        {
            var task = await _asign_repo.GetAssignmentByidAsync(asign_id);
            if(task==null)
                return NotFound("Assignment does not exist.ID:" + asign_id);

                var ownerDto = task.User.toUserDto();
                var stateDto = task.State.toStateDto();
                var teamDto = task.Users.Select(u=>u.toUserDto()).ToList();
                var groupdto = task.TaskGroup.toTaskGroupDto();
                var prioDto = task.Priority.toPrioDto();
            

            return Ok(task.toAssignmentDto(teamDto,prioDto,stateDto,ownerDto,groupdto));
        }

        [HttpPut]
        [Route("update/{asign_id}")]
        public async Task<IActionResult> UpdateAssignmentById([FromBody]UpdateAssignmentDto dto,[FromRoute] int asign_id)
        {
            //da li su datumi dobri
            if(dto.Start >= dto.End)
                return BadRequest("End date comes before start date");
            
            var prio = await _prio_repo.GetPriority(dto.PriorityId);
            if(prio==null)
                return NotFound("Priority with "+ dto.PriorityId+ " does not exist");
            var state = await _state_repo.GetStateByIdAsync(dto.StateId);
            if(state==null)
                return NotFound("State with "+ dto.StateId+ " does not exist");

            var group = await _group_repo.GetTaskGroupByIdAsync(dto.TaskGroupId);
            if(group==null)
                return NotFound("That task group does not exist");
            
            var users =  new List<User>();
            var team  = await _user_repo.GetUserByProjectId(group.ProjectId);
            foreach(var userId in dto.UserIds)
            {
                var user = team.Find(u=>u.Id==userId);
                if(user == null)
                    return NotFound("User not found on that project");
                users.Add(user);
            }

            List<Assignment> dependentOn = new List<Assignment>();
            foreach (var taskId in dto.DependentOn)
            {
                var task = await _asign_repo.GetAssignmentByidAsync(taskId);
                if(task == null)
                    return NotFound("Dependent task not found");
                if(task.TaskGroup.ProjectId!=group.ProjectId)
                    return NotFound("Dependent task"+task.Id+" is not on that project");
                dependentOn.Add(task);
            }
            var asignment = await _asign_repo.UpdateAssignmentAsync(dto,asign_id, users,dependentOn);

            if(asignment==null)
                return NotFound("Assignment does not exist.ID:" + asign_id);
            var ownerDto = asignment.User.toUserDto();
            var stateDto = state.toStateDto();
            var teamDto = users.Select(u=>u.toUserDto()).ToList();
            var groupdto = group.toTaskGroupDto();
            var prioDto = prio.toPrioDto();
            

            return Ok(asignment.toAssignmentDto(teamDto,prioDto,stateDto,ownerDto,groupdto));
        }

        [HttpGet("getAssignmentsByProject/{project_id}")]
        public async Task<IActionResult> GetAllAssignmentsByProject([FromRoute] int project_id)
        {
            var groups = await _group_repo.GetAllProjectTaskGroupsAsync(project_id);
            var res = new List<AssignmentDto>();
            foreach (var group in groups)
            {
                var tasks = await _asign_repo.GetAllGroupAssignmentsAsync(group.Id);
                for (int i = 0; i< tasks.Count;i++)
                {


                    var ownerDto = tasks[i].User.toUserDto();
                    var stateDto = tasks[i].State.toStateDto();
                    var teamDto = tasks[i].Users.Select(u=>u.toUserDto()).ToList();
                    var groupdto = tasks[i].TaskGroup.toTaskGroupDto();
                    var prioDto = tasks[i].Priority.toPrioDto();
                    res.Add(tasks[i].toAssignmentDto(teamDto,prioDto,stateDto,ownerDto,groupdto));
                }
            }

            return Ok(res);
        }
        
        // [HttpGet("getAllFilteredAssignmentProjects/{project_id}/{DateStartFlag}/{Start}/{DateEndFlag}/{End}/{PercentageFlag}/{PercentageFilter}/{PriorityFilter}/{StateFilter}")]
        // public async Task<IActionResult> GetAllFilteredAssignmentsForProject([FromRoute] int project_id, 
        // int DateStartFlag, DateTime Start, int DateEndFlag, DateTime End, 
        // int StateFilter, int PercentageFlag,int PercentageFilter, int PriorityFilter)
        // {
        //     var project = await _project_repo.GetProjectByIdAsync(project_id);
        //     if(project==null)
        //         return NotFound("Project does not exist.ID:" + project_id);
        //     AssignmentFilterDto dto  = new AssignmentFilterDto{
        //         SearchTitle = "",
        //         DateStartFlag = DateStartFlag,
        //         Start = Start,
        //         DateEndFlag = DateEndFlag,
        //         End = End,
        //         StateFilter = StateFilter,
        //         PercentageFilter = PercentageFilter,
        //         PercentageFlag = PercentageFlag,
        //         PriorityFilter = PriorityFilter
        //     };
        //     var groups = await _group_repo.GetAllProjectTaskGroupsAsync(project);
        //     var assignments = await _asign_repo.GetAllFilteredAssignmentsByProjectGroupsAsync(groups, dto);
            
        //     var res = new List<AssignmentDto>();
        //     foreach (var asignment in assignments)
        //     {
        //         var users = await _user_repo.GetAssignmentUsersAsync(asignment.Id);
        //         List<int> dep = new List<int>();
        //         var dependencies = await _asign_repo.GetAllDependentOnOfAssignmentAsync(asignment.Id);
        //         foreach (var item in dependencies)
        //         {
        //             dep.Add(item.Id);   
        //         }
        //         List<int> ids = new List<int>();
        //         foreach (var user1 in users)
        //         {
        //             ids.Add(user1.Id);
        //         }
        //         res.Add(asignment.toAssignmentDto(ids,dep));
        //     }

        //     return Ok(res);
        // }

        // [HttpGet("getAllFilteredAssignmentsForUser/{user_id}/{DateStartFlag}/{Start}/{DateEndFlag}/{End}/{PercentageFlag}/{PercentageFilter}/{PriorityFilter}/{StateFilter}")]
        // public async Task<IActionResult> GetAllFilteredAssignmentsForUser([FromRoute] int user_id,
        // int DateStartFlag, DateTime Start, int DateEndFlag, DateTime End, 
        // int StateFilter, int PercentageFlag,int PercentageFilter, int PriorityFilter)
        // {
        //     var assignments = await _asign_repo.GetAllUserAssignmentsAsync(user_id);
        //     AssignmentFilterDto dto  = new AssignmentFilterDto{
        //         SearchTitle = "",
        //         DateStartFlag = DateStartFlag,
        //         Start = Start,
        //         DateEndFlag = DateEndFlag,
        //         End = End,
        //         StateFilter = StateFilter,
        //         PercentageFilter = PercentageFilter,
        //         PercentageFlag = PercentageFlag,
        //         PriorityFilter = PriorityFilter
        //     };
        //     assignments = _asign_repo.FilterAssignments(assignments,dto);
            
        //     var res = new List<AssignmentDto>();
        //     foreach (var asignment in assignments)
        //     {
        //         var users = await _user_repo.GetAssignmentUsersAsync(asignment.Id);
        //         List<int> dep = new List<int>();
        //         var dependencies = await _asign_repo.GetAllDependentOnOfAssignmentAsync(asignment.Id);
        //         foreach (var item in dependencies)
        //         {
        //             dep.Add(item.Id);   
        //         }
        //         List<int> ids = new List<int>();
        //         foreach (var user1 in users)
        //         {
        //             ids.Add(user1.Id);
        //         }
        //         res.Add(asignment.toAssignmentDto(ids,dep));
        //     }

        //     return Ok(res);
        // }

        [HttpDelete("deleteAssignmentById/{asign_id}")]
        public async Task<IActionResult> DeleteAssignment([FromRoute] int asign_id)
        {
            var asignment = await _asign_repo.DeleteAssignmentByIdAsync(asign_id);
            if(asignment==null)
                return NotFound("Assignment does not exist.ID:" + asign_id);
            
            return Ok("Assignment with id " + asign_id + " has been deleted successfully!"); 
        }

    }
}