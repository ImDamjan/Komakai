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

        private readonly ITeamRepository _team_repo;

        public AssignmentController(IAssignmentRepository asign_repo, IUserRepository user_repo
        , IProjectRepository project_repo, IPriorityRepository prio_repo, ITeamRepository team_repo)
        {
            _asign_repo = asign_repo;
            _project_repo = project_repo;
            _prio_repo = prio_repo;
            _user_repo = user_repo;
            _team_repo = team_repo;
        }

        [HttpPost]
        [Route("createAssingment")]
        public async Task<IActionResult> CreateAssignment([FromBody]CreateAssignmentDto dto)
        {
            var project = await _project_repo.GetProjectByIdAsync(dto.ProjectId);
            if(project==null)
                return NotFound("Project with " + dto.ProjectId+ " does not exist");
            
            var users = new List<User>();
            var team = await _team_repo.GetTeamUsersByIdAsync(project.TeamId);
            foreach (var userId in dto.UserIds)
            {
                if(!team.Contains(userId))
                    return BadRequest("User " + userId + " is not on project " + project.Id);
                var user = await _user_repo.GetUserByIdAsync(userId);
                users.Add(user);
            }
            

            var prio = await _prio_repo.GetPriority(dto.PriorityId);
            if(prio==null)
                return BadRequest("Priority with "+ dto.PriorityId+ " does not exist");
            
            var a = await _asign_repo.CreateAssignment(dto.fromCreateDtoToAssignment(),project,null,prio,users);

            return Ok(a.toAssignmentDto(dto.UserIds));
        }
        [HttpGet]
        [Route("getTasksByProject/{project_id}")]

        public async Task<IActionResult> GetAllTasksByProject([FromRoute] int project_id)
        {
            var tasks =  await _asign_repo.GetAllProjectAssignments(project_id);
            var users = tasks.Select(t=> t.Users.ToList()).ToList();
            List<AssignmentDto> res = new List<AssignmentDto>();

            for (int i = 0; i < tasks.Count; i++)
            {
                List<int> ids = new List<int>();

                for (int j = 0; j < users[i].Count; j++)
                {
                    ids.Add(users[i][j].Id);
                }
                res.Add(tasks[i].toAssignmentDto(ids));
            }

            return Ok(res);
        }

        [HttpGet]
        [Route("getTasksByUser/{user_id}")]
        public async Task<IActionResult> GetAllTasksByUser([FromRoute] int user_id)
        {
            var user =  await _user_repo.GetUserByIdAsync(user_id);
            if(user==null)
                return BadRequest("User " + user_id + " does not exist");
            var tasks = await _asign_repo.GetAllUserAssignments(user_id);
            List<AssignmentDto> res = new List<AssignmentDto>();

            for (int i = 0; i < tasks.Count; i++)
            {
                List<int> ids = new List<int>();

                res.Add(tasks[i].toAssignmentDto(ids));
            }

            return Ok(res);
        }

    }
}