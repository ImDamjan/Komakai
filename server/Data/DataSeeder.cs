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
                        RoleId = 4 // Guest
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
                                EstimatedTime = 120,
                                Budget = 10000,
                                Spent = 8000,
                                Type = "Web",
                                PriorityId = 2 // Medium Priority
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
                                EstimatedTime = 150,
                                Budget = 12000,
                                Spent = 10000,
                                Type = "Marketing",
                                PriorityId = 1 // High Priority
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
                                EstimatedTime = 180,
                                Budget = 15000,
                                Spent = 12000,
                                Type = "Data",
                                PriorityId = 3 // Low Priority
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
                                EstimatedTime = 200,
                                Budget = 18000,
                                Spent = 15000,
                                Type = "Product",
                                PriorityId = 2 // Medium Priority
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
                                EstimatedTime = 120,
                                Budget = 8000,
                                Spent = 6000,
                                Type = "Training",
                                PriorityId = 1 // High Priority
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
                                EstimatedTime = 180,
                                Budget = 8000,
                                Spent = 6000,
                                Type = "Mobile",
                                PriorityId = 3 // Low Priority
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
                                EstimatedTime = 150,
                                Budget = 10000,
                                Spent = 9000,
                                Type = "Software",
                                PriorityId = 2 // Medium Priority
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
                                EstimatedTime = 120,
                                Budget = 5000,
                                Spent = 3500,
                                Type = "Database",
                                PriorityId = 1 // High Priority
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
                                EstimatedTime = 200,
                                Budget = 12000,
                                Spent = 10000,
                                Type = "Security",
                                PriorityId = 2 // Medium Priority
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
                                EstimatedTime = 300,
                                Budget = 15000,
                                Spent = 8000,
                                Type = "Support",
                                PriorityId = 3 // Low Priority
                            }
                        };

                        _context.Projects.AddRange(projects);
                        _context.SaveChanges();
                    }
                }
            }
        }
    }
}