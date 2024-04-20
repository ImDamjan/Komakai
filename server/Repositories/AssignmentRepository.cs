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

        public async Task<List<Assignment>> GetAllUserAssignmentsAsync(int userId, AssignmentFilterDto? filter = null,SortDto? sort = null, int project_id = 0)
        {
            var pom = _context.Assignments.Include
            (a=>a.Users)
            .Include(a=>a.TaskGroup)
            .Include(a=>a.User)
            .Include(a=>a.Priority)
            .Include(a=>a.State).OrderByDescending(a=>a.LastTimeChanged).AsQueryable();

            if (project_id != 0)
            {
                pom = pom.Where(a => a.TaskGroup.ProjectId == project_id);
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
                if(dto.PageNumber!=0 && dto.PageSize!=0)
                {
                    assignments = assignments.Skip((dto.PageNumber - 1) * dto.PageSize).Take(dto.PageSize);
                }
                if(dto.StateFilter > 0 && dto.StateFilter < 7)
                    assignments =assignments.Where(p=>p.StateId==dto.StateFilter);
                if(dto.PriorityFilter > 0 && dto.PriorityFilter < 5)
                    assignments =assignments.Where(p=>p.PriorityId==dto.PriorityFilter);
                
                if(dto.SearchTitle!=string.Empty)
                    assignments =assignments.Where(p=>p.Title.ToLower().Contains(dto.SearchTitle.ToLower()));
                //datumi
                if(dto.Start!=null)
                {
                    if(dto.DateStartFlag==-1)
                        assignments =assignments.Where(p=>p.Start < dto.Start);
                    else if(dto.DateStartFlag==1)
                        assignments =assignments.Where(p=>p.Start >= dto.Start);
                }
                if(dto.End!=null)
                {
                    if(dto.DateEndFlag==-1)
                        assignments =assignments.Where(p=>p.End < dto.End);
                    else if(dto.DateEndFlag==1)
                        assignments =assignments.Where(p=>p.End >= dto.End);
                }
                if(dto.PercentageFilter!=null)
                {
                    if(dto.PercentageFlag==-1)
                        assignments =assignments.Where(p=>p.Percentage < dto.PercentageFilter);
                    else if(dto.PercentageFlag==1)
                        assignments =assignments.Where(p=>p.Percentage >= dto.PercentageFilter);
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
                else if(sort.PropertyName.ToLower()=="start")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.Start);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.Start);
                }
                else if(sort.PropertyName.ToLower()=="end")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.End);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.End);
                }
                else if(sort.PropertyName.ToLower()=="percentage")
                {
                    if(sort.SortFlag==1)
                    {
                        assignments = assignments.OrderBy(a=>a.Percentage);
                    }
                    else
                        assignments = assignments.OrderByDescending(a=>a.Percentage);
                }
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