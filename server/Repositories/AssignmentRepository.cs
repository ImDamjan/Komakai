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

        public async Task<Assignment> CreateAssignmentAsync(Assignment a, Project project, Assignment? dependent, Priority prio, List<User> users)
        {

            a.Users = users;
            a.Project = project;
            a.Priority = prio;
            a.DependentNavigation = dependent;
            a.StateId=1;
            a.Start = DateTime.Now;

            await _context.Assignments.AddAsync(a);
            await _context.SaveChangesAsync();
            
            return a;

        }

        public async Task<List<Assignment>> GetAllProjectAssignmentsAsync(int project_id)
        {
            return await _context.Assignments.Where(a=>a.ProjectId==project_id).Include(a=>a.Users).ToListAsync();
        }

        public async Task<List<Assignment>> GetAllUserAssignmentsAsync(int userId)
        {
            var pom = await _context.Assignments.Include(a=>a.Users.Where(u=>u.Id==userId)).ToListAsync();

            return pom.Where(t=>t.Users.Count > 0).ToList();
        }

        public async Task<Assignment?> GetAssignmentByidAsync(int id)
        {
            return await _context.Assignments.FirstOrDefaultAsync(a=>a.Id==id);
        }

        public async Task<List<User>> GetAssignmentUsersAsync(int task_id)
        {
            var task = await _context.Assignments.Include(a=>a.Users).FirstOrDefaultAsync(a=>a.Id==task_id);
            if(task==null)
                return new List<User>();

            return task.Users.ToList();
        }

        public async Task<Assignment?> UpdateAssignmentAsync(UpdateAssignmentDto a, int id)
        {
            var assignment = await GetAssignmentByidAsync(id);
            if(assignment==null)
                return null;

            if(a.Dependent > 0)
                assignment.Dependent = a.Dependent;
            else
                assignment.Dependent = null;
            assignment.Title = a.Title;
            assignment.Type = a.Type;
            assignment.PriorityId = a.PriorityId;
            assignment.StateId = a.StateId;
            assignment.Description = a.Description;
            assignment.End = a.End;
            assignment.Percentage = a.Percentage;

            await _context.SaveChangesAsync();

            return assignment;
        }
    }
}