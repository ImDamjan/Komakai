import { Component, EventEmitter, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterDetailsComponent } from '../filter-details/filter-details.component';
import { TaskFilter } from '../../models/task/task-filter';
import { SortDetailsComponent } from '../sort-details/sort-details.component';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})

export class TaskHeaderComponent implements OnInit {

  @Input() filter!: TaskFilter;

  // @ViewChild('Select') selectElement: HTMLSelectElement | undefined;

  private overlay = inject(MatDialog);

  private overlay2 = inject(MatDialog);

  projects : Project[] = [];

  selectedProjectId: number = 0;

  constructor(private projectService: ProjectService) { }

  searchValueChanged = new EventEmitter< { searchText: string }>();

  searchFilterChanged = new EventEmitter<{filter: TaskFilter}>();

  searchSortChanged = new EventEmitter<{filter: TaskFilter}>();

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjectsData().subscribe(projects => {
      this.projects = projects;
    });
  }

  onSearch(event: KeyboardEvent) {

    const searchText = (event.target as HTMLInputElement).value;
    this.searchValueChanged.emit({ searchText });

  }

  openFilterDialog() {
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.overlay.open(FilterDetailsComponent, {
      data:[this.filter]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // this.filter = result;
        if(result.project_id){
          this.filter.project_id=result.project_id;
        }
        if(result.stateFilter){
          this.filter.stateFilter=result.stateFilter;
        }
        if(result.priorityFilter){
          this.filter.priorityFilter=result.priorityFilter;
        }
        if(result.dateStartFlag){
          this.filter.dateStartFlag=result.dateStartFlag;
        }
        if(result.dateEndFlag){
          this.filter.dateEndFlag=result.dateEndFlag;
        }
        if(result.start){
          this.filter.start=result.start;
        }
        if(result.end){
          this.filter.end=result.end;
        }
        if(result.percentageFlag){
          this.filter.percentageFlag=result.percentageFlag;
        }
        if(result.percentageFilter){
          this.filter.percentageFilter=result.percentageFilter;
        }
        this.searchFilterChanged.emit({filter: this.filter})
      }
    });
  }

  openSortDialog(){
    const dialogRef = this.overlay2.open(SortDetailsComponent,{
      data:[this.filter]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        if(result.propertyName){
          this.filter.propertyName=result.propertyName;
        }
        if(result.sortFlag){
          this.filter.sortFlag=result.sortFlag;
        }
        this.searchSortChanged.emit({filter: this.filter})
      }
    });
  }

}
