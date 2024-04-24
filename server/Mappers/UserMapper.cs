using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Role;
using server.DTOs.Users;
using server.Models;

namespace server.Mappers
{
    public static class UserMapper
    {
        public static UserDto toUserDto(this User u)
        {
            return new UserDto{
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                JobTitle = u.JobTitle,
                Organisation = u.Organisation,
                Department = u.Department,
                Name = u.Name,
                Lastname = u.Lastname,
                IsActivated = u.IsActivated
            };
        }
        public static AssignmentUserDto toAssignmentUserDto(this User u)
        {
            return new AssignmentUserDto{
                Id = u.Id,
                Username = u.Username,
                Name = u.Name,
                Lastname = u.Lastname
            };
        }

        public static ProjectUserDto toProjectUserDto(this User u, RoleDto role)
        {
            return new ProjectUserDto{
                Id = u.Id,
                Username = u.Username,
                Name = u.Name,
                Lastname = u.Lastname,
                Role = role
            };
        }

        public static UserRoleDto toUserRoleDto(this User u, RoleDto role)
        {
            return new UserRoleDto{
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                JobTitle = u.JobTitle,
                Organisation = u.Organisation,
                Department = u.Department,
                Name = u.Name,
                Lastname = u.Lastname,
                IsActivated = u.IsActivated,
                Role = role
            };
        }
    }
}