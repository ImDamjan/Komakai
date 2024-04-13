using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Assignment
{
    public class AssignmentFilterDto
    {
        public string SearchTitle { get; set; } = string.Empty;
        public int DateStartFlag { get; set; }
        public DateTime? Start { get; set; }
        public int DateEndFlag { get; set; }
        public DateTime? End { get; set; }
        public int StateFilter { get; set; }
        public int PercentageFlag { get; set; }
        public float? PercentageFilter { get; set; }
        public int PriorityFilter { get; set; }
    }
}