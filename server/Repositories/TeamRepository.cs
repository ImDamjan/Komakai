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
        public async Task<Team> CreateTeamAsync(Team team, List<User> memebers)
        {
            foreach (var user in memebers)
            {
                await _context.TeamUsers.AddAsync(new TeamUser{ Team = team, User = user});
            }

            await _context.Teams.AddAsync(team);

            await _context.SaveChangesAsync();

            return team;

        }

        public async Task<Team?> DeleteTeamAsync(int id)
        {
            var team = await GetTeamByIdAsync(id);

            if(team==null)
                return null;

            _context.Teams.Remove(team);
            await _context.SaveChangesAsync();
            
            return team;
        }

        public async Task<Team?> DeleteUserFromTeam(int userId, int teamId)
        {
            var teamUser = await _context.TeamUsers.FirstOrDefaultAsync(tu=> tu.UserId==userId && tu.TeamId==teamId);

            if(teamUser==null)
                return null;

            _context.TeamUsers.Remove(teamUser);
            await _context.SaveChangesAsync();

            var teamMembers = await GetTeamUsersByIdAsync(teamId);

            if(teamMembers.Count==0)
            {
                await DeleteTeamAsync(teamId);
                return null;
            }

            return await GetTeamByIdAsync(teamId);
                        
        }

        public async Task<List<Team>> GetAllTeamsAsync()
        {
            return await _context.Teams.Include(t=> t.TeamUsers).ToListAsync();
        }

        public async Task<Team?> GetTeamByIdAsync(int id)
        {
            var team = await _context.Teams.FirstOrDefaultAsync(t=> t.Id==id);

            if(team==null)
                return null;

            return team;
        }

        public async Task<List<TeamUser>> GetTeamUsersByIdAsync(int teamId)
        {
            return await _context.TeamUsers.Where(tu=>tu.TeamId==teamId).ToListAsync();
        }
    }
}