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
        Task<Team> CreateTeamAsync(Team team, List<User> members);

        Task<Team?> DeleteUserFromTeam(int userId, int teamId);

        Task<List<TeamUser>> GetTeamUsersByIdAsync(int teamId);

        Task<Team?> DeleteTeamAsync(int id);
    }
}