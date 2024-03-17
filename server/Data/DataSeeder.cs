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
                var users = new List<User>
                {
                    new User
                    {
                        Id = 1,
                        Name = "John",
                        Lastname = "Doe",
                        Username = "johndoe",
                        Password = "password123",
                        Email = "john.doe@example.com",
                        JobTitle = "Project Manager",
                        Organisation = "Organization A",
                        Department = "Department 1",
                        RoleId = 1 // Project Manager
                    },
                    new User
                    {
                        Id = 2,
                        Name = "Jane",
                        Lastname = "Smith",
                        Username = "janesmith",
                        Password = "password456",
                        Email = "jane.smith@example.com",
                        JobTitle = "Project Manager",
                        Organisation = "Organization B",
                        Department = "Department 2",
                        RoleId = 1 // Project Manager
                    },
                    new User
                    {
                        Id = 3,
                        Name = "Alex",
                        Lastname = "Johnson",
                        Username = "alexjohnson",
                        Password = "password789",
                        Email = "alex.johnson@example.com",
                        JobTitle = "Developer",
                        Organisation = "Organization A",
                        Department = "Department 1",
                        RoleId = 2 // Developer
                    },
                    new User
                    {
                        Id = 4,
                        Name = "Emily",
                        Lastname = "Brown",
                        Username = "emilybrown",
                        Password = "password101",
                        Email = "emily.brown@example.com",
                        JobTitle = "Developer",
                        Organisation = "Organization B",
                        Department = "Department 2",
                        RoleId = 2 // Developer
                    },
                    new User
                    {
                        Id = 5,
                        Name = "Michael",
                        Lastname = "Wilson",
                        Username = "michaelwilson",
                        Password = "password202",
                        Email = "michael.wilson@example.com",
                        JobTitle = "Developer",
                        Organisation = "Organization A",
                        Department = "Department 1",
                        RoleId = 2 // Developer
                    },
                    new User
                    {
                        Id = 6,
                        Name = "Sarah",
                        Lastname = "Martinez",
                        Username = "sarahmartinez",
                        Password = "password303",
                        Email = "sarah.martinez@example.com",
                        JobTitle = "Developer",
                        Organisation = "Organization B",
                        Department = "Department 2",
                        RoleId = 2 // Developer
                    },
                    new User
                    {
                        Id = 7,
                        Name = "Jessica",
                        Lastname = "Lee",
                        Username = "jessicalee",
                        Password = "password404",
                        Email = "jessica.lee@example.com",
                        JobTitle = "User",
                        Organisation = "Organization A",
                        Department = "Department 1",
                        RoleId = 3 // User
                    },
                    new User
                    {
                        Id = 8,
                        Name = "William",
                        Lastname = "Taylor",
                        Username = "williamtaylor",
                        Password = "password505",
                        Email = "william.taylor@example.com",
                        JobTitle = "User",
                        Organisation = "Organization B",
                        Department = "Department 2",
                        RoleId = 3 // User
                    },
                    new User
                    {
                        Id = 9,
                        Name = "Olivia",
                        Lastname = "Anderson",
                        Username = "oliviaanderson",
                        Password = "password606",
                        Email = "olivia.anderson@example.com",
                        JobTitle = "User",
                        Organisation = "Organization A",
                        Department = "Department 1",
                        RoleId = 3 // User
                    },
                    new User
                    {
                        Id = 10,
                        Name = "Ethan",
                        Lastname = "Moore",
                        Username = "ethanmoore",
                        Password = "password707",
                        Email = "ethan.moore@example.com",
                        JobTitle = "Admin",
                        Organisation = "Organization B",
                        Department = "Department 2",
                        RoleId = 5 // Admin
                    }
                };

                _context.Users.AddRange(users);
                _context.SaveChanges();

                if(!_context.Teams.Any())
                {
                    var teams = new List<Team>{
                        new Team{
                            Id = 1,
                            Name = "Team 1",
                            Type = "Type 1"
                        },
                        new Team{
                            Id = 2,
                            Name = "Team 2",
                            Type = "Type 2"
                        },
                        new Team{
                            Id = 3,
                            Name = "Team 3",
                            Type = "Type 3"
                        },
                        new Team{
                            Id = 4,
                            Name = "Team 4",
                            Type = "Type 4"
                        },
                        new Team{
                            Id = 5,
                            Name = "Team 5",
                            Type = "Type 5"
                        }
                    };
                    _context.Teams.AddRange(teams);
                    _context.SaveChanges();

                    var team_users = new List<TeamUser>(){
                        new TeamUser{
                            TeamId = 1,
                            UserId = 1,
                            ProjectRoleId = 2
                        },
                        new TeamUser{
                            TeamId = 1,
                            UserId = 3,
                            ProjectRoleId = 2
                        },
                        new TeamUser{
                            TeamId = 2,
                            UserId = 2,
                            ProjectRoleId = 1
                        },
                        new TeamUser{
                            TeamId = 2,
                            UserId = 1,
                            ProjectRoleId = 2
                        },
                        new TeamUser{
                            TeamId = 3,
                            UserId = 2,
                            ProjectRoleId = 1
                        },
                        new TeamUser{
                            TeamId = 3,
                            UserId = 3,
                            ProjectRoleId = 2
                        },
                    };
                    _context.Teams.AddRange(teams);
                    _context.TeamUsers.AddRange(team_users);
                    _context.SaveChanges();

                    if(!_context.Projects.Any())
                    {
                        var projects = new List<Project>{
                            new Project{
                                Id = 1,
                                Title = "Projekat 1",
                                Start = DateTime.Now,
                                Description = "Projekat za nesto",
                                StateId = 3,
                                LastStateChangedTime = DateTime.Now,
                                EstimatedTime = DateTime.Now.AddDays(30),
                                Budget = 100000,
                                Spent = 5000,
                                Type = "Programming",
                                Percentage = 20,
                                TeamId = 1,
                                PriorityId = 2
                            },
                                new Project{
                                Id = 2,
                                Title = "Projekat 2",
                                Start = DateTime.Now,
                                Description = "Projekat za nesto",
                                StateId = 2,
                                LastStateChangedTime = DateTime.Now,
                                EstimatedTime = DateTime.Now.AddDays(30),
                                Budget = 100000,
                                Spent = 7000,
                                Type = "Programming",
                                Percentage = 8,
                                TeamId = 1,
                                PriorityId = 2
                            },
                                new Project{
                                Id = 3,
                                Title = "Projekat 3",
                                Start = DateTime.Now,
                                Description = "Projekat za nesto",
                                StateId = 2,
                                LastStateChangedTime = DateTime.Now,
                                EstimatedTime = DateTime.Now.AddDays(30),
                                Budget = 8000,
                                Spent = 5000,
                                Type = "Testing",
                                Percentage = 20,
                                TeamId = 2,
                                PriorityId = 2
                            },
                                new Project{
                                Id = 4,
                                Title = "Projekat 4",
                                Start = DateTime.Now,
                                Description = "Projekat za nesto",
                                StateId = 3,
                                LastStateChangedTime = DateTime.Now,
                                EstimatedTime = DateTime.Now.AddDays(30),
                                Budget = 7000,
                                Spent = 5000,
                                Type = "Mananging",
                                Percentage = 80,
                                TeamId = 3,
                                PriorityId = 2
                            },
                                new Project{
                                Id = 5,
                                Title = "Projekat 5",
                                Start = DateTime.Now,
                                Description = "Projekat za nesto",
                                StateId = 3,
                                LastStateChangedTime = DateTime.Now,
                                EstimatedTime = DateTime.Now.AddDays(30),
                                Budget = 7000,
                                Spent = 5000,
                                Type = "Mananging",
                                Percentage = 80,
                                TeamId = 2,
                                PriorityId = 2
                            }
                        };
                        _context.Projects.AddRange(projects);
                        _context.SaveChanges();
                        if(!_context.Assignments.Any())
                        {
                            var assignments = new List<Assignment>{
                                new Assignment{
                                    Id = 1,
                                    Title = "Task 1",
                                    Description = "Uradi register i login",
                                    Start = DateTime.Now,
                                    End = DateTime.MinValue,
                                    StateId = 4,
                                    Percentage = 20,
                                    Dependent = null,
                                    PriorityId = 3,
                                    Project = projects[0],
                                    Type = "autorizacija",
                                    Users = new List<User>{users[0], users[2]}
                                },
                                    new Assignment{
                                    Id = 2,
                                    Title = "Task 2",
                                    Description = "Uradi register",
                                    Start = DateTime.Now,
                                    End = DateTime.MinValue,
                                    StateId = 5,
                                    Percentage = 90,
                                    Dependent = 1,
                                    PriorityId = 2,
                                    Project = projects[0],
                                    Type = "autorizacija",
                                    Users = new List<User>{users[2]}
                                },
                                    new Assignment{
                                    Id = 3,
                                    Title = "Task 3",
                                    Description = "Uradi login",
                                    Start = DateTime.Now,
                                    End = DateTime.MinValue,
                                    StateId = 5,
                                    Percentage = 80,
                                    Dependent = 1,
                                    PriorityId = 2,
                                    Project = projects[0],
                                    Type = "autorizacija",
                                    Users = new List<User>{users[0]}
                                },
                                    new Assignment{
                                    Id = 4,
                                    Title = "Task 1",
                                    Description = "Testiraj login i register",
                                    Start = DateTime.Now,
                                    End = DateTime.MinValue,
                                    StateId = 4,
                                    Percentage = 20,
                                    Dependent = null,
                                    PriorityId = 3,
                                    Project = projects[2],
                                    Type = "autorizacija",
                                    Users = new List<User>{users[1], users[0]}
                                },
                                    new Assignment{
                                    Id = 5,
                                    Title = "Task 1",
                                    Description = "Testiraj login",
                                    Start = DateTime.Now,
                                    End = DateTime.MinValue,
                                    StateId = 4,
                                    Percentage = 20,
                                    Dependent = 4,
                                    PriorityId = 3,
                                    Project = projects[2],
                                    Type = "autorizacija",
                                    Users = new List<User>{users[1]}
                                },
                                    new Assignment{
                                    Id = 6,
                                    Title = "Task 1",
                                    Description = "Testirajregister",
                                    Start = DateTime.Now,
                                    End = DateTime.MinValue,
                                    StateId = 4,
                                    Percentage = 20,
                                    Dependent = 4,
                                    PriorityId = 3,
                                    Project = projects[2],
                                    Type = "autorizacija",
                                    Users = new List<User>{users[0]}
                                }
                            };
                            _context.Assignments.AddRange(assignments);
                            _context.SaveChanges();
                        }
                    }
                }
            }
        }
    }
}