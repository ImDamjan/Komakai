using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Assignment;
using server.DTOs.Priority;
using server.DTOs.State;
using server.DTOs.Users;
using server.Models;

namespace server.Mappers
{
    public static class AssignmentMapper
    {
        public static Assignment fromCreateDtoToAssignment(this CreateAssignmentDto dto, List<User> users, List<Assignment> dependencies, TaskGroup group)
        {
            return new Assignment{
                Owner = dto.Owner,
                Title = dto.Title,
                Type = dto.Type,
                Start = dto.Start,
                End = dto.End,
                StateId = dto.StateId,
                Description = dto.Description,
                Users = users,
                TaskGroup = group,
                DependentOnAssignments = dependencies,
                PriorityId = dto.PriorityId
            };
        }

        public static AssignmentDto toAssignmentDto(this Assignment a, List<UserDto> asignees, PriorityDto priority, StateDto state, UserDto owner, TaskGroupDto group)
        {
            return new AssignmentDto{
                Id = a.Id,
                Title = a.Title,
                Owner = owner,
                Description = a.Description,
                Start = a.Start,
                End = a.End,
                State = state,
                Percentage = a.Percentage,
                Priority = priority,
                Type = a.Type,
                Assignees = asignees,
                TaskGroup =  group
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