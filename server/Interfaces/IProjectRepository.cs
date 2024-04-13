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
        //dashboard podaci
        Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId,string period);
        //uzimanje svih projekata
        Task<List<Project>> GetAllProjectsAsync(ProjectFilterDto? filter=null);
        //filtriranje projekata
        Task<List<Project>> GetAllFilteredProjectsAsync(IQueryable<Project> projects, ProjectFilterDto? dto);
        //uzimanje projekta po idju
        Task<Project?> GetProjectByIdAsync(int id);
        //kreiranje
        Task<Project> CreateProjectAsync(Project projectModel,List<User> teamMembers);
        //update
        Task<Project?> UpdateProjectAsync(UpdateProjectDto projectDto, int project_id, List<User> project_users);
        // koirniskove projekte
        Task<List<Project>> GetAllUserProjectsAsync(int id,ProjectFilterDto? filter=null);
        //brisanje
        Task<Project?> DeleteProjectByIdAsync(int project_id);
    }
}