using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.DTOs.Team;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamController : ControllerBase
    {
        private readonly ITeamRepository _team_repo;
        private readonly IUserRepository _user_repo;
        public TeamController(ITeamRepository team_repo, IUserRepository user_repo)
        {
            _user_repo = user_repo;
            _team_repo = team_repo;
        }

        [HttpGet("getTeams")]
        public async Task<IActionResult> GetAllTeams()
        {
            var teams = await _team_repo.GetAllTeamsAsync();

            var teamDtos = new List<TeamDto>();
            foreach (var team in teams)
            {
                var members = team.Users.Select(u=>u.toUserDto(u.Role.toRoleDto())).ToList();
                teamDtos.Add(team.ToTeamDto(members));
            }


            return Ok(teamDtos);
        }
        [HttpGet]
        [Route("getTeam/{teamId}")]

        public async Task<IActionResult> GetTeam([FromRoute] int teamId)
        {
            var team = await _team_repo.GetTeamByIdAsync(teamId);
            if(team==null)
                return NotFound("Team not found!");

            var members = team.Users.Select(u=>u.toUserDto(u.Role.toRoleDto())).ToList();

            return Ok(team.ToTeamDto(members));
        }

        [HttpGet]
        [Route("getUserTeams/{userId}")]
        public async Task<IActionResult> getUserTeams([FromRoute] int userId)
        {
            var teams = await _team_repo.GetAllUserTeams(userId);
            
            var timovi = new List<TeamDto>();
            foreach (var team in teams)
            {
                var members = team.Users.Select(u=>u.toUserDto(u.Role.toRoleDto())).ToList();
                timovi.Add(team.ToTeamDto(members));
            }

            return Ok(timovi);
        }

        [HttpPost("createTeam")]
        public async Task<IActionResult> CreateTeam([FromBody]CreateTeamDto dto)
        {
            var team = dto.fromCreateDtoToTeam();
            
            var users =  new List<User>();
            foreach (var userId in dto.Members)
            {
                var user = await _user_repo.GetUserByIdAsync(userId);
                if(user==null)
                    return NotFound("User not found.ID:" + userId);
                users.Add(user);
            }
            team.Users = users;
            team = await _team_repo.CreateTeamAsync(team);

            var members = users.Select(u=>u.toUserDto(u.Role.toRoleDto())).ToList();
            
            return Ok(team.ToTeamDto(members));
            
        }

        [HttpPut]
        public async Task<IActionResult> UpdateTeam([FromBody] CreateTeamDto dto, [FromRoute] int team_id)
        {
            var users =  new List<User>();
            foreach (var userId in dto.Members)
            {
                var user = await _user_repo.GetUserByIdAsync(userId);
                if(user==null)
                    return NotFound("User not found.ID:" + userId);
                users.Add(user);
            }

            return Ok();
        }

    }
}