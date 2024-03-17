import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { ProjectTaskComponent } from '../../components/project-task/project-task.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  taskObj: Task = {
    
  } as Task;  

  n: number = 3; // Set your desired number of repetitions here

  constructor(private projectTaskComponent: ProjectTaskComponent) { }

  ngOnInit(): void {
    this.projectTaskComponent.getAllTasks().subscribe(tasks => {
      this.taskObj = tasks;
    });
  }

  // getRange(n: number): number[] {
  //   return Array.from({length: n}, (_, i) => i + 1);
  // }
}
