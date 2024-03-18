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
        Task<List<Assignment>> GetAllProjectAssignmentsAsync(int project_id);
        Task<Assignment?> UpdateAssignmentAsync(UpdateAssignmentDto a,int id, Period? per);

        Task<List<User>> GetAssignmentUsersAsync(int task_id);

        Task<Assignment> CreateAssignmentAsync(Assignment a, Project project, Assignment? dependent,Priority prio,List<User> users, Period per);

    }
}