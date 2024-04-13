using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
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
        public async Task<List<Assignment>> GetAllGroupAssignmentsAsync(int group_id, AssignmentFilterDto? filter = null)
        {
            var assingments_query = _context.Assignments.Where(a=>a.TaskGroupId==group_id)
            .Include(a=>a.Users).ThenInclude(u=>u.Role)
            .Include(a=>a.TaskGroup)
            .Include(a=>a.User).ThenInclude(u=>u.Role)
            .Include(a=>a.Priority)
            .Include(a=>a.DependentOnAssignments)
            .Include(a=>a.State).OrderByDescending(a=>a.LastTimeChanged)
            .AsQueryable();

            return await FilterAssignments(assingments_query,filter);
        }

        public async Task<List<Assignment>> GetAllUserAssignmentsAsync(int userId, AssignmentFilterDto? filter = null)
        {
            var pom = _context.Assignments.Include
            (a=>a.Users)
            .Include(a=>a.TaskGroup)
            .Include(a=>a.User)
            .Include(a=>a.Priority)
            .Include(a=>a.State).OrderByDescending(a=>a.LastTimeChanged).AsQueryable();

            var query = pom.Where(t=>t.Users.Any(u=>u.Id==userId));

            return await FilterAssignments(query,filter);
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

        public async Task<List<Assignment>> FilterAssignments(IQueryable<Assignment> assignments, AssignmentFilterDto? dto)
        {
            if(dto!=null)
            {
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