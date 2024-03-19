using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Assignment;
using server.Models;

namespace server.Mappers
{
    public static class AssignmentMapper
    {
        public static Assignment fromCreateDtoToAssignment(this CreateAssignmentDto dto)
        {
            return new Assignment{
                Title = dto.Title,
                Type = dto.Type,
                Description = dto.Description,
                EstimatedTime = dto.EstimatedTime,
                PeriodId = dto.PeriodId
            };
        }

        public static AssignmentDto toAssignmentDto(this Assignment a, List<int> asignees)
        {
            return new AssignmentDto{
                Id = a.Id,
                Title = a.Title,
                Description = a.Description,
                Start = a.Start,
                End = a.End,
                StateId = a.StateId,
                Percentage = a.Percentage,
                PriorityId = a.PriorityId,
                ProjectId = a.ProjectId,
                Type = a.Type,
                Assignees = asignees
            };
        }

        public static TaskGroup fromCreateTaskGroupDtoToTaskGroup(this CreateTaskGroupDto dto)
        {
            return new TaskGroup{
                Title = dto.Title,
                ProjectId = dto.ProjectId,
                ParentTaskGroupId = dto.ParentTaskGroupId
            };
        }

        public static TaskGroupDto toTaskGroupDto(this TaskGroup group)
        {
            return new TaskGroupDto{
                Id = group.Id,
                Title = group.Title,
                ProjectId = group.ProjectId,
                ParentTaskGroupId = group.ParentTaskGroupId
            };
        }
    }
}