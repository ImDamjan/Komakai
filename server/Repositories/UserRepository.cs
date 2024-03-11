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
        public async Task<List<Project>> GetAllUserProjectsAsync(int id)
        {
            return await _context.ProjectUsers.Where(u=> u.UserId==id).Select(p=> p.Project).ToListAsync();
        }

        public async Task<List<ProjectStatesDto>> GetAllUserProjectStates(int userId)
        {
            var projects = await _context.ProjectUsers.Where(u=> u.UserId==userId).Select(p=> p.Project).ToListAsync();

            List<ProjectStatesDto> lista = new List<ProjectStatesDto>();

            foreach (var state in _context.States)
            {
                ProjectStatesDto pom = new ProjectStatesDto();
                pom.count = 0;
                pom.StateName = state.Name;
                pom.StateId = state.Id;

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


            return lista;

        }
    }
}