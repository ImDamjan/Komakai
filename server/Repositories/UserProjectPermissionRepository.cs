using server.Data;
using server.Models;

namespace server.Repositories
{
    public class UserProjectPermissionRepository : IUserProjectPermissionRepository
    {
        private readonly ProjectManagmentDbContext _context;

        public UserProjectPermissionRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public async Task AddUserProjectPermission(UserProjectPermission userProjectPermission)
        {
            _context.UserProjectPermissions.Add(userProjectPermission);
            await _context.SaveChangesAsync();
        }
    }
}
