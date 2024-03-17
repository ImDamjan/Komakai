import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { ProjectTaskComponent } from '../../components/project-task/project-task.component';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  taskObj: Task = {
    
  } as Task; 

  tasks: any[] = [];

  // n: number = 3;

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }
  
}
