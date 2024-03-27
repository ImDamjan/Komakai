using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.DTOs.Assignment;
using server.Models;

namespace server.Interfaces
{
    public interface IAssignmentRepository
    {
        Task<Assignment?> GetAssignmentByidAsync(int id);
        Task<List<Assignment>> GetAllUserAssignmentsAsync(int userId);
        Task<List<Assignment>> GetAllGroupAssignmentsAsync(int group_id);
        Task<Assignment?> UpdateAssignmentAsync(UpdateAssignmentDto a,int id);
        Task<List<Assignment>> GetAllFilteredAssignmentsByProjectGroupsAsync(List<TaskGroup> groups, AssignmentFilterDto dto);
        Task<List<Assignment>> GetAllDependentOnOfAssignmentAsync(int asign_id);
        Task<List<User>> GetAssignmentUsersAsync(int task_id);

        Task<Assignment> CreateAssignmentAsync(Assignment a);

    }
}