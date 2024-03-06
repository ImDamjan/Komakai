using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("name",TypeName = "varchar(45)")]
        public string Name { get; set; } = string.Empty;

        [Column("lastname", TypeName = "varchar(45)")]
        public string Lastname { get; set; } = string.Empty;

        [Column("username", TypeName ="varchar(45)")]
        public string Username { get; set; } = string.Empty;

        [Column("password", TypeName = "varchar(45)")]
        public string Password { get; set; } = string.Empty;

        [Column("email", TypeName = "varchar(45)")]
        public string Email { get; set; }= string.Empty;

        [Column("job_title", TypeName = "varchar(45)")]
        public string JobTitle { get; set; } =string.Empty;

        [Column("organisation", TypeName = "varchar(45)")]
        public string Organisation { get; set; } = string.Empty;

        [Column("department", TypeName = "varchar(45)")]
        public string Department { get; set; } = string.Empty;

        

        [Column("role_id")]
        public int? RoleId { get; set; }

        [InverseProperty("AssigneeNavigation")]
        public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

        [InverseProperty("User")]
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        [InverseProperty("User")]
        public virtual ICollection<ProjectUser> ProjectUsers { get; set; } = new List<ProjectUser>();

        [ForeignKey("RoleId")]
        [InverseProperty("Users")]
        public virtual Role Role { get; set; } = null!;

        [ForeignKey("UserId")]
        [InverseProperty("Users")]
        public virtual ICollection<Assignment> AssignmentsNavigation { get; set; } = new List<Assignment>();

        [ForeignKey("UserId")]
        [InverseProperty("Users")]
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
       
    }
}
