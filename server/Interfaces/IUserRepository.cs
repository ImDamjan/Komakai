using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IUserRepository
    {
        Task<List<Project>> GetAllUserProjectsAsync(int id);

        Task AddUserAsync(User user);

        Task<User> GetUserByUsernameAsync(string username);
    }
}