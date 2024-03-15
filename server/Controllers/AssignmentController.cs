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
    }
}