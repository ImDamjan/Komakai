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
        public async Task<List<Role>> GetAllRolesAsync()
        {
            return await _context.Roles.ToListAsync();
        }

        public async Task<Role?> GetRoleByIdAsync(int role_id)
        {
            return await _context.Roles
                .Include(r=>r.RolePermissions)
                    .ThenInclude(rp=>rp.Permission)
                .FirstOrDefaultAsync(r=> r.Id==role_id);
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}