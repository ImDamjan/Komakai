using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace server.Authorization
{
    public class HasPermissionAttribute : TypeFilterAttribute
    {
        public HasPermissionAttribute(Permisija permission) 
            :base(typeof(HasPermissionFilter)
        {
            Arguments = new object[] { permission };
        }

    }
}
