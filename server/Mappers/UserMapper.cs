using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
                RoleId = (int)u.RoleId
            };
        }
    }
}