using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Interfaces;
using server.Models;

namespace server.Repositories
{
    public class PeriodRepository : IPeriodRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public PeriodRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public Task<Period?> GetPeriod(int period_id)
        {
            throw new NotImplementedException();
        }

        public async Task<List<Period>> GetPeriods()
        {
            return await _context.Periods.ToListAsync();
        }
    }
}