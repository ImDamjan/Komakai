using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Projects
{
    public class UpdateProjectDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int StateId { get; set; }
        public int PriorityId { get; set; }
        public string Description { get; set; } = "";
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        public double Spent { get; set; }
        public double Percentage { get; set; }

    }
}