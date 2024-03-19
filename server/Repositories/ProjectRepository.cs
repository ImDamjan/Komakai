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

        //TO-DO treba da se proveri da li postoji project manager u prosledjenim idijevima
        public async Task<Project?> CreateProjectAsync(Project projectModel, List<int> teamMembers, Period per)
        {
            var Users = new List<User>();
            
            foreach (int userid in teamMembers)
            {
                var user = await _context.Users.Where(u=> u.Id==userid).FirstOrDefaultAsync();
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

            if(projectModel.PriorityId > 4 || projectModel.PriorityId < 1)
                projectModel.PriorityId = 4;
            projectModel.Start = DateTime.Now;
            if(per.Name=="Day")
                projectModel.End = DateTime.Now.AddDays(per.Value * projectModel.EstimatedTime);
            else if(per.Name=="Week")
                projectModel.End = DateTime.Now.AddDays(per.Value * projectModel.EstimatedTime);
            else if(per.Name == "Month")
                projectModel.End = DateTime.Now.AddMonths(projectModel.EstimatedTime);
            else if(per.Name=="Year")
                projectModel.End = DateTime.Now.AddDays(projectModel.EstimatedTime);
            else
                return null;
            projectModel.Team = team;
            projectModel.LastStateChangedTime = DateTime.Now;

            await _context.Projects.AddAsync(projectModel);
            await _context.SaveChangesAsync();

            return projectModel;
        }


        public async Task<List<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects.ToListAsync();
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
        public async Task<Project?> UpdateProjectAsync(int id, UpdateProjectDto projectDto, Period? per)
        {
            var project = await GetProjectByIdAsync(id);
            if(project==null)
                return null;


            project.LastStateChangedTime = DateTime.Now;
            project.Spent=projectDto.Spent;
            if(projectDto.StateId > 0 && projectDto.StateId < 7)
                project.StateId=projectDto.StateId;
            project.Percentage = projectDto.Percentage;
            project.Title = projectDto.Title;
            if(per!=null)
            {
                project.PeriodId = projectDto.PeriodId;
                project.EstimatedTime+= projectDto.EstimatedTime;
                if(per.Name=="Day")
                    project.End = project.End.AddDays(per.Value * project.EstimatedTime);
                else if(per.Name=="Week")
                    project.End = project.End.AddDays(per.Value * project.EstimatedTime);
                else if(per.Name == "Month")
                    project.End = project.End.AddMonths(project.EstimatedTime);
                else if(per.Name=="Year")
                    project.End = project.End.AddYears(project.EstimatedTime);
            }
            
            if(projectDto.PriorityId > 0 && projectDto.PriorityId < 5)
                project.PriorityId = projectDto.PriorityId;

            await _context.SaveChangesAsync();

            return project;
        }
        public async Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId,Period period)
        {
            DateTime past = DateTime.MinValue;
            if(period.Value == 30)
                past = DateTime.Now.AddMonths(-1);
            else if(period.Value == 7)
                past = DateTime.Now.AddDays(-period.Value);

            
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
                    item.Percentage = item.count/(projects.Count*1.0f)*100;
                    
            }


            return lista;

        }
    }
}