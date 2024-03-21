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

            await _context.Assignments.AddAsync(a);
            await _context.SaveChangesAsync();
            
            return a;

        }

        public async Task<List<Assignment>> GetAllDependentOnOfAssignmentAsync(int asign_id)
        {
            var asgn = await _context.Assignments.Include(a=>a.DependentOnAssignments).FirstOrDefaultAsync(a=>a.Id==asign_id);
            if(asgn==null)
                return new List<Assignment>();

            return asgn.DependentOnAssignments.ToList();
        }

        public async Task<List<Assignment>> GetAllGroupAssignmentsAsync(int group_id)
        {
            return await _context.Assignments.Where(a=>a.TaskGroupId==group_id).Include(a=>a.Users).ToListAsync();
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
            assignment.Title = a.Title;
            assignment.TaskGroupId = a.TaskGroupId;
            assignment.Start = a.Start;
            assignment.End = a.End;
            assignment.Type = a.Type;
            assignment.PriorityId = a.PriorityId;
            assignment.StateId = a.StateId;
            assignment.Description = a.Description;
            assignment.Percentage = a.Percentage;

            await _context.SaveChangesAsync();

            return assignment;
        }
    }
}