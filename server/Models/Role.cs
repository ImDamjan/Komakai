using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("role")]
    public class Role
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("name", TypeName = "varchar(45)")]
        public string Name { get; set; } = null!;
        public virtual ICollection<RolePermission> RolePermissions { get; set; } = new List<RolePermission>();

        [InverseProperty("Role")]
        public virtual ICollection<User> Users { get; set; } = new List<User>();

        [InverseProperty("Role")]
        public virtual ICollection<TeamUser> TeamUsers {get; set;} = new List<TeamUser>();
    }
}