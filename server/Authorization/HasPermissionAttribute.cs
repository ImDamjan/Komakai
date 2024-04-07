using Microsoft.AspNetCore.Authorization;

namespace server.Authorization
{
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        public HasPermissionAttribute(string permission) 
            :base(policy: permission)
        {

        }
    }
}
