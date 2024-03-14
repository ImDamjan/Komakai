using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
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

        [HttpGet]
        public async Task<IActionResult> GetAllTeams()
        {
            var teams = await _team_repo.GetAllTeamsAsync();


            // var newTeams = teams.Select(t=>t.ToTeamDto());


            return Ok(teams);
        }
    }
}