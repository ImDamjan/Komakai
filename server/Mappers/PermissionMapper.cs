using server.DTOs.Permissions;
using server.Models;

namespace server.Mappers
{
    public static class PermissionMapper
    {
        public static PermissionDto ToPermissionDto(this Permission permission)
        {
            return new PermissionDto
            {
                Id = permission.Id,
                Name = permission.Name
            };
        }
    }
}
