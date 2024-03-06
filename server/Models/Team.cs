using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("team")]
    public class Team
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("name", TypeName = "varchar(45)")]
        public string Name { get; set; } = null!;

        [Column("type", TypeName = "varchar(45)")]
        public string Type { get; set; } = null!;

        [Column("tags", TypeName = "varchar(45)")]
        public string Tags { get; set; } = null!;

        [InverseProperty("Team")]
        public virtual ICollection<ProjectUser> ProjectUsers { get; set; } = new List<ProjectUser>();

    }
}