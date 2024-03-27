using server.Models;

namespace server.Interfaces
{
    public interface IPermissionRepository
    {
        Task<Permission?> GetPermissionByIdAsync(int permissionId);
        Task<List<Permission>> GetAllPermissionsAsync();
        Task AddPermissionAsync(Permission permission);
        Task UpdatePermissionAsync(Permission permission);
        Task DeletePermissionAsync(int permissionId);
        Task SaveChangesAsync();
    }
}
