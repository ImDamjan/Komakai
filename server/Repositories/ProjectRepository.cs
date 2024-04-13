using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
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


        public async Task<List<Project>> GetAllProjectsAsync(ProjectFilterDto? filter=null,SortDto? sort = null)
        {
            var projects_query = _context.Projects
            .Include(p=>p.TaskGroups)
            .Include(p=>p.State)
            .Include(p=>p.Priority).AsQueryable();

            //filter za sve projekte

            return await GetAllFilteredProjectsAsync(projects_query, filter,sort);
        }

        public async Task<Project?> GetProjectByIdAsync(int id)
        {
            return await _context.Projects
            .Include(p=>p.TaskGroups)
            .Include(p=>p.State)
            .Include(p=>p.Priority)
            .Include(p=>p.ProjectUsers)
            .FirstOrDefaultAsync(p=>p.Id==id);
        }
        public async Task<List<Project>> GetAllUserProjectsAsync(int id,ProjectFilterDto? filter=null,SortDto? sort = null)
        {
            var projects_query = _context.ProjectUsers
            .Where(u=> u.UserId==id)
            .Include(u=>u.Project)
            .ThenInclude(p=>p.State)
            .Include(p=>p.Project)
            .ThenInclude(p=>p.TaskGroups)
            .Include(p=>p.Project)
            .ThenInclude(p=>p.Priority)
            .Select(p=>p.Project)
            .OrderByDescending(p=>p.LastStateChangedTime).AsQueryable();

            return await GetAllFilteredProjectsAsync(projects_query,filter,sort);
        }
        public async Task<Project?> UpdateProjectAsync(UpdateProjectDto projectDto, int project_id, List<User> project_users)
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
            List<ProjectUser> users = new List<ProjectUser>();
            foreach(var user in project_users)
            {
                users.Add(new ProjectUser{
                    Project = project,
                    User = user,
                    ProjectRoleId = user.RoleId
                });
            }
            project.Percentage = projectDto.Percentage;
            project.ProjectUsers = users;
            project.Title = projectDto.Title;
            project.Description = projectDto.Description;
            project.End = projectDto.End;
            project.Start = projectDto.Start;
            project.Spent = projectDto.Spent;
            
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


            // trebace flter za dashboard mozda
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

        public async Task<List<Project>> GetAllFilteredProjectsAsync(IQueryable<Project> projects, ProjectFilterDto? dto,SortDto? sort = null)
        {   if(dto!=null)
            {

                if(dto.StateFilter > 0 && dto.StateFilter < 7)
                    projects = projects.Where(p=>p.StateId==dto.StateFilter);
                if(dto.PriorityFilter > 0 && dto.PriorityFilter < 5)
                    projects = projects.Where(p=>p.PriorityId==dto.PriorityFilter);
                
                if(dto.SearchTitle!=string.Empty)
                    projects = projects.Where(p=>p.Title.ToLower().Contains(dto.SearchTitle.ToLower()));
                //budzet
                if(dto.BudgetFilter !=null)
                {
                    if(dto.BudgetFlag==-1)
                        projects = projects.Where(p=>p.Budget < dto.BudgetFilter);
                    else if(dto.BudgetFlag==1)
                        projects = projects.Where(p=>p.Budget >= dto.BudgetFilter);
                }
                //spent
                if(dto.SpentFilter != null)
                {
                    if(dto.SpentFlag==-1)
                        projects = projects.Where(p=>p.Spent < dto.SpentFilter);
                    else if(dto.SpentFlag==1)
                        projects = projects.Where(p=>p.Spent >= dto.SpentFilter);
                }

                //datumi
                if(dto.Start!=null)
                {
                    if(dto.DateStartFlag==-1)
                        projects = projects.Where(p=>p.Start < dto.Start);
                    else if(dto.DateStartFlag==1)
                        projects = projects.Where(p=>p.Start >= dto.Start);
                }
                if(dto.End!=null)
                {

                    if(dto.DateEndFlag==-1)
                        projects = projects.Where(p=>p.End < dto.End);
                    else if(dto.DateEndFlag==1)
                        projects = projects.Where(p=>p.End >= dto.End);
                }

                if(dto.PercentageFilter!=null)
                {

                    if(dto.PercentageFlag==-1)
                        projects = projects.Where(p=>p.Percentage < dto.PercentageFilter);
                    else if(dto.PercentageFlag==1)
                        projects = projects.Where(p=>p.Percentage >= dto.PercentageFilter);
                }
            }
            if(sort!=null)
            {
                if(sort.PropertyName.ToLower()=="title")
                {
                    if(sort.SortFlag==1)
                        projects = projects.OrderBy(p=>p.Title);
                    else
                        projects = projects.OrderByDescending(p=>p.Title);
                }
                else if(sort.PropertyName.ToLower()=="state")
                {
                    if(sort.SortFlag==1)
                        projects = projects.OrderBy(p=>p.State.Name);
                    else
                        projects = projects.OrderByDescending(p=>p.State.Name);
                }
                else if(sort.PropertyName.ToLower()=="priority")
                {
                    if(sort.SortFlag==1)
                        projects = projects.OrderBy(p=>p.Priority.Level);
                    else
                        projects = projects.OrderByDescending(p=>p.Priority.Level);
                }
                else if(sort.PropertyName.ToLower()=="budget")
                {
                    if(sort.SortFlag==1)
                        projects = projects.OrderBy(p=>p.Budget);
                    else
                        projects = projects.OrderByDescending(p=>p.Budget);
                }
                else if(sort.PropertyName.ToLower()=="spent")
                {
                    if(sort.SortFlag==1)
                        projects = projects.OrderBy(p=>p.Spent);
                    else
                        projects = projects.OrderByDescending(p=>p.Spent);
                }
                else if(sort.PropertyName.ToLower()=="start")
                {
                    if(sort.SortFlag==1)
                        projects = projects.OrderBy(p=>p.Start);
                    else
                        projects = projects.OrderByDescending(p=>p.Start);
                }
                else if(sort.PropertyName.ToLower()=="end")
                {
                    if(sort.SortFlag==1)
                        projects = projects.OrderBy(p=>p.End);
                    else
                        projects = projects.OrderByDescending(p=>p.End);
                }
                else if(sort.PropertyName.ToLower()=="percentage")
                {
                    if(sort.SortFlag==1)
                        projects = projects.OrderBy(p=>p.Percentage);
                    else
                        projects = projects.OrderByDescending(p=>p.Percentage);
                }
            }
            return await projects.ToListAsync();

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