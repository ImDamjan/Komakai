using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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
        private readonly IProjectRepository _project_repo;
        private readonly IPriorityRepository _prio_repo;
        private readonly IUserRepository _user_repo;
        private readonly IPeriodRepository _per_repo;
        private readonly ITeamRepository _team_repo;

        public AssignmentController(IAssignmentRepository asign_repo, IUserRepository user_repo
        , IProjectRepository project_repo, IPriorityRepository prio_repo, ITeamRepository team_repo, IPeriodRepository per_repo)
        {
            _asign_repo = asign_repo;
            _project_repo = project_repo;
            _prio_repo = prio_repo;
            _user_repo = user_repo;
            _per_repo = per_repo;
            _team_repo = team_repo;
        }

        [HttpPost]
        [Route("create")]
        public async Task<IActionResult> CreateAssignment([FromBody]CreateAssignmentDto dto)
        {

            //da li je project validan
            var project = await _project_repo.GetProjectByIdAsync(dto.ProjectId);
            if(project==null)
                return NotFound("Project with " + dto.ProjectId+ " does not exist");
            


            //proverava da li su useri validni
            var users = new List<User>();
            var team = await _team_repo.GetTeamUsersByIdAsync(project.TeamId);
            foreach (var userId in dto.UserIds)
            {
                if(!team.Contains(userId))
                    return BadRequest("User " + userId + " is not on project " + project.Id);
                var user = await _user_repo.GetUserByIdAsync(userId);
                users.Add(user);
            }
            
            //da li je prio validan
            var prio = await _prio_repo.GetPriority(dto.PriorityId);
            if(prio==null)
                return BadRequest("Priority with "+ dto.PriorityId+ " does not exist");

            
            var per = await _per_repo.GetPeriod(dto.PeriodId);
            if(per==null)
                return BadRequest("There is no such period");
            
            var a = await _asign_repo.CreateAssignmentAsync(dto.fromCreateDtoToAssignment(),project,prio,users,per);

            return Ok(a.toAssignmentDto(dto.UserIds));
        }
        [HttpGet]
        [Route("getByProject/{project_id}")]

        public async Task<IActionResult> GetAllAssignmentsByProject([FromRoute] int project_id)
        {
            var tasks =  await _asign_repo.GetAllProjectAssignmentsAsync(project_id);
            List<AssignmentDto> res = new List<AssignmentDto>();

            for (int i = 0; i < tasks.Count; i++)
            {
                List<int> ids = new List<int>();
                var users = await _asign_repo.GetAssignmentUsersAsync(tasks[i].Id);
                foreach (var user in users)
                {
                    ids.Add(user.Id);
                }
                res.Add(tasks[i].toAssignmentDto(ids));
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
                var users = await _asign_repo.GetAssignmentUsersAsync(tasks[i].Id);
                foreach (var user1 in users)
                {
                    ids.Add(user1.Id);
                }
                res.Add(tasks[i].toAssignmentDto(ids));
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
            foreach (var user1 in users)
            {
                ids.Add(user1.Id);
            }
            

            return Ok(task.toAssignmentDto(ids));
        }

        [HttpPut]
        [Route("update/{task_id}")]
        public async Task<IActionResult> UpdateAssignmentById([FromBody]UpdateAssignmentDto dto,[FromRoute] int task_id)
        {
            var per = await _per_repo.GetPeriod(dto.PeriodId);
            if(per==null && dto.PeriodId!=0)
                return BadRequest("There is no such period");
            var asignment = await _asign_repo.UpdateAssignmentAsync(dto,task_id,per);

            if(asignment==null)
                return BadRequest("Assignment does not exist");
            
            var users = await _asign_repo.GetAssignmentUsersAsync(task_id);
            List<int> ids = new List<int>();
            foreach (var user1 in users)
            {
                ids.Add(user1.Id);
            }
            

            return Ok(asignment.toAssignmentDto(ids));
        }
    }
}