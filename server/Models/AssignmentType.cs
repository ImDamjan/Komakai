using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("AssignmentType")]
    public class AssignmentType
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("name", TypeName = "varchar(45)")]
        public string? Name { get; set; }

        [InverseProperty("Type")]
        public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();

    }
}