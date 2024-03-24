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
        public TeamController(ITeamRepository team_repo)
        {
            _team_repo = team_repo;
        }

        [HttpGet("getTeams")]
        public async Task<IActionResult> GetAllTeams()
        {
            var teams = await _team_repo.GetAllTeamsAsync();

            var teamDtos = new List<TeamDto>();
            foreach (var team in teams)
            {
                var members = await _team_repo.GetTeamUsersByIdAsync(team.Id);
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

            var members = await _team_repo.GetTeamUsersByIdAsync(teamId);

            return Ok(team.ToTeamDto(members));
        }

        [HttpGet]
        [Route("getUserTeams/{userId}")]
        public async Task<IActionResult> getUserTeams([FromRoute] int userId)
        {
            var teams = await _team_repo.GetAllUserTeams(userId);
            
            var timovi = new List<TeamDto>();
            foreach (var item in teams)
            {
                var members = await _team_repo.GetTeamUsersByIdAsync(item.Id);
                timovi.Add(item.ToTeamDto(members));
            }

            return Ok(timovi);
        }

        [HttpPost("createTeam")]
        public async Task<IActionResult> CreateTeam([FromBody]CreateTeamDto dto)
        {
            var team = dto.fromCreateDtoToTeam();

            team = await _team_repo.CreateTeamAsync(team,dto.Members);

            return Ok(team.ToTeamDto(dto.Members));
            
        }

        //TO-DO treba da se uradi jos update timova moguce

    }
}