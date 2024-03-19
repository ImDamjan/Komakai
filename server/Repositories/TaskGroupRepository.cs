using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Assignment;
using server.Models;

namespace server.Repositories
{
    public class TaskGroupRepository : ITaskGroupRepository
    {
        public Task<TaskGroup> CreateAsync(TaskGroup group)
        {
            throw new NotImplementedException();
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