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
        Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId);
        Task<List<Project>> GetAllUserProjectsAsync(int id);
    }
}