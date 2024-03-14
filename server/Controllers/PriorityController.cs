using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;
using server.Mappers;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PriorityController : ControllerBase
    {
        private readonly IPriorityRepository _repo;
        public PriorityController(IPriorityRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("getPriorities")]
        public async Task<IActionResult> GetAllPriorities()
        {
            var prios = await _repo.GetPriorities();
            
            var dtos = prios.Select(s=>s.toPrioDto());

            return Ok(dtos);
        }
    }
}