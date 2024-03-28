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
        Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId,string period);
        Task<List<Project>> GetAllProjectsAsync();
        Task<List<Project>> GetAllFilteredProjectsAsync(ProjectFilterDto dto);
        Task<Project?> GetProjectByIdAsync(int id);
        Task<Project?> CreateProjectAsync(Project projectModel,List<int> teamMembers);
        Task<Project?> UpdateProjectAsync(int id,UpdateProjectDto projectDto);
        Task<List<Project>> GetAllUserProjectsAsync(int id);
        Task<Project?> DeleteProjectByIdAsync(int project_id);
    }
}