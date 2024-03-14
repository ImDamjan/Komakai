using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Team;
using server.Models;

namespace server.Mappers
{
    public static class TeamMapper
    {
        public static TeamDto ToTeamDto(this Team t, List<int> members)
        {
            return new TeamDto{
                Id = t.Id,
                Name = t.Name,
                Type = t.Type,
                Members = members
            };
        }
    }
}