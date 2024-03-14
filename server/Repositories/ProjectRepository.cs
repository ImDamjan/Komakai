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
        public async Task<Project?> CreateProjectAsync(Project projectModel, int userId, List<int> teamMembers)
        {
            var Users = new List<User>();
            var user = await _context.Users.Where(u=> u.Id==userId).FirstOrDefaultAsync();
            if(user==null)
                return null;

            Users.Add(user);
            
            foreach (int userid in teamMembers)
            {
                user = await _context.Users.Where(u=> u.Id==userid).FirstOrDefaultAsync();
                if(user == null)
                    return null;
                Users.Add(user);
            }
            var relationship = new List<TeamUser>();
            var team = new Team{
                Name = projectModel.Title + " Team",
                Type = projectModel.Type   
            };

            foreach (var item in Users)
            {
                relationship.Add(new TeamUser{
                    User = item,
                    Team = team,
                    ProjectRoleId = item.RoleId
                });
            }
            foreach (var item in relationship)
            {
                await _context.TeamUsers.AddAsync(item);
            }
            await _context.Teams.AddAsync(team);
            projectModel.StateId = 1;
            projectModel.Percentage = 0;
            projectModel.PriorityId = 4;
            projectModel.Team = team;
            projectModel.LastStateChangedTime = DateTime.Now;

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
            return await _context.Projects.FirstOrDefaultAsync(p=>p.Id==id);
        }
        public async Task<List<Project>> GetAllUserProjectsAsync(int id)
        {
            var teams = await _context.TeamUsers.Where(u=> u.UserId==id).Select(t=>t.Team).ToListAsync();

            List<Project> projects = new List<Project>();
            foreach (var team in teams)
            {
                var pom = await _context.Projects.Where(p=>p.TeamId==team.Id).ToListAsync();

                projects.AddRange(pom);
            }

            return projects;
        }
        public async Task<Project?> UpdateProjectAsync(int id, UpdateProjectDto projectDto)
        {
            var project = await GetProjectByIdAsync(id);
            if(project==null)
                return null;


            project.LastStateChangedTime = DateTime.Now;
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

            
            var projects = await GetAllUserProjectsAsync(userId);

            


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