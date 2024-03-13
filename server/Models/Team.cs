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



        //many-to-many condition
        [InverseProperty("Team")]
        public virtual ICollection<TeamUser> TeamUsers {get; set;} = new List<TeamUser>();

        [InverseProperty("Team")]
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();

        [InverseProperty("Team")]
        public virtual ICollection<TeamTag> TeamTags { get; set; } = new List<TeamTag>();

    }
}