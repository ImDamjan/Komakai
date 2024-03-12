using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Projects;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public ProjectRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public async Task<Project?> CreateProjectAsync(Project projectModel, int userId)
        {
            var user = await _context.Users.Where(u=> u.Id==userId).FirstOrDefaultAsync();

            if(user==null)
                return null;

            projectModel.StateId = 1;
            projectModel.LastStateChange = DateTime.Now;
            ProjectUser relation = new ProjectUser(){
                Project = projectModel,
                User = user,
                ProjectRoleId = 1
            };
            await _context.ProjectUsers.AddAsync(relation);
            await _context.Projects.AddAsync(projectModel);
            await _context.SaveChangesAsync();

            return projectModel;
        }

        public async Task<Project?> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p=> p.Id==id);
            if(project==null)
                return null;
            
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
                
            return project;
        }

        public async Task<List<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects.Include(p=> p.Projects).ToListAsync();
        }

        public async Task<Project?> GetProjectByIdAsync(int id)
        {
            return await _context.Projects.FindAsync(id);
        }

        public async Task<bool> ProjectExists(int id)
        {
            return await _context.Projects.AnyAsync(p=> p.Id==id);
        }
        public async Task<List<Project>> GetAllUserProjectsAsync(int id)
        {
            return await _context.ProjectUsers.Where(u=> u.UserId==id).Select(p=> p.Project).ToListAsync();
        }
        public async Task<Project?> UpdateProjectAsync(int id, UpdateProjectDto projectDto)
        {
            var project = await _context.Projects.FirstOrDefaultAsync(p=> p.Id==id);
            if(project==null)
                return null;


            project.LastStateChange = DateTime.Now;
            project.Spent=projectDto.Spent;
            project.StateId=projectDto.StateId;
            project.Start=projectDto.Start;
            project.Percentage = projectDto.Percentage;
            project.End = projectDto.End;
            project.EstimatedTime = projectDto.EstimatedTime;
            project.Title = projectDto.Title;

            await _context.SaveChangesAsync();

            return project;
        }
        public async Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId,string period)
        {
            DateTime past = DateTime.MinValue;
            if(period.ToLower()=="month")
                past = DateTime.Now.AddDays(-30);
            else if(period.ToLower()=="week")
                past = DateTime.Now.AddDays(-7);

            var projects = await _context.ProjectUsers.Where(u=> u.UserId==userId).Select(p=> p.Project).Where(p=>p.LastStateChange>=past).ToListAsync();

            List<ProjectStatesDto> lista = new List<ProjectStatesDto>();

            foreach (var state in _context.States)
            {
                ProjectStatesDto pom = new ProjectStatesDto();
                pom.count = 0;
                pom.StateName = state.Name;
                pom.StateId = state.Id;
                pom.Percentage = 0;

                lista.Add(pom);
            }

            foreach (var project in projects)
            {
                foreach(var item in lista)
                {
                    if(item.StateId==project.StateId)
                    {
                        item.count++;
                        break;
                    }
                }
            }

            //racunanje procenata po stateovima
            foreach (var item in lista)
            {
                if(item.count>0)
                    item.Percentage = projects.Count/(item.count*1.0f)*100;
                    
            }


            return lista;

        }
    }
}