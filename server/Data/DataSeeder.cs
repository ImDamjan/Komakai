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

            if(!_context.States.Any())
            {
                var states = new List<State>{
                    new State{
                        Id = 1,
                        Name = "Not started"
                    },
                    new State{
                        Id = 2,
                        Name = "Ready"
                    },
                    new State{
                        Id = 3,
                        Name = "In Progress"
                    },
                    new State{
                        Id = 4,
                        Name = "Blocked"
                    },
                    new State{
                        Id = 5,
                        Name = "Done"
                    },
                    new State{
                        Id = 6,
                        Name = "Cancelled"
                    }
                };
                _context.States.AddRange(states);
                _context.SaveChanges();
            }
            if(!_context.Roles.Any())
            {
                var platformRoles = new List<Role>{
                    new Role{
                        Id = 1,
                        Name = "Project Manager"
                    },
                    new Role{
                        Id = 2,
                        Name = "Developer"
                    },
                    new Role{
                        Id = 3,
                        Name = "User"
                    },
                    new Role{
                        Id = 4,
                        Name = "Guest"
                    },
                    new Role{
                        Id = 5,
                        Name = "Admin"
                    }

                };
                _context.Roles.AddRange(platformRoles);
                _context.SaveChanges();
            }
            if(!_context.Users.Any())
            {
                var users = new List<User>{
                    new User{
                        Id = 1,
                        Name = "Stefan",
                        Lastname = "Peric",
                        Username = "MrSmith",
                        Password = BCrypt.Net.BCrypt.HashPassword("gospodinUBelom"),
                        Email = "stefan.peric12@gmail.com",
                        JobTitle = "Junior Developer",
                        Organisation = "Organizacija 1",
                        Department = "Odeljenje 1",
                        RoleId = 2
                    },
                        new User{
                        Id = 2,
                        Name = "Marko",
                        Lastname = "Simic",
                        Username = "Kira",
                        Password = BCrypt.Net.BCrypt.HashPassword("gospodinUBelom"),
                        Email = "marko.simic12@gmail.com",
                        JobTitle = "Developer",
                        Organisation = "Organizacija 1",
                        Department = "Odeljenje 1",
                        RoleId = 1
                    },
                    new User{
                        Id = 3,
                        Name = "Gordon",
                        Lastname = "Majls",
                        Username = "AnimeNerd",
                        Password = BCrypt.Net.BCrypt.HashPassword("gospodinUBelom"),
                        Email = "gordon.m@gmail.com",
                        JobTitle = "Developer",
                        Organisation = "Organizacija 1",
                        Department = "Odeljenje 1",
                        RoleId = 2
                    }
                };
            }
        }
    }
}