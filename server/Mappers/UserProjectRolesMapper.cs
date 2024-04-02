using server.DTOs.Permissions;
using server.Models;

namespace server.Mappers
{
    public class UserProjectRolesMapper
    {
        public static UserProjectRolesDto MapToDto(UserProjectRoles upr)
        {
            return new UserProjectRolesDto
            {
                Id = upr.Id,
                UserId = upr.UserId,
                ProjectId = upr.ProjectId,
                RoleId = upr.RoleId,
            };
        }
    }
}
