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

    }
}
