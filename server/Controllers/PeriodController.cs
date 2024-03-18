using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using server.Interfaces;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PeriodController : ControllerBase
    {
        private readonly IPeriodRepository _repo;
        public PeriodController(IPeriodRepository repo)
        {
            _repo = repo;
        }

        [HttpGet("getAllPeriods")]
        public async Task<IActionResult> GetAllPeriods()
        {
            return Ok(await _repo.GetPeriods());
        }
    }
}