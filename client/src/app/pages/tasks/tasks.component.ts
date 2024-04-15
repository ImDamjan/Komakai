import { Component, Injector, inject } from '@angular/core';
import { Task } from '../../models/task/task';
import { Subscription, forkJoin, interval, map, switchMap, takeUntil } from 'rxjs';
import { AssignmentService } from '../../services/assignment.service';
import { PriorityService } from '../../services/priority.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { DateConverterService } from '../../services/date-converter.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {

  tasks: Task[] = [];
private task_date_service = inject(DateConverterService);

  private jwtDecoder = inject(JwtDecoderService);
  remainingTimeSubscriptions: Subscription[] = [];

  constructor(private taskService: AssignmentService) { }

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


        this.tasks.forEach(task => {
          this.task_date_service.setDateParametersForTask(task);
        });
    });
  }

}
