using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Projects
{
    public class UpdateProjectDto
    {
        public string Title { get; set; } = null!;
        public DateTime End { get; set; }
        public int StateId { get; set; }
        public int PriorityId { get; set; }
        public string Description { get; set; } = "";
        public int EstimatedTime { get; set; } //u danima
        public double Spent { get; set; }
        public double Percentage { get; set; }

    }
}