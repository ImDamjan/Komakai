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
                Title = p.Title,
                Budget = p.Budget,
                Type = p.Type,
                PriorityId = p.PriorityId,
                Description = p.Description,

            };
        }

        public static Project toProjectFromCreateDto(this CreateProjectDto dto)
        {
            return new Project{
                Title = dto.Title,
                Type = dto.Type,
                Start = dto.Start, 
                Spent = 0,
                Percentage = 0,
                StateId = 1,
                Description = dto.Description,
                PriorityId = dto.PriorityId,
                End = dto.End,

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