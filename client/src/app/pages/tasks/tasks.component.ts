import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { Subscription, forkJoin, interval, map, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  taskObj: Task [] = [];

  private apiUrl = environment.apiUrl;

  tasks: any[] = [];

  priorities: any[] = [];

  satuses: any[] = [];

  remainingTimeSubscriptions: Subscription[] = [];

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

  ngOnDestroy(): void {
    this.remainingTimeSubscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.taskService.getAllTasks().subscribe(tasks => {
        this.taskObj = tasks;

        this.taskObj.forEach(task => {

          const start = new Date();
          task.startDate = start.getDate();
          task.startMonth = start.getMonth() + 1;
          task.startYear = start.getFullYear();
          task.startHours = start.getHours();
          task.startMinutes = start.getMinutes();
          task.startSeconds = start.getSeconds();
          task.startMilliSeconds = start.getMilliseconds();

          const end = new Date(task.end);
          const endTime = end.getTime();

          task.endDate = end.getDate();
          task.endMonth = end.getMonth() + 1;
          task.endYear = end.getFullYear();
          task.endHours = end.getHours();
          task.endMinutes = end.getMinutes();
          task.endSeconds = end.getSeconds();
          task.endMilliseconds = end.getMilliseconds();

          const timeDifference = end.getTime()-start.getTime();
          task.timeDifference = timeDifference;
          if(timeDifference<=0){
            task.remaining = 'No more time';
          }
          else{
            const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
            const hours = Math.floor(timeDifference / (1000 * 60 * 60));
            const minutes = Math.floor(timeDifference / (1000 * 60));
            if(hours>24){
              task.remaining = days.toString() + ' days';
            }
            else if(hours<=24 && minutes>60){
              task.remaining = hours.toString() + ' hours';
            }
            else{
              task.remaining = minutes.toString() + ' minutes';
            }
          }

        });

        const requests = this.taskObj.map(task => this.http.get<any>(this.apiUrl + `/Priority/getById` + task.priorityId));

        forkJoin(requests).subscribe((responses: any[]) => {
            responses.forEach((response, index) => {
                this.taskObj[index].priority = response.description;

            });
        });
    });
  }

}
