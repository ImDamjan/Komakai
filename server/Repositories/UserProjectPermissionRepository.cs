using server.Data;

namespace server.Repositories
{
    public class UserProjectPermissionRepository
    {
        private readonly ProjectManagmentDbContext _context;

        public UserProjectPermissionRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
    }
}
