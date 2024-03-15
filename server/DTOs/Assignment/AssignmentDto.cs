using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Assignment
{
    public class AssignmentDto
    {
        public int Id { get; set; }
        public List<int> Assignees {get; set;} = new List<int>();
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int StateId { get; set; }
        public float Percentage { get; set; }
        public int? Dependent { get; set; }
        public int PriorityId { get; set; }
        public int ProjectId { get; set; }
        public string Type { get; set; } = null!;
    }
}