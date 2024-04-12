using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOs.Assignment
{
    public class TaskGroupTasksDto
    {
        public int Id { get; set; }
        public string Title { get; set; } = null!;
        public int ProjectId { get; set; }
        public List<TaskGroupTasksDto> Children { get; set; } = new List<TaskGroupTasksDto>();
        public List<AssignmentDto> Assignments { get; set; } = new List<AssignmentDto>();
    }
}