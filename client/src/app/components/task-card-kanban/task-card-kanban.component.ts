import { Component, Inject, Input, OnInit } from '@angular/core';
import { Task } from '../../models/task/task';

@Component({
  selector: 'app-task-card-kanban',
  templateUrl: './task-card-kanban.component.html',
  styleUrl: './task-card-kanban.component.css'
})
export class TaskCardKanbanComponent implements OnInit {
  @Input() public task! : Task;
  ngOnInit(): void {
    this.task.end = new Date(this.task.end);
    this.task.start = new Date(this.task.start);
  }

  public getPriorityClass()
  {
    if(this.task.priority.description.toLowerCase() === "low")
      return "low";
    if(this.task.priority.description.toLowerCase() === "at risk")
      return "at-risk";
    if(this.task.priority.description.toLowerCase() === "medium")
      return "medium";
    if(this.task.priority.description.toLowerCase() === "high")
      return "high";
    
    return "";


  }

  public transformDate(date : Date) : string
  {
    let splited =date.toLocaleDateString().split('/');
    for (let i = 0; i < splited.length; i++) {
      if(splited[i].length == 1)
        {
          splited[i] = "0"+splited[i];
        }
      
    }
    return splited[2] + "-" + splited[0] + "-" + splited[1];
  }
}
