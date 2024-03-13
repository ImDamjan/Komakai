using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("project")]
    public class Project
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("title", TypeName = "varchar(45)")]
        public string Title { get; set; } = null!;

        [Column("start", TypeName = "datetime")]
        public DateTime Start { get; set; }

        [Column("end", TypeName = "datetime")]
        public DateTime End { get; set; }

        [Column("state")]
        public int? StateId { get; set; }

        [Column("last_state_changed", TypeName ="datetime")]
        public DateTime LastStateChange { get; set; }

        [Column("subproject")]
        public int? Subproject { get; set; }

        [Column("estimated_time", TypeName = "datetime")]
        public DateTime EstimatedTime { get; set; }

        [Column("budget", TypeName = "double")]
        public double Budget { get; set; }

        [Column("spent", TypeName = "double")]
        public double Spent { get; set; }

        [Column("type", TypeName = "varchar(45)")]
        public string Type { get; set; } = null!;

        [Column("percentage", TypeName = "float")]
        public double Percentage { get; set; }

        [InverseProperty("Project")]
        public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

        [InverseProperty("SubprojectNavigation")]
        public virtual ICollection<Project> InverseSubprojectNavigation { get; set; } = new List<Project>();


        [ForeignKey("Subproject")]
        [InverseProperty("InverseSubprojectNavigation")]
        public virtual Project? SubprojectNavigation { get; set; }

        [ForeignKey("RelatedProjectId")]
        [InverseProperty("RelatedProjects")]
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

        [ForeignKey("ProjectId")]
        [InverseProperty("Projects")]
        public virtual ICollection<Project> RelatedProjects { get; set; } = new List<Project>();

        [ForeignKey("ProjectId")]
        [InverseProperty("Projects")]
        public virtual ICollection<Tag> Tags { get; set; } = new List<Tag>();

        [ForeignKey("StateId")]
        [InverseProperty("Projects")]
        public virtual State? State { get; set; } = null!;
    }
}