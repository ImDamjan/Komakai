using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IRoleRepository
    {
        Task<Role?> GetRoleById(int role_id);
        Task<List<Role>> GetAllRoles();
    }
}