using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs;
using server.DTOs.Assignment;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class AssignmentRepository : IAssignmentRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public AssignmentRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }

        public async Task<Assignment> CreateAssignmentAsync(Assignment a)
        {
            a.LastTimeChanged = DateTime.Now;
            await _context.Assignments.AddAsync(a);
            await _context.SaveChangesAsync();
            
            return a;

        }
        public async Task<List<Assignment>> GetAllGroupAssignmentsAsync(int group_id, AssignmentFilterDto? filter = null,SortDto? sort = null, int user_id = 0)
        {
            var assingments_query = _context.Assignments.Where(a=>a.TaskGroupId==group_id)
            .Include(a=>a.Users).ThenInclude(u=>u.Role)
            .Include(a=>a.TaskGroup)
            .Include(a=>a.User).ThenInclude(u=>u.Role)
            .Include(a=>a.Priority)
            .Include(a=>a.DependentOnAssignments)
            .Include(a=>a.State).OrderByDescending(a=>a.LastTimeChanged)
            .AsQueryable();

            if (user_id != 0)
            {
                assingments_query = assingments_query.Where(a => a.Users.Any(b => b.Id == user_id));
            }

            return await FilterAssignments(assingments_query,filter,sort);
        }

        public async Task<List<Assignment>> GetAllUserAssignmentsAsync(int userId, AssignmentFilterDto? filter = null,SortDto? sort = null, List<int>? projects = null)
        {
            var pom = _context.Assignments.Include
            (a=>a.Users)
            .Include(a=>a.TaskGroup)
            .Include(a=>a.User)
            .Include(a=>a.Priority)
            .Include(a=>a.State).OrderByDescending(a=>a.LastTimeChanged).AsQueryable();

            if (projects != null && projects.Count > 0)
            {
                pom = pom.Where(a => projects.Contains(a.TaskGroup.ProjectId));
            }
            var query = pom.Where(t=>t.Users.Any(u=>u.Id==userId));

            return await FilterAssignments(query,filter,sort);
        }

        public async Task<Assignment?> GetAssignmentByidAsync(int id)
        {
            return await _context.Assignments
            .Include(a=>a.Users)
            .Include(a=>a.TaskGroup)
            .Include(a=>a.User)
            .Include(a=>a.Priority)
            .Include(a=>a.State)
            .Include(a=>a.DependentOnAssignments)
            .FirstOrDefaultAsync(a=>a.Id==id);
        }

        public async Task<Assignment?> UpdateAssignmentAsync(UpdateAssignmentDto a, int id, List<User> users, List<Assignment> dependentOn)
        {
            var assignment = await GetAssignmentByidAsync(id);
            if(assignment==null)
                return null;
            assignment.DependentOnAssignments = dependentOn;
            assignment.Title = a.Title;
            assignment.Users = users;
            assignment.TaskGroupId = a.TaskGroupId;
            assignment.Start = a.Start;
            assignment.End = a.End;
            assignment.Type = a.Type;
            assignment.LastTimeChanged = DateTime.Now;
            assignment.PriorityId = a.PriorityId;
            assignment.StateId = a.StateId;
            assignment.Description = a.Description;
            assignment.Percentage = a.Percentage;

            await _context.SaveChangesAsync();

            return assignment;
        }

        public async Task<List<Assignment>> FilterAssignments(IQueryable<Assignment> assignments, AssignmentFilterDto? dto,SortDto? sort = null)
        {
            if(dto!=null)
            {
                if(dto.StateFilter.Count > 0)
                    assignments = assignments.Where(p=>dto.StateFilter.Contains(p.StateId));
                if(dto.PriorityFilter.Count > 0)
                    assignments = assignments.Where(p=>dto.PriorityFilter.Contains(p.PriorityId));
                
                if(dto.SearchTitle!=string.Empty)
                    assignments = assignments.Where(p=>p.Title.ToLower().Contains(dto.SearchTitle.ToLower()));
                //datumi
                if(dto.StartFrom!=null && dto.StartTo!=null)
                {
                    assignments = assignments.Where(p=>p.Start >=dto.StartFrom && p.Start <=dto.StartTo);
                }
                if(dto.EndFrom!=null && dto.EndTo!=null)
                {
                    assignments = assignments.Where(p => p.End >= dto.EndFrom && p.End <= dto.EndTo);
                }

                if(dto.PercentageFilterTo >=0 && dto.PercentageFilterFrom <= dto.PercentageFilterTo)
                {
                    assignments = assignments.Where(p=>p.Percentage <= dto.PercentageFilterTo && p.Percentage >=dto.PercentageFilterFrom);
                }
                if (dto.PageNumber > 0 && dto.PageSize > 0)
                {
                    int skip = (dto.PageNumber - 1) * dto.PageSize;
                    assignments = assignments.Skip(skip).Take(dto.PageSize);
                }
            }
            if(sort!=null)
            {
                if(sort.PropertyName.ToLower()=="title")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.Title);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.Title);

                }
                else if(sort.PropertyName.ToLower()=="state")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.State.Name);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.State.Name);
                }
                else if(sort.PropertyName.ToLower()=="priority")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.Priority.Level);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.Priority.Level);
                }
                else if(sort.PropertyName.ToLower()=="start date")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.Start);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.Start);
                }
                else if(sort.PropertyName.ToLower()=="end date")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.End);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.End);
                }
                else if(sort.PropertyName.ToLower()=="progress")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.Percentage);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.Percentage);
                }
                else if(sort.SortFlag==1)
                   assignments =assignments.OrderBy(p=>p.LastTimeChanged);
                else
                   assignments =assignments.OrderByDescending(p=>p.LastTimeChanged);
            }
            return await assignments.ToListAsync();
        }

        public async Task<Assignment?> DeleteAssignmentByIdAsync(int asign_id)
        {
            var asignment = await GetAssignmentByidAsync(asign_id);
            if(asignment==null)
                return null;
            _context.Assignments.Remove(asignment);
            await _context.SaveChangesAsync();

            return asignment;
            
        }

        public async Task<List<Assignment>> getDependentAssignments(int asign_id)
        {
            var asignment = await _context.Assignments.Include(a=>a.DependentOnAssignments).ThenInclude(a=>a.TaskGroup).FirstOrDefaultAsync(a=>a.Id==asign_id);
            if(asignment==null)
            {
                return new List<Assignment>();
            }


            return asignment.DependentOnAssignments.ToList();
            
        }
    }
}