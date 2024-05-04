import { Component, EventEmitter, Injector, Output, ViewChild, inject } from '@angular/core';
import { Task } from '../../models/task/task';
import { Subscription, filter, forkJoin, interval, map, switchMap, takeUntil } from 'rxjs';
import { AssignmentService } from '../../services/assignment.service';
import { PriorityService } from '../../services/priority.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { TaskHeaderComponent } from '../../components/task-header/task-header.component';
import { TaskFilter } from '../../models/task/task-filter';
import { DateConverterService } from '../../services/date-converter.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

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

  public currentPage: number = 1;

  private router = inject(Router);

  private activatedRoute = inject(ActivatedRoute);

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
    this.filter.pageNumber = this.currentPage;
    this.filter.pageSize = 7;
    this.taskService.getAllUserAssignments(id,this.filter).subscribe(tasks => {
        this.tasks  = tasks;

        this.tasks.forEach(task => {
          this.task_date_service.setDateParametersForTask(task);
        });
        this.filteredTasks = this.tasks;
    });
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('pageNumber')) {
        this.currentPage = parseInt(params.get('pageNumber')!);
        this.filter.pageNumber = this.currentPage;
      }
      this.fetchTasksForCurrentPage();
    });
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

    this.filter.pageNumber = this.currentPage;
    this.filter.pageSize = 7;

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

    this.filter.pageNumber = this.currentPage;
    this.filter.pageSize = 7;

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

    this.filter.pageNumber = this.currentPage;
    this.filter.pageSize = 7;
    
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

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filter.pageNumber = this.currentPage;
      this.filter.pageSize = 7;
      let token = this.jwtDecoder.getToken();
      let id = 0;
      if(token!=null)
      {
        let decode = this.jwtDecoder.decodeToken(token);
        id = decode.user_id;
      }
      this.taskService.getAllUserAssignments(id, this.filter).subscribe(tasks => {
        this.updateTasks(tasks);
      });
    }
  }
  
  nextPage() {
    this.currentPage++;
    this.filter.pageNumber = this.currentPage;
    this.filter.pageSize = 7;
    let token = this.jwtDecoder.getToken();
    let id = 0;
    if(token!=null)
    {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
    }
    this.taskService.getAllUserAssignments(id, this.filter).subscribe(tasks => {
      this.updateTasks(tasks);
    });
  }
  
  updateTasks(tasks: Task[]) {
    tasks.forEach(task => {
      this.task_date_service.setDateParametersForTask(task);
    });
    this.router.navigate(['/tasks', this.currentPage]);
    this.filteredTasks = tasks;
  }

  fetchTasksForCurrentPage() {
    let token = this.jwtDecoder.getToken();
    let id = 0;
    if (token != null) {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
    }

    this.taskService.getAllUserAssignments(id, this.filter).subscribe(tasks => {
      this.tasks = tasks;
      this.tasks.forEach(task => {
        this.task_date_service.setDateParametersForTask(task);
      });
      this.filteredTasks = tasks.slice((this.currentPage - 1) * 7, this.currentPage * 7);
    });
  }

}
