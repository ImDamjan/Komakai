using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
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

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            var isAuthorized = await _authorizationService.AuthorizeAsync(_httpContextAccessor.HttpContext.User, null, _permission.ToString());
            if (!isAuthorized.Succeeded)
            {
                context.Result = new ForbidResult();
            }
        }
    }
}
