using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Team;
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

        // public async Task<List<User>> GetTeamUsersByIdAsync(int teamId)
        // {
        //     var team = await GetTeamByIdAsync(teamId);
        //     if(team==null)
        //         return new List<User>();
        //     return team.Users.ToList();
        // }

        public async Task<Team?> UpdateTeamAsync(CreateTeamDto dto, int team_id, List<User> members)
        {
            var team = await GetTeamByIdAsync(team_id);

            if(team==null)
                return null;
            
            team.Name = dto.Name;
            team.Users = members;
            team.Type = dto.Type;
            
            await _context.SaveChangesAsync();

            return team;
        }
    }
}