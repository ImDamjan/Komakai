using server.Models;

namespace server.Interfaces
{
    public interface IUserProjectPermissionRepository
    {
        Task AddUserProjectPermission(UserProjectPermission userProjectPermission);
        Task RemoveUserProjectPermission(UserProjectPermission userProjectPermission);
        Task<UserProjectPermission> GetUserProjectPermissionById(int id);
    }
}
