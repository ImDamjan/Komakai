using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Projects;
using server.Models;

namespace server.Interfaces
{
    public interface IProjectRepository
    {
        Task<List<Project>> GetAllProjectsAsync();
        Task<Project?> GetProjectByIdAsync(int id);
        Task<Project?> DeleteProjectAsync(int id);
        Task<Project> CreateProjectAsync(Project projectModel);
        Task<Project?> UpdateProjectAsync(int id,UpdateProjectDto projectDto);
        Task<bool> ProjectExists(int id);

    }
}