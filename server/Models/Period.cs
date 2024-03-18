using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("period")]
    public class Period
    {
        [Key]
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        //koliko dana vredi odredjen period
        [Column("value")]
        public int Value { get; set; }

        [InverseProperty("Period")]
        public virtual ICollection<Assignment> Assignments { get; set; } = new List<Assignment>();
        [InverseProperty("Period")]
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}