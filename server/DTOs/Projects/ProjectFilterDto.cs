using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Projects
{
    public class ProjectFilterDto
    {
        public string SearchTitle { get; set; } = string.Empty;
        public int DateStartFlag { get; set; }
        public int DateEndFlag { get; set; }
        public DateTime? Start { get; set; } = null;
        public DateTime? End { get; set; } = null;
        public int PriorityFilter { get; set; } // po prioritetu >1 and <5
        public int StateFilter { get; set; } //po state-u >1 and <7
        public double? BudgetFilter { get; set; } = null;
        public int BudgetFlag { get; set; }
        public double? SpentFilter { get; set; } = null;
        public int SpentFlag { get; set; }
        public int? PercentageFilter { get; set; } = null;
        public int PercentageFlag { get; set; }

    }
}