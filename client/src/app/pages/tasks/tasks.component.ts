import { Component, EventEmitter, Injector, Output, ViewChild, inject } from '@angular/core';
import { Task } from '../../models/task/task';
import { Subscription, forkJoin, interval, map, switchMap, takeUntil } from 'rxjs';
import { AssignmentService } from '../../services/assignment.service';
import { PriorityService } from '../../services/priority.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { TaskHeaderComponent } from '../../components/task-header/task-header.component';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  
  @Output() searchValueChanged = new EventEmitter<string>();
  @Output() searchProjectChanged = new EventEmitter<string>();

  @ViewChild('taskHeader', { static: false }) taskHeaderComponent: TaskHeaderComponent | null = null;

  taskObj: Task [] = [];

  filteredTasks: Task[] = [];

  tasks: Task[] = [];

  priorities: any[] = [];

  satuses: any[] = [];

  private jwtDecoder = inject(JwtDecoderService);
  remainingTimeSubscriptions: Subscription[] = [];

  constructor(private taskService: AssignmentService, private priorityService : PriorityService) { }

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
    this.filteredTasks = this.filterTasks('');
  }

  ngAfterViewInit() {
    this.taskHeaderComponent?.searchValueChanged.subscribe(searchValue => {
      this.filteredTasks = this.filterTasks(searchValue.searchText);
    });
    this.taskHeaderComponent?.searchProjectChanged.subscribe(projectValue => {
      this.filteredTasks = this.filterTasks1(projectValue.searchText,projectValue.projectId)
    });
  }

  filterTasks1(searchText: string, projectId?: number): Task[] {
    console.log(searchText)
    console.log(projectId)
    let filteredTasks = this.taskObj;
  
    // Apply project ID filter (if provided)
    if (projectId) {
      filteredTasks = filteredTasks.filter(task => task.taskGroup.projectId == projectId);
    }

    console.log(filteredTasks)
  
    // Apply search text filter (if provided and after project ID filter)
    if (searchText) {
      searchText = searchText.toLowerCase();
      filteredTasks = filteredTasks.filter(task => {
        const title = task.title.toLowerCase();
        return title.includes(searchText);
      });
    }

    console.log(filteredTasks)
  
    return filteredTasks;
  }

  filterTasks(searchText: string): Task[] {
    // console.log(searchText)
    if (!searchText) {
      return this.taskObj;
    }
  
    searchText = searchText.toLowerCase();
  
    let filteredTasks = this.taskObj;
  
    if (searchText) {
      filteredTasks = filteredTasks.filter(task => {
        const title = task.title.toLowerCase();
        return title.includes(searchText);
      });
    }
  
    return filteredTasks;
  }

}
