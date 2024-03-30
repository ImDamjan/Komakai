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
        public async Task<Team> CreateTeamAsync(Team team)
        {
            await _context.Teams.AddAsync(team);
            await _context.SaveChangesAsync();

            return team;

        }

        public async Task<List<Team>> GetAllTeamsAsync()
        {
            return await _context.Teams.Include(t=> t.Users).ToListAsync();
        }

        public async Task<List<Team>> GetAllUserTeams(int userid)
        {
            var user = await _context.Users.Include(u=>u.Teams).FirstOrDefaultAsync(u=>u.Id==userid);
            if(user==null)
                return new List<Team>();
            
            return user.Teams.ToList();

        }

        public async Task<Team?> GetTeamByIdAsync(int id)
        {
            
            var team = await _context.Teams.Include(t=>t.Users).FirstOrDefaultAsync(t=> t.Id==id);
            return team;
        }

        public async Task<List<int>> GetTeamUsersByIdAsync(int teamId)
        {
            var team = await GetTeamByIdAsync(teamId);
            List<int> User_ids =  new List<int>();
            if(team==null)
                return User_ids;
            foreach (var user in team.Users)
            {
                User_ids.Add(user.Id);
            }

            return User_ids;
        }
    }
}