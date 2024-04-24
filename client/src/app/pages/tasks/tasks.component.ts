import { Component, EventEmitter, Injector, Output, ViewChild, inject } from '@angular/core';
import { Task } from '../../models/task/task';
import { Subscription, filter, forkJoin, interval, map, switchMap, takeUntil } from 'rxjs';
import { AssignmentService } from '../../services/assignment.service';
import { PriorityService } from '../../services/priority.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { TaskHeaderComponent } from '../../components/task-header/task-header.component';
import { TaskFilter } from '../../models/task/task-filter';
import { DateConverterService } from '../../services/date-converter.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  
  @Output() searchValueChanged = new EventEmitter<string>();
  @Output() searchFilterChanged = new EventEmitter<TaskFilter>();
  @Output() searchSortChanged = new EventEmitter<TaskFilter>();

  @ViewChild('taskHeader', { static: false }) taskHeaderComponent: TaskHeaderComponent | undefined;
  filteredTasks: Task[] = [];

  tasks: Task[] = [];
  private task_date_service = inject(DateConverterService);

  public filter: TaskFilter = {

  };

  private jwtDecoder = inject(JwtDecoderService);
  remainingTimeSubscriptions: Subscription[] = [];

  constructor(private taskService: AssignmentService) { }

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
        this.filteredTasks = this.tasks;
    });
    // this.filteredTasks = this.filterTasks('');
  }

  ngAfterViewInit() {
    this.taskHeaderComponent?.searchValueChanged.subscribe(searchValue => {
      this.searchTasks(searchValue.searchText);
    });
    this.taskHeaderComponent?.searchFilterChanged.subscribe(filter => {
      this.filterTasks(filter.filter);
    });
    this.taskHeaderComponent?.searchSortChanged.subscribe(filter => {
      this.sortTasks(filter.filter);
    });
  }

  sortTasks(filter: TaskFilter){
    
    console.log(filter)

    let collectedTasks: Task[] = [];

    if(filter.propertyName){
      this.filter.propertyName=filter.propertyName;
    }
    if(filter.sortFlag){
      this.filter.sortFlag=filter.sortFlag;
    }

    let token = this.jwtDecoder.getToken();
    let id = 0;
    if(token!=null)
    {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
    }
    this.taskService.getAllUserAssignments(id,this.filter).subscribe(tasks => {
      collectedTasks = tasks;

      collectedTasks.forEach(task => {
        this.task_date_service.setDateParametersForTask(task);
      });
      this.filteredTasks = collectedTasks;
    });
  }

  filterTasks(filter: TaskFilter){

    let collectedTasks: Task[] = [];

    if(filter.project_id){
      this.filter.project_id=filter.project_id;
    }
    if(filter.stateFilter){
      this.filter.stateFilter=filter.stateFilter;
    }
    if(filter.priorityFilter){
      this.filter.priorityFilter=filter.priorityFilter;
    }
    if(filter.dateStartFlag){
      this.filter.dateStartFlag=filter.dateStartFlag;
    }
    if(filter.dateEndFlag){
      this.filter.dateEndFlag=filter.dateEndFlag;
    }
    if(filter.start){
      this.filter.start=filter.start;
    }
    if(filter.end){
      this.filter.end=filter.end;
    }
    if(filter.percentageFlag){
      this.filter.percentageFlag=filter.percentageFlag;
    }
    if(filter.percentageFilter){
      this.filter.percentageFilter=filter.percentageFilter;
    }

    let token = this.jwtDecoder.getToken();
    let id = 0;
    if(token!=null)
    {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
    }
    this.taskService.getAllUserAssignments(id,this.filter).subscribe(tasks => {
      collectedTasks = tasks;

      collectedTasks.forEach(task => {
        this.task_date_service.setDateParametersForTask(task);
      });
      this.filteredTasks = collectedTasks;
    });
  }

  searchTasks(searchText: string) {
    // console.log(searchText)

    let filteredTasks: Task[] = [];

    let collectedTasks: Task[] = [];

    this.filter.searchTitle = searchText;

    if(searchText=''){
      
    }
    else{
      let token = this.jwtDecoder.getToken();
      let id = 0;
      if(token!=null)
      {
        let decode = this.jwtDecoder.decodeToken(token);
        id = decode.user_id;
      }
      this.taskService.getAllUserAssignments(id,this.filter).subscribe(tasks => {
        collectedTasks = tasks;

        collectedTasks.forEach(task => {
          this.task_date_service.setDateParametersForTask(task);
        });
        this.filteredTasks = collectedTasks;
      });
    }

  }

}
