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
        public virtual DbSet<TaskGroup> TaskGroups { get; set; }
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
        public DbSet<UserProjectRoles> UserProjectRoles { get; set; }
        public DbSet<UserProjectPermission> UserProjectPermissions { get; set; }
        public virtual DbSet<Permission> Permissions { get; set; }
    }
}