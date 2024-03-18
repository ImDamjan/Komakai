import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { forkJoin, switchMap } from 'rxjs';

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

  // ngOnInit(): void {
    
  //   this.taskService.getAllTasks().subscribe(tasks => {
  //     this.tasks = tasks;

  //     for (const task of this.tasks) {
  //       this.http.get<any>(this.apiUrl+`/Priority/getPrio` + task.priorityId).subscribe(priorities =>{
  //         task.priority = priorities.description;
  //       });
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
        this.tasks = tasks;

        const requests = this.tasks.map(task => this.http.get<any>(this.apiUrl + `/Priority/getPrio` + task.priorityId));

        forkJoin(requests).subscribe((responses: any[]) => {
            responses.forEach((response, index) => {
                this.tasks[index].priority = response.description;
            });
        });
    });
  }

}
