using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace server.Models
{
    
    [PrimaryKey("UserId", "ProjectId")]
    [Table("project_users")]
    public class ProjectUser
    {
        [Key]
        [Column("user_id")]
        public int UserId { get; set; }

        [Key]
        [Column("project_id")]
        public int ProjectId { get; set; }

        [Column("project_role_id")]
        public int ProjectRoleId { get; set; }

        [Column("team_id")]
        public int? TeamId { get; set; }

        [ForeignKey("ProjectId")]
        [InverseProperty("ProjectUsers")]
        public virtual Project Project { get; set; } = null!;

        [ForeignKey("ProjectRoleId")]
        [InverseProperty("ProjectUsers")]
        public virtual ProjectRole ProjectRole { get; set; } = null!;

        [ForeignKey("TeamId")]
        [InverseProperty("ProjectUsers")]
        public virtual Team? Team { get; set; }

        [ForeignKey("UserId")]
        [InverseProperty("ProjectUsers")]
        public virtual User User { get; set; } = null!;
    }
}