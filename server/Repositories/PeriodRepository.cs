using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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

        public Task<List<Period>> GetPeriods()
        {
            throw new NotImplementedException();
        }
    }
}