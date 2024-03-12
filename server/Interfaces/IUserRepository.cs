using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Projects;
using server.Models;

namespace server.Interfaces
{
    public interface IUserRepository
    {
        Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId,string period);

        Task AddUserAsync(User user);

        Task <List<User>> GetAllUsersAsync();

        Task<User> GetUserByIdAsync(int id);

        Task<List<User>> GetUsersByRoleAsync(string roleName);

        Task<User> GetUserByUsernameAsync(string username);
    }
}