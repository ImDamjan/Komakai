using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("assignment")]
    public class Assignment
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("start")]
        public int Start { get; set; }

        [Column("end")]
        public int End { get; set; }

        [Column("status")]
        public int Status { get; set; }

        [Column("percentage")]
        public int Percentage { get; set; }

        [Column("dependent")]
        public int? Dependent { get; set; }

        [Column("priority_id")]
        public int PriorityId { get; set; }

        [Column("project_id")]
        public int ProjectId { get; set; }

        [Column("type_id")]
        public int TypeId { get; set; }

        [Column("assignee")]
        public int Assignee { get; set; }

        [ForeignKey("Assignee")]
        [InverseProperty("Assignments")]
        public virtual User AssigneeNavigation { get; set; } = null!;

        [InverseProperty("Assignment")]
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

        [ForeignKey("Dependent")]
        [InverseProperty("InverseDependentNavigation")]
        public virtual Assignment? DependentNavigation { get; set; }

        [InverseProperty("DependentNavigation")]
        public virtual ICollection<Assignment> InverseDependentNavigation { get; set; } = new List<Assignment>();

        [ForeignKey("PriorityId")]
        [InverseProperty("Assignments")]
        public virtual Priority Priority { get; set; } = null!;

        [ForeignKey("ProjectId")]
        [InverseProperty("Assignments")]
        public virtual Project Project { get; set; } = null!;

        [ForeignKey("TypeId")]
        [InverseProperty("Assignments")]
        public virtual AssignmentType Type { get; set; } = null!;

        [ForeignKey("AssignmentId")]
        [InverseProperty("Assignments")]
        public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();

        [ForeignKey("AssignmentId")]
        [InverseProperty("AssignmentsNavigation")]
        public virtual ICollection<User> Users { get; set; } = new List<User>();
        }
}