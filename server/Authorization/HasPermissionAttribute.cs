using Microsoft.AspNetCore.Authorization;

namespace server.Authorization
{
    public class HasPermissionAttribute : AuthorizeAttribute
    {
        public HasPermissionAttribute(Permisija permission) 
            :base(policy: permission.ToString())
        {

        }
    }
}
