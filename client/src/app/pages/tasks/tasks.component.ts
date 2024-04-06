import { Component } from '@angular/core';
import { Task } from '../../models/task';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { Subscription, forkJoin, interval, map, switchMap, takeUntil } from 'rxjs';
import { AssignmentService } from '../../services/assignment.service';
import { Assignment } from '../../models/assignment';
import { PriorityService } from '../../services/priority.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  taskObj: Task [] = [];

  private apiUrl = environment.apiUrl;

  tasks: Assignment[] = [];

  priorities: any[] = [];

  satuses: any[] = [];

  remainingTimeSubscriptions: Subscription[] = [];

  constructor(private taskService: AssignmentService, private priorityService : PriorityService) { }

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
    this.taskService.getAllUserAssignments(1).subscribe(tasks => {
        this.tasks  = tasks;
        //ispravljeno tako da se assignment kastuje u task (potencijalno ce mozda da se izbaci)
        tasks.forEach(task => {
          task.end = new Date(task.end);
          task.start = new Date(task.start);
          let myObj : Task = {
            id: task.id,
            start: task.start,
            end: task.end,
            endMilliseconds: task.end.getMilliseconds(),
            startMilliSeconds: task.start.getMilliseconds(),
            endSeconds: task.end.getSeconds(),
            endMinutes: task.end.getMinutes(),
            endHours: task.end.getHours(),
            endYear: task.end.getFullYear(),
            endMonth: task.end.getMonth() + 1,
            endDate: task.end.getDate(),
            startSeconds: task.start.getSeconds(),
            startMinutes: task.start.getMinutes(),
            startHours: task.start.getHours(),
            startYear: task.start.getFullYear(),
            startMonth: task.start.getMonth() + 1,
            startDate: task.start.getDate(),
            assignees: task.assignees,
            title: task.title,
            description: task.description,
            stateId: task.stateId,
            percentage: task.percentage,
            dependent: task.dependentOn,
            priorityId: task.priorityId,
            projectId: 1,
            type: task.type,
            priority: ""
          }
          this.taskObj.push(myObj);
        });
        
        // this.taskObj.forEach(task => {

        //   const start = new Date(task.start);
        //   task.startDate = start.getDate();
        //   task.startMonth = start.getMonth() + 1;
        //   task.startYear = start.getFullYear();
        //   task.startHours = start.getHours();
        //   task.startMinutes = start.getMinutes();
        //   task.startSeconds = start.getSeconds();
        //   task.startMilliSeconds = start.getMilliseconds();

        //   const end = new Date(task.end);
        //   const endTime = end.getTime();

        //   task.endDate = end.getDate();
        //   task.endMonth = end.getMonth() + 1;
        //   task.endYear = end.getFullYear();
        //   task.endHours = end.getHours();
        //   task.endMinutes = end.getMinutes();
        //   task.endSeconds = end.getSeconds();
        //   task.endMilliseconds = end.getMilliseconds();

        // });
          const timeDifference = end.getTime()-start.getTime();
          task.timeDifference = timeDifference;
          const current = new Date();
          if(end.getTime()<current.getTime()){
            task.remaining = 'No more time';
          }
          else{
            const days = (end.getTime()-current.getTime()) / (1000 * 60 * 60 * 24);
            const hours = (end.getTime()-current.getTime()) / (1000 * 60 * 60);
            const minutes = (end.getTime()-current.getTime()) / (1000 * 60);
            if(hours>24){
              task.remaining = days.toString() + ' days';
            }
            else{
              if(minutes>60){
                task.remaining = hours.toString() + ' hours';
              }
              else{
                task.remaining = minutes.toString() + ' minutes';
              }
            }
          }

        });

        const requests = this.taskObj.map(task => this.priorityService.getPriorityById(task.priorityId));

        forkJoin(requests).subscribe((responses: any[]) => {
            responses.forEach((response, index) => {
                this.taskObj[index].priority = response.description;

            });
        });
    });
  }

}
