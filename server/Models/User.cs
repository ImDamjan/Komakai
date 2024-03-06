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

        [Column("name")]
        public int Name { get; set; }

        [Column("surname")]
        public int Surname { get; set; }

        [Column("username")]
        public int Username { get; set; }

        [Column("email")]
        public int Email { get; set; }

        [Column("job_title")]
        public int JobTitle { get; set; }

        [Column("organisation")]
        public int Organisation { get; set; }

        [Column("department")]
        public int Department { get; set; }

        [Column("role_id")]
        public int RoleId { get; set; }

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
