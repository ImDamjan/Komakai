import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  taskObj: Task = {
    
  } as Task; 

  private apiUrl = environment.apiUrl;

  tasks: any[] = [];

  priorities: any[] = [];

  satuses: any[] = [];

  constructor(private taskService: TaskService, private http: HttpClient) { }

  ngOnInit(): void {
    
    this.taskService.getAllTasks().subscribe(tasks => {
      this.tasks = tasks;
    });

    this.http.get<any>(this.apiUrl+`/Priority/getPriorities`).subscribe(priorities =>{
      this.priorities=priorities;
    });

    for (const task of this.tasks) {
      for (const priority of this.priorities) {
        if(task.priorityId==priority.id){
          task.priority=priority.description;
        }
      }
    }

  }

}
