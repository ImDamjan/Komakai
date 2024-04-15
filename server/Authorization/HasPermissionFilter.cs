using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;

namespace server.Authorization
{
    public class HasPermissionFilter : IAsyncAuthorizationFilter
    {
        private readonly Permisija _permission;
        private readonly IAuthorizationService _authorizationService;
        private readonly IHttpContextAccessor _httpContextAccessor;

        public HasPermissionFilter(Permisija permission, IAuthorizationService authorizationService, IHttpContextAccessor httpContextAccessor)
        {
            _permission = permission;
            _authorizationService = authorizationService;
            _httpContextAccessor = httpContextAccessor;
        }

        public Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            throw new NotImplementedException();
        }
    }
}
