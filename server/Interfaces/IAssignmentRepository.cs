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
        Task<Assignment?> GetAssignmentByid(int id);
        Task<List<Assignment>> GetAllUserAssignments(int userId);
        Task<List<Assignment>> GetAllProjectAssignments(int project_id);
        Task<Assignment?> UpdateAssignment(UpdateAssignmentDto a,int id);
        Task<List<Assignment>> GetAssignmentsByTeamId(int teamId);

        Task<Assignment> CreateAssignment(Assignment a, Project project, Assignment dependent,Priority prio,List<User> users);

    }
}