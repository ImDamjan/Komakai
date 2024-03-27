using server.Models;

namespace server.Interfaces
{
    public interface IPermissionRepository
    {
        Task<Permission?> GetPermissionByIdAsync(int permissionId);
        Task<List<Permission>> GetAllPermissionsAsync();
    }
}
