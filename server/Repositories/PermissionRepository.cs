using server.Data;

namespace server.Repositories
{
    public class PermissionRepository : IPermissionRepository
    {
        private readonly ProjectManagmentDbContext _context;

        public PermissionRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
    }
}
