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

        public async Task<Assignment> CreateAssignment(Assignment a, Project project, Assignment dependent, Priority prio, List<User> users)
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

        public async Task<List<Assignment>> GetAllProjectAssignments(int project_id)
        {
            return await _context.Assignments.Where(a=>a.ProjectId==project_id).Include(a=>a.Users).ToListAsync();
        }

        public async Task<List<Assignment>> GetAllUserAssignments(int userId)
        {
            var pom = await _context.Assignments.Include(a=>a.Users.Where(u=>u.Id==userId)).ToListAsync();

            return pom.Where(t=>t.Users.Count > 0).ToList();
        }

        public Task<Assignment?> GetAssignmentByid(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<Assignment>> GetAssignmentsByTeamId(int teamId)
        {
            throw new NotImplementedException();
        }

        public Task<Assignment?> UpdateAssignment(UpdateAssignmentDto a, int id)
        {
            throw new NotImplementedException();
        }
    }
}