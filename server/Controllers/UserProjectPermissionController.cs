using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProjectPermissionController : ControllerBase
    {
        private readonly IUserProjectPermissionRepository _userProjectPermissionRepo;

        public UserProjectPermissionController(IUserProjectPermissionRepository userProjectPermissionRepo)
        {
            _userProjectPermissionRepo = userProjectPermissionRepo;
        }
    }
}
