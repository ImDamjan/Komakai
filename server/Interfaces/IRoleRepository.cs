using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IRoleRepository
    {
        Task<Role?> GetRoleByIdAsync(int role_id);
        Task<List<Role>> GetAllRolesAsync();
        Task SaveChangesAsync();
    }
}