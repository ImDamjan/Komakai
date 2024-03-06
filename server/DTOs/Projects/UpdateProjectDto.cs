using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Projects
{
    public class UpdateProjectDto
    {
        public string Title { get; set; } = null!;
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public string Status { get; set; } = null!;
        public DateTime EstimatedTime { get; set; }
        public double Spent { get; set; }
        public double Percentage { get; set; }

    }
}