using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface ITeamRepository
    {
        Task<List<Team>> GetAllTeamsAsync();
        Task<Team?> GetTeamByIdAsync(int id);
        Task<Team> CreateTeamAsync(Team team, List<int> members);
        Task<List<int>> GetTeamUsersByIdAsync(int teamId);
    }
}