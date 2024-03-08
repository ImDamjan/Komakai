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
    public class UserRepository : IUserRepository
    {
        private readonly ProjectManagmentDbContext _context;
        public UserRepository(ProjectManagmentDbContext context)
        {
            _context = context;
        }
        public async Task<List<Project>> GetAllUserProjectsAsync(int id)
        {
            return await _context.ProjectUsers.Where(u=> u.UserId==id).Select(p=> p.Project).ToListAsync();
        }
    }
}