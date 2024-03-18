using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Projects
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = "";
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public int? StateId { get; set; }
        public int EstimatedTime { get; set; }
        public double Budget { get; set; }
        public double Spent { get; set; }
        public string Type { get; set; } = "";
        public double Percentage { get; set; }
        public string Description { get; set; } = "";
        public int? PriorityId { get; set; }
        public int TeamId { get; set; }

    }
}