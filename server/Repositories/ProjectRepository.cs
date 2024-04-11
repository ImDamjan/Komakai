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

        
        public async Task<Project> CreateProjectAsync(Project projectModel, List<User> teamMembers)
        {
            
            var relationship = new List<ProjectUser>();



            projectModel.LastStateChangedTime = DateTime.Now;

            await _context.Projects.AddAsync(projectModel);
            foreach (var user in teamMembers)
            {
                relationship.Add(
                    new ProjectUser{
                        User = user,
                        Project = projectModel,
                        Role = user.Role
                    }
                );
            }
     
            foreach (var item in relationship)
            {
                await _context.ProjectUsers.AddAsync(item);
            }
            await _context.SaveChangesAsync();

            return projectModel;
        }


        public async Task<List<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects
            .Include(p=>p.TaskGroups)
            .Include(p=>p.State)
            .Include(p=>p.Priority).ToListAsync();
        }

        public async Task<Project?> GetProjectByIdAsync(int id)
        {
            return await _context.Projects
            .Include(p=>p.TaskGroups)
            .Include(p=>p.State)
            .Include(p=>p.Priority)
            .FirstOrDefaultAsync(p=>p.Id==id);
        }
        //naslov, description, state, memberi,prioprity ,broj_aktivnih_taskova_projekta
        public async Task<List<Project>> GetAllUserProjectsAsync(int id)
        {
            var projects = await _context.ProjectUsers
            .Where(u=> u.UserId==id)
            .Include(u=>u.Project)
            .ThenInclude(p=>p.State)
            .Include(p=>p.Project)
            .ThenInclude(p=>p.TaskGroups)
            .Include(p=>p.Project)
            .ThenInclude(p=>p.Priority)
            .Select(p=>p.Project)
            .OrderByDescending(p=>p.LastStateChangedTime).ToListAsync();

            return projects;
        }
        public async Task<Project?> UpdateProjectAsync(UpdateProjectDto projectDto, int project_id)
        {
            var project = await GetProjectByIdAsync(project_id);
            if(project==null)
                return null;


            project.Spent=projectDto.Spent;
            if(projectDto.StateId > 0 && projectDto.StateId < 7 && projectDto.StateId!=project.StateId)
            {
                project.StateId=projectDto.StateId;
                project.LastStateChangedTime = DateTime.Now;
            }
            project.Percentage = projectDto.Percentage;
            project.Title = projectDto.Title;
            
            if(projectDto.PriorityId > 0 && projectDto.PriorityId < 5)
                project.PriorityId = projectDto.PriorityId;

            await _context.SaveChangesAsync();

            return project;
        }
        public async Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId,string period)
        {
            DateTime past = DateTime.MinValue;
            if(period.ToLower() == "month")
                past = DateTime.Now.AddMonths(-30);
            else if(period.ToLower() == "week")
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
                int res = DateTime.Compare(past,project.LastStateChangedTime);
                foreach(var item in lista)
                {
                    if(item.StateId==project.StateId && res <= 0)
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

        public async Task<List<Project>> GetAllFilteredProjectsAsync(ProjectFilterDto dto)
        {
            var projects = await GetAllUserProjectsAsync(dto.UserId);
            
            if(dto.StateFilter > 0 && dto.StateFilter < 7)
                projects = projects.Where(p=>p.StateId==dto.StateFilter).ToList();
            if(dto.PriorityFilter > 0 && dto.PriorityFilter < 5)
                projects = projects.Where(p=>p.PriorityId==dto.PriorityFilter).ToList();
            
            if(dto.SearchTitle!=string.Empty)
                projects = projects.Where(p=>p.Title.ToLower().Contains(dto.SearchTitle.ToLower())).ToList();
            //budzet
            if(dto.BudgetFlag==-1)
                projects = projects.Where(p=>p.Budget < dto.BudgetFilter).ToList();
            else if(dto.BudgetFlag==1)
                projects = projects.Where(p=>p.Budget >= dto.BudgetFilter).ToList();
            //spent
            if(dto.SpentFlag==-1)
                projects = projects.Where(p=>p.Spent < dto.SpentFilter).ToList();
            else if(dto.SpentFlag==1)
                projects = projects.Where(p=>p.Spent >= dto.SpentFilter).ToList();

            //datumi
            if(dto.DateStartFlag==-1)
                projects = projects.Where(p=>p.Start < dto.Start).ToList();
            else if(dto.DateStartFlag==1)
                projects = projects.Where(p=>p.Start >= dto.Start).ToList();

            if(dto.DateEndFlag==-1)
                projects = projects.Where(p=>p.End < dto.End).ToList();
            else if(dto.DateEndFlag==1)
                projects = projects.Where(p=>p.End >= dto.End).ToList();

            if(dto.PercentageFlag==-1)
                projects = projects.Where(p=>p.Percentage < dto.PercentageFilter).ToList();
            else if(dto.PercentageFlag==1)
                projects = projects.Where(p=>p.Percentage >= dto.PercentageFilter).ToList();
            return projects;

        }

        public async Task<Project?> DeleteProjectByIdAsync(int project_id)
        {
            var project = await GetProjectByIdAsync(project_id);
            if(project==null)
                return null;
            
            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return project;
        }
    }
}