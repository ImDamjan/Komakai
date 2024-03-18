using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Interfaces
{
    public interface IPeriodRepository
    {
        Task<List<Period>> GetPeriods();
        Task<Period?> GetPeriod(int period_id);
    }
}