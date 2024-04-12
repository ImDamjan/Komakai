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
        public static UserDto toUserDto(this User u, RoleDto role)
        {
            return new UserDto{
                Id = u.Id,
                Username = u.Username,
                Email = u.Email,
                Role = role,
                JobTitle = u.JobTitle,
                Organisation = u.Organisation,
                Department = u.Department,
                Name = u.Name,
                Lastname = u.Lastname
            };
        }
    }
}