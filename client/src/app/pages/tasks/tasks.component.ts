import { Component, Injector, inject } from '@angular/core';
import { Task } from '../../models/task';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment';
import { Subscription, forkJoin, interval, map, switchMap, takeUntil } from 'rxjs';
import { AssignmentService } from '../../services/assignment.service';
import { PriorityService } from '../../services/priority.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  taskObj: Task [] = [];

  private apiUrl = environment.apiUrl;

  tasks: Task[] = [];

  priorities: any[] = [];

  satuses: any[] = [];

  private jwtDecoder = inject(JwtDecoderService);
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
    let token = this.jwtDecoder.getToken();
    let id = 0;
    if(token!=null)
    {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
    }
    this.taskService.getAllUserAssignments(id).subscribe(tasks => {
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
            state: task.state,
            percentage: task.percentage,
            type: task.type,
            priority: task.priority,
            timeDifference: 0,
            remaining: '',
            owner: task.owner,
            taskGroup: task.taskGroup,
            dummyTitle: '',
            depndentOn: []
          }
          // console.log(myObj);
          this.taskObj.push(myObj);
        });

        this.taskObj.forEach(task => {
          const end = task.end;
          const start = task.start;
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
    });
  }

}
