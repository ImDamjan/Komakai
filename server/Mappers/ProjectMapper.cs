using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Priority;
using server.DTOs.Projects;
using server.DTOs.Role;
using server.DTOs.State;
using server.Models;

namespace server.Mappers
{
    public static class ProjectMapper
    {
        public static ProjectDto ToProjectDto(this Project p)
        {
            return new ProjectDto{
                Id = p.Id,
                Spent=p.Spent,
                StateId=p.StateId,
                Start=p.Start,
                Percentage = p.Percentage,
                End = p.End,
                EstimatedTime = p.EstimatedTime,
                Title = p.Title,
                Budget = p.Budget,
                Type = p.Type,
                TeamId = p.TeamId,
                PriorityId = p.PriorityId

            };
        }

        public static Project toProjectFromCreateDto(this CreateProjectDto dto, int stateId)
        {
            return new Project{
                Title = dto.Title,
                Type = dto.Type,
                Start = DateTime.Now, 
                EstimatedTime = dto.EstimatedTime,
                Spent = 0,
                Percentage = 0,
                StateId = stateId,
                Description = dto.Description,
                PriorityId = dto.PriorityId
            };
        }
        public static PriorityDto toPrioDto(this Priority prio)
        {
            return new PriorityDto{
                Id = prio.Id,
                Description = prio.Description,
                Level = prio.Level
            };
        }

        public static RoleDto toRoleDto(this Role role)
        {
            return new RoleDto{
                Id = role.Id,
                Name = role.Name
            };
        }

        public static StateDto toStateDto(this State state)
        {
            return new StateDto{
                Id = state.Id,
                Name = state.Name
            };
        }
    }
}