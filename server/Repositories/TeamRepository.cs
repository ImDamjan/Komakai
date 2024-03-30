using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Mappers;
using server.Models;

namespace server.Repositories
{
    public class TeamRepository : ITeamRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public TeamRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public async Task<Team> CreateTeamAsync(Team team, List<int> memebers)
        {
            foreach (var user in memebers)
            {
                // await _context.TeamUsers.AddAsync(new TeamUser{ Team = team, UserId = user});
            }

            await _context.Teams.AddAsync(team);

            await _context.SaveChangesAsync();

            return team;

        }

        public async Task<List<Team>> GetAllTeamsAsync()
        {
            // return await _context.Teams.Include(t=> t.TeamUsers).ToListAsync();
            return null;
        }

        public async Task<List<Team>> GetAllUserTeams(int userid)
        {
            return null;
            // return await _context.TeamUsers.Where(t=>t.UserId==userid).Select(t=>t.Team).ToListAsync();
        }

        public async Task<Team?> GetTeamByIdAsync(int id)
        {
            
            var team = await _context.Teams.FirstOrDefaultAsync(t=> t.Id==id);

            if(team==null)
                return null;

            return team;
        }

        public async Task<List<int>> GetTeamUsersByIdAsync(int teamId)
        {
            // return await _context.TeamUsers.Where(t=>t.TeamId==teamId).Select(t=>t.UserId).ToListAsync();
            return null;
        }
    }
}