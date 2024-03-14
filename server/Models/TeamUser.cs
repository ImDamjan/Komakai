using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace server.Models
{
    [PrimaryKey("TeamId","UserId")]
    [Table("team_user")]
    public class TeamUser
    {
        [Key]
        [Column("team_id")]
        public int TeamId { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }

        [Column("project_role_id")]
        public int? ProjectRoleId { get; set; }

        [ForeignKey("ProjectRoleId")]
        [InverseProperty("TeamUsers")]
        public virtual Role Role { get; set; } = null!;

        [ForeignKey("TeamId")]
        [InverseProperty("TeamUsers")]
        public virtual Team Team { get; set; } = null!;

        [ForeignKey("UserId")]
        [InverseProperty("TeamUsers")]
        public virtual User User { get; set; } = null!;

    }
}