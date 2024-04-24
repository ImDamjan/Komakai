import { Component, EventEmitter, Input, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateProjectOverlayComponent } from '../../components/create-project-overlay/create-project-overlay.component';
import { ProjectFilter } from '../../models/project/project-filter';
import { FilterProjectComponent } from '../../components/filter-project/filter-project.component';
import { SortProjectComponent } from '../../components/sort-project/sort-project.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  @Input() filter!: ProjectFilter;
  showProjectPreview: boolean = true;
  showCreateButton: boolean = true;
  projectText: string = 'Project list';

  constructor(private dialog: MatDialog) { }

  searchValueProjectChanged = new EventEmitter< { searchText: string }>();

  searchFilterProjectChanged = new EventEmitter<{filter: ProjectFilter}>();

  searchSortProjectChanged = new EventEmitter<{filter: ProjectFilter}>();

  private overlay = inject(MatDialog);

  private overlay2 = inject(MatDialog);

  openCreateOverlay(): void {
    const dialogRef = this.dialog.open(CreateProjectOverlayComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showProjectPreview = true;
      this.showCreateButton = true;
      this.projectText = 'Project list';
    });
    
    this.showProjectPreview = false;
    this.showCreateButton = false;
    this.projectText = 'Project list/Create project';
  }

  onSearch(event: KeyboardEvent){
    const searchText = (event.target as HTMLInputElement).value;
    this.searchValueProjectChanged.emit({ searchText });
  }

  openFilterDialog(){
    const dialogConfig = new MatDialogConfig();

    const dialogRef = this.overlay.open(FilterProjectComponent, {
      data:[this.filter]
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

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
        this.searchFilterProjectChanged.emit({filter: this.filter})
      }
    });
  }

  openSortDialog(){
    const dialogRef = this.overlay2.open(SortProjectComponent,{
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
        this.searchSortProjectChanged.emit({filter: this.filter})
      }
    });
  }

}