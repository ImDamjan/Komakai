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
                        Password = BCrypt.Net.BCrypt.HashPassword("password123"),
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
                        Password = BCrypt.Net.BCrypt.HashPassword("password456"),
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
                        Password = BCrypt.Net.BCrypt.HashPassword("password789"),
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
                        Password = BCrypt.Net.BCrypt.HashPassword("password101"),
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
                        Password = BCrypt.Net.BCrypt.HashPassword("password202"),
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
                        Password = BCrypt.Net.BCrypt.HashPassword("password303"),
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
                        Password = BCrypt.Net.BCrypt.HashPassword("password404"),
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
                        Password = BCrypt.Net.BCrypt.HashPassword("password505"),
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
                        Password = BCrypt.Net.BCrypt.HashPassword("password606"),
                        Email = "olivia.anderson@example.com",
                        JobTitle = "User",
                        Organisation = "Organization A",
                        Department = "Department 1",
                        RoleId = 4 // Guest
                    },
                    new User
                    {
                        Id = 10,
                        Name = "Ethan",
                        Lastname = "Moore",
                        Username = "ethanmoore",
                        Password = BCrypt.Net.BCrypt.HashPassword("password707"),
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
                    //Teams
                    var teams = new List<Team>
                    {
                        new Team { Id = 1, Name = "Team A", Type = "Type 1" },
                        new Team { Id = 2, Name = "Team B", Type = "Type 2" },
                        new Team { Id = 3, Name = "Team C", Type = "Type 1" },
                        new Team { Id = 4, Name = "Team D", Type = "Type 2" },
                        new Team { Id = 5, Name = "Team E", Type = "Type 1" }
                    };

                    _context.Teams.AddRange(teams);
                    _context.SaveChanges();

                    // Assign users to teams
                    var teamUsers = new List<TeamUser>
                    {
                        // Team A
                        new TeamUser { TeamId = 1, UserId = 1, ProjectRoleId = 1 }, // John Doe as Project Manager
                        new TeamUser { TeamId = 1, UserId = 3, ProjectRoleId = 2 }, // Alex Johnson as Developer
                        new TeamUser { TeamId = 1, UserId = 4, ProjectRoleId = 2 }, // Emily Brown as Developer
                        new TeamUser { TeamId = 1, UserId = 7, ProjectRoleId = 3 }, // Jessica Lee as User

                        // Team B
                        new TeamUser { TeamId = 2, UserId = 2, ProjectRoleId = 1 }, // Jane Smith as Project Manager
                        new TeamUser { TeamId = 2, UserId = 5, ProjectRoleId = 2 }, // Michael Wilson as Developer
                        new TeamUser { TeamId = 2, UserId = 6, ProjectRoleId = 2 }, // Sarah Martinez as Developer
                        new TeamUser { TeamId = 2, UserId = 8, ProjectRoleId = 3 }, // William Taylor as User

                        // Team C
                        new TeamUser { TeamId = 3, UserId = 9, ProjectRoleId = 4 }, // Olivia Anderson as Guest
                        new TeamUser { TeamId = 3, UserId = 1, ProjectRoleId = 1 }, // John Doe as Project Manager
                        new TeamUser { TeamId = 3, UserId = 3, ProjectRoleId = 2 }, // Alex Johnson as Developer
                        new TeamUser { TeamId = 3, UserId = 5, ProjectRoleId = 2 }, // Michael Wilson as Developer

                        // Team D
                        new TeamUser { TeamId = 4, UserId = 2, ProjectRoleId = 1 }, // Jane Smith as Project Manager
                        new TeamUser { TeamId = 4, UserId = 4, ProjectRoleId = 2 }, // Emily Brown as Developer
                        new TeamUser { TeamId = 4, UserId = 5, ProjectRoleId = 2 }, // Michael Wilson as Developer
                        new TeamUser { TeamId = 4, UserId = 7, ProjectRoleId = 3 }, // Jessica Lee as User

                        // Team E
                        new TeamUser { TeamId = 5, UserId = 6, ProjectRoleId = 2 }, // Sarah Martinez as Developer
                        new TeamUser { TeamId = 5, UserId = 8, ProjectRoleId = 3 }, // William Taylor as User
                        new TeamUser { TeamId = 5, UserId = 9, ProjectRoleId = 4 }, // Olivia Anderson as Guest
                        new TeamUser { TeamId = 5, UserId = 1, ProjectRoleId = 1 } // John Doe as Project Manager
                    };

                    _context.TeamUsers.AddRange(teamUsers);
                    _context.SaveChanges();


                    if(!_context.Projects.Any())
                    {
                        //Projects
                        var projects = new List<Project>
                        {
                            new Project
                            {
                                Id = 1,
                                TeamId = 1,
                                Title = "Website Redesign",
                                StateId = 1,
                                Percentage = 100,
                                Start = new DateTime(2023, 1, 15),
                                End = new DateTime(2023, 5, 30),
                                Description = "Redesign the company's website with a modern and responsive design.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 10000,
                                Spent = 8000,
                                Type = "Web",
                                PriorityId = 2, // Medium Priority
                            },
                            new Project
                            {
                                Id = 2,
                                TeamId = 2,
                                Title = "Marketing Campaign",
                                StateId = 2,
                                Percentage = 80,
                                Start = new DateTime(2023, 2, 10),
                                End = new DateTime(2023, 6, 30),
                                Description = "Plan and execute a targeted marketing campaign for new product launch.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 12000,
                                Spent = 10000,
                                Type = "Marketing",
                                PriorityId = 1, // High Priority
                            },
                            new Project
                            {
                                Id = 3,
                                TeamId = 3,
                                Title = "Data Analysis Tool",
                                StateId = 3,
                                Percentage = 60,
                                Start = new DateTime(2023, 3, 5),
                                End = DateTime.MinValue, // Project not ended yet
                                Description = "Develop a tool for analyzing large datasets and generating reports.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 15000,
                                Spent = 12000,
                                Type = "Data",
                                PriorityId = 3, // Low Priority
                            },
                            new Project
                            {
                                Id = 4,
                                TeamId = 4,
                                Title = "Product Enhancement",
                                StateId = 1,
                                Percentage = 100,
                                Start = new DateTime(2023, 4, 20),
                                End = new DateTime(2023, 8, 31),
                                Description = "Enhance product features based on user feedback and market trends.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 18000,
                                Spent = 15000,
                                Type = "Product",
                                PriorityId = 2, // Medium Priority
                            },
                            new Project
                            {
                                Id = 5,
                                TeamId = 5,
                                Title = "Training Platform",
                                StateId = 2,
                                Percentage = 40,
                                Start = new DateTime(2023, 5, 15),
                                End = DateTime.MinValue, // Project not ended yet
                                Description = "Develop an online training platform for employees.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 8000,
                                Spent = 6000,
                                Type = "Training",
                                PriorityId = 1, // High Priority
                            },
                            new Project
                            {
                                Id = 6,
                                TeamId = 1,
                                Title = "Mobile App Development",
                                StateId = 2,
                                Percentage = 60,
                                Start = new DateTime(2023, 6, 15),
                                End = DateTime.MinValue, // Project not ended yet
                                Description = "Develop a mobile application for iOS and Android platforms.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 8000,
                                Spent = 6000,
                                Type = "Mobile",
                                PriorityId = 3, // Low Priority
                            },
                            new Project
                            {
                                Id = 7,
                                TeamId = 2,
                                Title = "Software Upgrade",
                                StateId = 1,
                                Percentage = 100,
                                Start = new DateTime(2023, 7, 1),
                                End = new DateTime(2023, 9, 30),
                                Description = "Upgrade existing software to the latest version with new features.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 10000,
                                Spent = 9000,
                                Type = "Software",
                                PriorityId = 2, // Medium Priority
                            },
                            new Project
                            {
                                Id = 8,
                                TeamId = 3,
                                Title = "Database Optimization",
                                StateId = 2,
                                Percentage = 40,
                                Start = new DateTime(2023, 8, 10),
                                End = new DateTime(2023, 11, 30),
                                Description = "Optimize database performance for faster data retrieval.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 5000,
                                Spent = 3500,
                                Type = "Database",
                                PriorityId = 1, // High Priority
                            },
                            new Project
                            {
                                Id = 9,
                                TeamId = 4,
                                Title = "Network Security",
                                StateId = 3,
                                Percentage = 80,
                                Start = new DateTime(2023, 9, 5),
                                End = new DateTime(2023, 12, 15),
                                Description = "Implement enhanced security measures for the company's network infrastructure.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 12000,
                                Spent = 10000,
                                Type = "Security",
                                PriorityId = 2, // Medium Priority
                            },
                            new Project
                            {
                                Id = 10,
                                TeamId = 5,
                                Title = "Customer Support System",
                                StateId = 4,
                                Percentage = 30,
                                Start = new DateTime(2023, 10, 20),
                                End = new DateTime(2024, 3, 31),
                                Description = "Develop a customer support system to streamline customer inquiries.",
                                LastStateChangedTime = DateTime.Now,
                                Budget = 15000,
                                Spent = 8000,
                                Type = "Support",
                                PriorityId = 3, // Low Priority
                            }
                        };
                        //TO-DO uraditi initial task-grupe za projekte
                        for(int i = 1;i<=10;i++)
                        {
                            var group = new TaskGroup{
                                Id = i,
                                ProjectId = i,
                                Title = projects[i-1].Title,
                                ParentTaskGroupId = null
                            };
                            _context.TaskGroups.Add(group);
                        }
                        _context.Projects.AddRange(projects);
                        _context.SaveChanges();

                        if(!_context.Assignments.Any())
                        {
                            var assignments = new List<Assignment>{
                                //project 1 rok (2023, 1, 15) do (2023, 5, 30),members:1,3,4,7
                                new Assignment{
                                    Id = 1,
                                    Title = "Neki task",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 1, 25),
                                    End = new DateTime(2023, 2, 14),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 1,
                                    Users = new List<User>{users[0],users[2]},
                                    
                                },
                                new Assignment{
                                    Id = 2,
                                    Title = "Neki task 2",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 1, 25),
                                    End = new DateTime(2023, 2, 16),
                                    StateId = 3,
                                    Percentage = 30,
                                    PriorityId = 2,
                                    Type = "Neki tip",
                                    TaskGroupId = 1,
                                    Users = new List<User>{users[6],users[3]},
                                    
                                },
                                new Assignment{
                                    Id = 3,
                                    Title = "Neki task 3",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 1, 25),
                                    End = new DateTime(2023, 2, 14),
                                    StateId = 4,
                                    Percentage = 50,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 1,
                                    Users = new List<User>{users[2],users[3]},
                                    
                                },
                                //project 2 rok (2023, 2, 10) do (2023, 6, 30), members:2,5,6,8
                                new Assignment{
                                    Id = 4,
                                    Title = "Neki task 4",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 3, 1),
                                    End = new DateTime(2023, 3, 15),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 2,
                                    Users = new List<User>{users[1],users[4]},
                                    
                                },
                                new Assignment{
                                    Id = 5,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 3, 15),
                                    End = new DateTime(2023, 4, 14),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 2,
                                    Users = new List<User>{users[5],users[7]},
                                    
                                },
                                new Assignment{
                                    Id = 6,
                                    Title = "Neki task 6",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 3, 3),
                                    End = new DateTime(2023, 3, 20),
                                    StateId = 2,
                                    Percentage = 45,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 2,
                                    Users = new List<User>{users[1]},
                                    
                                },
                                //project 3 rok (2024, 3, 5) - jos traje,members:9,1,3,5
                                new Assignment{
                                    Id = 7,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 3, 15),
                                    End = new DateTime(2023, 4, 14),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 3,
                                    Type = "Neki tip",
                                    TaskGroupId = 3,
                                    Users = new List<User>{users[8],users[0]},
                                    
                                },
                                new Assignment{
                                    Id = 8,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 3, 15),
                                    End = new DateTime(2023,5, 14),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 3,
                                    Type = "Neki tip",
                                    TaskGroupId = 3,
                                    Users = new List<User>{users[2],users[4]},
                                    
                                },
                                new Assignment{
                                    Id = 9,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 3, 15),
                                    End = new DateTime(2023, 3, 25),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 1,
                                    Type = "Neki tip",
                                    TaskGroupId = 3,
                                    Users = new List<User>{users[0],users[4]},
                                    
                                },
                                    //project 4 rok (2023, 4, 20) do (2023, 8, 31),members:2,4,5,7
                                new Assignment{
                                    Id = 10,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 4, 21),
                                    End = new DateTime(2023, 4, 30),
                                    StateId = 3,
                                    Percentage = 50,
                                    PriorityId = 1,
                                    Type = "Neki tip",
                                    TaskGroupId = 4,
                                    Users = new List<User>{users[1],users[4],users[6]},
                                    
                                },
                                new Assignment{
                                    Id = 11,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 4, 22),
                                    End = new DateTime(2023, 5, 14),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 4,
                                    Users = new List<User>{users[6],users[3]},
                                    
                                },
                                new Assignment{
                                    Id = 12,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 3, 15),
                                    End = new DateTime(2023, 6, 14),
                                    StateId = 1,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 4,
                                    Users = new List<User>{users[4]},
                                    
                                },
                                    //project 5 rok (2023, 5, 15),members:6,8,9,1
                                new Assignment{
                                    Id = 13,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 5, 20),
                                    End = new DateTime(2023, 7, 14),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 1,
                                    Type = "Neki tip",
                                    TaskGroupId = 5,
                                    Users = new List<User>{users[5],users[7]},
                                    
                                },
                                new Assignment{
                                    Id = 14,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 6, 15),
                                    End = new DateTime(2023, 6, 25),
                                    StateId = 3,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 5,
                                    Users = new List<User>{users[8]},
                                    
                                },
                                new Assignment{
                                    Id = 15,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 6, 30),
                                    End = new DateTime(2023, 7, 20),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 2,
                                    Type = "Neki tip",
                                    TaskGroupId = 5,
                                    Users = new List<User>{users[0],users[7]},
                                    
                                },
                                //project 6 rok (2023, 6, 15) ,members:1,3,4,7
                                new Assignment{
                                    Id = 16,
                                    Title = "Neki task",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 6, 16),
                                    End = new DateTime(2023, 6, 30),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 6,
                                    Users = new List<User>{users[0],users[2]},
                                    
                                },
                                new Assignment{
                                    Id = 17,
                                    Title = "Neki task 2",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 7, 1),
                                    End = new DateTime(2023, 7, 16),
                                    StateId = 3,
                                    Percentage = 30,
                                    PriorityId = 2,
                                    Type = "Neki tip",
                                    TaskGroupId = 6,
                                    Users = new List<User>{users[6],users[3]},
                                    
                                },
                                new Assignment{
                                    Id = 18,
                                    Title = "Neki task 3",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 6, 18),
                                    End = new DateTime(2023, 7, 1),
                                    StateId = 2,
                                    Percentage = 50,
                                    PriorityId = 1,
                                    Type = "Neki tip",
                                    TaskGroupId = 6,
                                    Users = new List<User>{users[2],users[3]},
                                    
                                },
                                //project 7 rok (2023, 7, 1) do (2023, 9, 30),members:2,5,6,8
                                new Assignment{
                                    Id = 19,
                                    Title = "Neki task 4",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 7, 18),
                                    End = new DateTime(2023, 8, 5),
                                    StateId = 3,
                                    Percentage = 40,
                                    PriorityId = 2,
                                    Type = "Neki tip",
                                    TaskGroupId = 7,
                                    Users = new List<User>{users[1],users[4]},
                                    
                                },
                                new Assignment{
                                    Id = 20,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 7, 17),
                                    End = new DateTime(2023, 8, 14),
                                    StateId = 1,
                                    Percentage = 20,
                                    PriorityId = 3,
                                    Type = "Neki tip",
                                    TaskGroupId = 7,
                                    Users = new List<User>{users[5],users[7]},
                                    
                                },
                                new Assignment{
                                    Id = 21,
                                    Title = "Neki task 6",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 8, 13),
                                    End = new DateTime(2023, 9, 20),
                                    StateId = 3,
                                    Percentage = 45,
                                    PriorityId = 3,
                                    Type = "Neki tip",
                                    TaskGroupId = 7,
                                    Users = new List<User>{users[1]},
                                    
                                },
                                //project 8 rok (2023, 8, 10) do (2023, 11, 30),members:9,1,3,5
                                new Assignment{
                                    Id = 22,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 8, 15),
                                    End = new DateTime(2023, 8, 30),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 8,
                                    Users = new List<User>{users[8],users[0]},
                                    
                                },
                                new Assignment{
                                    Id = 23,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 9, 1),
                                    End = new DateTime(2023, 9, 25),
                                    StateId = 3,
                                    Percentage = 20,
                                    PriorityId = 3,
                                    Type = "Neki tip",
                                    TaskGroupId = 8,
                                    Users = new List<User>{users[4],users[2]},
                                    
                                },
                                new Assignment{
                                    Id = 24,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 9, 15),
                                    End = new DateTime(2023, 11, 25),
                                    StateId = 1,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 8,
                                    Users = new List<User>{users[0],users[4],users[8]},
                                    
                                },
                                    //project 9 rok (2023, 9, 5) do (2023, 12, 15),members:2,4,5,7
                                new Assignment{
                                    Id = 25,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 9, 15),
                                    End = new DateTime(2023, 9, 25),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 3,
                                    Type = "Neki tip",
                                    TaskGroupId = 9,
                                    Users = new List<User>{users[3],users[6],users[4]},
                                    
                                },
                                new Assignment{
                                    Id = 26,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 9, 25),
                                    End = new DateTime(2023, 10, 10),
                                    StateId = 4,
                                    Percentage = 20,
                                    PriorityId = 2,
                                    Type = "Neki tip",
                                    TaskGroupId = 9,
                                    Users = new List<User>{users[3],users[6]},
                                    
                                },
                                new Assignment{
                                    Id = 27,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 10, 12),
                                    End = new DateTime(2023, 12, 10),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 9,
                                    Users = new List<User>{users[1],users[4]},
                                    
                                },
                                    //project 10 rok (2023, 10, 20) do (2024, 3, 31),members:6,8,9,1
                                new Assignment{
                                    Id = 28,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 10, 25),
                                    End = new DateTime(2023, 11, 21),
                                    StateId = 1,
                                    Percentage = 30,
                                    PriorityId = 4,
                                    Type = "Neki tip",
                                    TaskGroupId = 10,
                                    Users = new List<User>{users[8],users[7]},
                                    
                                },
                                new Assignment{
                                    Id = 29,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 11, 25),
                                    End = new DateTime(2023, 12, 21),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 3,
                                    Type = "Neki tip",
                                    TaskGroupId = 10,
                                    Users = new List<User>{users[0],users[7]},
                                    
                                },
                                new Assignment{
                                    Id = 30,
                                    Title = "Neki task 5",
                                    Description = "Neki opis",
                                    Start = new DateTime(2023, 12, 15),
                                    End = new DateTime(2024, 1, 14),
                                    StateId = 2,
                                    Percentage = 20,
                                    PriorityId = 3,
                                    Type = "Neki tip",
                                    TaskGroupId = 10,
                                    Users = new List<User>{users[5]},
                                    
                                },
                            };

                            _context.AddRange(assignments);
                            _context.SaveChanges();
                        }
                    }
                }
            }
        }
    }
}