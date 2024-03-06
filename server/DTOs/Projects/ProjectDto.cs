using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Projects
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Status { get; set; } = null!;
        public int? Subproject { get; set; }
        public DateTime EstimatedTime { get; set; }
        public double Budget { get; set; }
        public double Spent { get; set; }
        public string Type { get; set; } = null!;
        public double Percentage { get; set; }

    }
}