using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.DTOs.Projects;
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

        public async Task AddUserAsync(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();
        }

        public async Task<List<User>> GetAllUsersAsync()
        {
            return await _context.Users.ToListAsync();
        }

        public async Task<User> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }
  

        public async Task<User> GetUserByUsernameAsync(string username)
        {
            return await _context.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<List<User>> GetUsersByRoleAsync(string roleName)
        {
            return await _context.Users
                .Where(u=> u.Role!= null && u.Role.Name==roleName)
                .ToListAsync();
        }

        public async Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId,string period)
        {
            DateTime past = DateTime.MinValue;
            if(period.ToLower()=="month")
                past = DateTime.Now.AddDays(-30);
            else if(period.ToLower()=="week")
                past = DateTime.Now.AddDays(-7);

            var projects = await _context.ProjectUsers.Where(u=> u.UserId==userId).Select(p=> p.Project).Where(p=>p.LastStateChange>=past).ToListAsync();

            List<ProjectStatesDto> lista = new List<ProjectStatesDto>();

            foreach (var state in _context.States)
            {
                ProjectStatesDto pom = new ProjectStatesDto();
                pom.count = 0;
                pom.StateName = state.Name;
                pom.StateId = state.Id;
                pom.Percentage = 0;

                lista.Add(pom);
            }

            foreach (var project in projects)
            {
                foreach(var item in lista)
                {
                    if(item.StateId==project.StateId)
                    {
                        item.count++;
                        break;
                    }
                }
            }

            //racunanje procenata po stateovima
            foreach (var item in lista)
            {
                if(item.count>0)
                    item.Percentage = projects.Count/(item.count*1.0f)*100;
                    
            }


            return lista;

        }
    }
}