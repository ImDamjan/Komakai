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

        [Column("title", TypeName ="varchar(45)")]
        public string Title { get; set; } = null!;

        [Column("description")]
        public string Description { get; set; } = null!;

        [Column("start", TypeName ="datetime")]
        public DateTime Start { get; set; }

        [Column("end", TypeName ="datetime")]
        public DateTime End { get; set; }

        [Column("state_id")]
        public int StateId { get; set; }

        [Column("percentage", TypeName ="float")]
        public float Percentage { get; set; }

        [Column("dependent")]
        public int? Dependent { get; set; }

        [Column("priority_id")]
        public int PriorityId { get; set; }

        [Column("project_id")]
        public int ProjectId { get; set; }

        [Column("type")]
        public string Type { get; set; } = null!;

        [InverseProperty("Assignment")]
        public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();


        //dependent prop
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

        [ForeignKey("AssignmentId")]
        [InverseProperty("Assignments")]
        public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();

        [ForeignKey("AssignmentId")]
        [InverseProperty("AssignmentsNavigation")]
        public virtual ICollection<User> Users { get; set; } = new List<User>();
        

        [ForeignKey("StateId")]
        [InverseProperty("Assignments")]
        public State? State { get; set; }    
    }
}