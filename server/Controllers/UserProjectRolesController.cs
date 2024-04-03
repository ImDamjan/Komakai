using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Repositories;

namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProjectRolesController : ControllerBase
    {
        private readonly IUserProjectRepository _userProjectRepository;

        public UserProjectRolesController(IUserProjectRepository userProjectRepository)
        {
            _userProjectRepository = userProjectRepository;
    }
}
