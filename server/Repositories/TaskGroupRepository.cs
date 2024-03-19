using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public Task<List<TaskGroup>> GetAllProjectTaskGroupsAsync(Project project)
        {
            throw new NotImplementedException();
        }

        public Task<TaskGroup> GetTaskGroupByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<TaskGroup> UpdateTaskGroupAsync(TaskGroupDto dto)
        {
            throw new NotImplementedException();
        }
    }
}