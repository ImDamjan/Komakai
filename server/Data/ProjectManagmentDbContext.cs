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
        public virtual DbSet<Assignment> Assignments { get; set; }
        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Priority> Priorities { get; set; }
        public virtual DbSet<Project> Projects { get; set; }
        public virtual DbSet<TeamUser> TeamUsers {get; set;}
        public virtual DbSet<Role> Roles { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<Team> Teams { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<TeamTag> TeamTags { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
        }
    }
}