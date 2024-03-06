using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    [Table("answer")]
    public class Answer
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("content")]
        public string? Content { get; set; }

        [Column("comment_id")]
        public int? CommentId { get; set; }

        [ForeignKey("CommentId")]
        [InverseProperty("Answers")]
        public virtual Comment? Comment { get; set; }
    }
}