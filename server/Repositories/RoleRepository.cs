using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class RoleRepository : IRoleRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public RoleRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public async Task<List<Role>> GetAllRoles()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role?> GetRoleById(int role_id)
        {
            return await _context.Roles.FirstOrDefaultAsync(r=> r.Id==role_id);
        }
    }
}