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
            var periods = await _repo.GetPeriods();
            var dtos = periods.Select(p=>p.toPeriodDto());

            return Ok(dtos);
        }

        [HttpGet("getPeriodById/{period_id}")]
        public async Task<IActionResult> GetAllPeriods([FromRoute] int period_id)
        {
            var period = await _repo.GetPeriod(period_id);
            if(period==null)
                return NotFound("Period with that id does not exist");
            
            return Ok(period.toPeriodDto());
        }
    }
}