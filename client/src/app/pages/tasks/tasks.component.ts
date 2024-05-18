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
import { TaskFilterComponent } from '../../components/task-filter/task-filter.component';

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
  @ViewChild('taskFilter') taskFilterComponent: TaskFilterComponent | undefined;
  filteredTasks: Task[] = [];

  tasks: Task[] = [];

  public desiredPage: number = 1;

  isLastPage: boolean = false;

  private task_date_service = inject(DateConverterService);

  public currentPage: number = 1;

  private router = inject(Router);

  private activatedRoute = inject(ActivatedRoute);

  public filter: TaskFilter = {
    propertyName : "Last Updated",
    sortFlag : -1,
    pageNumber: 1
  };

  private jwtDecoder = inject(JwtDecoderService);
  remainingTimeSubscriptions: Subscription[] = [];

  constructor(private taskService: AssignmentService) { }

  ngOnDestroy(): void {
    this.remainingTimeSubscriptions.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    // let token = this.jwtDecoder.getToken();
    // let id = 0;
    // if(token!=null)
    // {
    //   let decode = this.jwtDecoder.decodeToken(token);
    //   id = decode.user_id;
    // }
    // this.filter.pageNumber = 1;
    // this.filter.pageSize = 7;
    // this.taskService.getAllUserAssignments(id,this.filter).subscribe(tasks => {
    //     tasks.forEach(task => {
    //       this.task_date_service.setDateParametersForTask(task);
    //     });
    //     this.filteredTasks = tasks;
    // });

    let token = this.jwtDecoder.getToken();
    let id = 0;
    if(token!=null)
    {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
      this.taskService.getAllUserAssignments(id,this.filter).subscribe(tasks => {
      tasks.forEach(task => {
        this.task_date_service.setDateParametersForTask(task);
      });
      this.tasks = tasks;
    })};

    this.filter.pageSize=6;

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
      this.filter.searchTitle = searchValue.searchText;
      this.loadTasks();
    });
    this.taskFilterComponent?.filterEmiter.subscribe(filter=>{
      let text = "";
      if(this.filter.searchTitle)
        text = this.filter.searchTitle
      this.filter = filter;
      this.filter.searchTitle = text;
      this.loadTasks();
    });
  }


  loadTasks(){

    let token = this.jwtDecoder.getToken();
    let id = 0;
    if(token!=null)
    {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
      this.taskService.getAllUserAssignments(id,this.filter).subscribe(tasks => {
      tasks.forEach(task => {
        this.task_date_service.setDateParametersForTask(task);
      });
      this.filteredTasks = tasks;
    });
  }}

  filterTasks(filter: TaskFilter){

    let collectedTasks: Task[] = [];

    this.filter.pageNumber = this.currentPage;
    this.filter.pageSize = 6;

    if(filter.projects){
      this.filter.projects=filter.projects;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filter.pageNumber = this.currentPage;
      this.router.navigate(['/tasks', this.currentPage]);
      this.fetchTasksForCurrentPage();
    }
  }
  
  nextPage() {
    console.log(this.getTotalPages())
    if(this.currentPage < this.getTotalPages()){
      this.currentPage++;
      this.filter.pageNumber = this.currentPage;
      this.router.navigate(['/tasks', this.currentPage]);
      this.fetchTasksForCurrentPage();
    }
    this.updateIsLastPage();
  }

  updateIsLastPage() {
    this.isLastPage = this.currentPage === this.getTotalPages();
  }

  fetchTasksForCurrentPage() {
    let token = this.jwtDecoder.getToken();
    let id = 0;
    if (token != null) {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
      this.taskService.getAllUserAssignments(id, this.filter).subscribe(tasks => {
        tasks.forEach(task => {
          this.task_date_service.setDateParametersForTask(task);
        });
        this.filteredTasks = tasks;
      });
    }
  }

  getTotalPages(): number {
    if (this.filter.pageSize) {
      console.log(this.filteredTasks.length)
      return Math.ceil(this.tasks.length / this.filter.pageSize);
    } else {
      return 0;
    }
  }

  navigateToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.filter.pageNumber = pageNumber;
    this.router.navigate(['/tasks', pageNumber]);
    this.fetchTasksForCurrentPage();
  }

  getDisplayedPageRange(currentPage: number, totalPages: number): number[] {
    const maxDisplayedPages = 3; // Number of pages to display at a time
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);
    startPage = Math.max(1, Math.min(startPage, endPage - maxDisplayedPages + 1));
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  goToInputPage() {
    const pageNumber = Math.min(Math.max(this.desiredPage, 1), this.getTotalPages()); // Clamp input value
    this.currentPage = pageNumber;
    this.filter.pageNumber = pageNumber;
    if (pageNumber > this.getTotalPages()) {
      this.router.navigate(['/tasks', this.getTotalPages()]); // Go to last page if invalid
    } else {
      this.router.navigate(['/tasks', pageNumber]);
    }
    this.fetchTasksForCurrentPage();
  }

  // getTotalPages(): number {
  //   if(this.filter.pageSize){
  //     console.log(this.filter.pageSize)
  //     return Math.ceil(this.tasks.length / this.filter.pageSize);
  //   }
  //   else
  //     return 0;
  // }

  constructFilterQueryString(): any {
    let queryString: TaskFilter = {};
    if (this.filter.searchTitle) {
      queryString['searchTitle'] = this.filter.searchTitle;
    }
    if(this.filter.stateFilter){
      queryString['stateFilter'] = this.filter.stateFilter;
    }
    return queryString;
  }

}
