using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class ProjectManagmentDbContext : DbContext
    {
        public ProjectManagmentDbContext(DbContextOptions options) : base(options)
        {
        }

        public virtual DbSet<Answer> Answers { get; set; }
        public virtual DbSet<AssignmentType> AsignmentTypes { get; set; }
        public virtual DbSet<Assignment> Assignments { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Priority> Priorities { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<ProjectRole> ProjectRoles { get; set; }
        public virtual DbSet<ProjectUser> ProjectUsers { get; set; }
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<Team> Teams { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<State> States { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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

            var ProjectRoles =  new List<ProjectRole>{
                new ProjectRole{
                    Id = 1,
                    Name = "Project Manager"
                },
                    new ProjectRole{
                    Id = 2,
                    Name = "Developer"
                },
                    new ProjectRole{
                    Id = 3,
                    Name = "User"
                },
                    new ProjectRole{
                    Id = 4,
                    Name = "Guest"
                }
            };

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

            modelBuilder.Entity<Role>().HasData(platformRoles);
            modelBuilder.Entity<State>().HasData(states);
            modelBuilder.Entity<ProjectRole>().HasData(ProjectRoles);
        }
    }
}