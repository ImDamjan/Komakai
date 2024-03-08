using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Projects
{
    public class CreateProjectDto
    {
        public int UserId { get; set; }
        public string Title { get; set; } = null!;
        public string Type { get; set; } = null!;
        public DateTime EstimatedTime { get; set; }
    }
}