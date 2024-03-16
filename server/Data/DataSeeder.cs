using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Models;

namespace server.Data
{
    public class DataSeeder
    {
        private readonly ProjectManagmentDbContext _context;

        public DataSeeder(ProjectManagmentDbContext context)
        {
            _context =context;
        }

        public void Seed()
        {

            //prioriteti
            if(!_context.Priorities.Any())
            {
                var priorities = new List<Priority>{
                    new Priority{
                        Id = 1,
                        Level = 4,
                        Description = "At risk"
                    },
                    new Priority{
                        Id = 2,
                        Level = 3,
                        Description = "High"
                    },
                    new Priority{
                        Id = 3,
                        Level = 2,
                        Description = "Medium"
                    },
                    new Priority{
                        Id = 4,
                        Level = 1,
                        Description = "Low"
                    },
                };
                _context.Priorities.AddRange(priorities);
                _context.SaveChanges();
            }
        }
    }
}