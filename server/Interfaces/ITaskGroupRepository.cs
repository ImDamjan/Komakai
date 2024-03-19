using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Assignment;
using server.Models;

namespace server.Interfaces
{
    public interface ITaskGroupRepository
    {
        Task<TaskGroup> CreateAsync(TaskGroup group);
        Task<List<TaskGroup>> GetAllProjectTaskGroupsAsync(Project project);
        Task<TaskGroup?> GetTaskGroupByIdAsync(int id);
        Task<TaskGroup> UpdateTaskGroupAsync(TaskGroup group);
    }
}