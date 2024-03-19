using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Assignment;
using server.Models;

namespace server.Repositories
{
    public class TaskGroupRepository : ITaskGroupRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public TaskGroupRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public async Task<TaskGroup> CreateAsync(TaskGroup group)
        {
            await _context.TaskGroups.AddAsync(group);
            await _context.SaveChangesAsync();
            
            return group;
        }

        public async Task<List<TaskGroup>> GetAllProjectTaskGroupsAsync(Project project)
        {
            return await _context.TaskGroups.Where(tg=>tg.ProjectId==project.Id).ToListAsync();
        }

        public async Task<TaskGroup?> GetTaskGroupByIdAsync(int id)
        {
            var t = await _context.TaskGroups.FirstOrDefaultAsync(tg=> tg.Id==id);
            return t;
        }

        public async Task<TaskGroup> UpdateTaskGroupAsync(TaskGroup group)
        {
            await _context.SaveChangesAsync();
            return group;
        }
    }
}