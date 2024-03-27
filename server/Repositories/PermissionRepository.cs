using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Models;

namespace server.Repositories
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly ProjectManagmentDbContext _context;

        public PermissionRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public async Task<Permission?> GetPermissionByIdAsync(int permissionId)
        {
            return await _context.Permissions.FindAsync(permissionId);
        }
        public async Task<List<Permission>> GetAllPermissionsAsync()
        {
            return await _context.Permissions.ToListAsync();
        }
        public async Task AddPermissionAsync(Permission permission)
        {
            _context.Permissions.Add(permission);
            await SaveChangesAsync();
        }
        public async Task UpdatePermissionAsync(Permission permission)
        {
            _context.Entry(permission).State = EntityState.Modified;
            await SaveChangesAsync();
        }
        public async Task DeletePermissionAsync(int permissionId)
        {
            var permission = await _context.Permissions.FindAsync(permissionId);
            if (permission != null)
            {
                _context.Permissions.Remove(permission);
                await SaveChangesAsync();
            }
        }
        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
