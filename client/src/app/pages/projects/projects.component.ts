import { Component, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectOverlayComponent } from '../../components/create-project-overlay/create-project-overlay.component';
import { ProjectFilter } from '../../models/project/project-filter';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  showProjectPreview: boolean = true;
  showCreateButton: boolean = true;
  projectText: string = 'Project list';

  constructor(private dialog: MatDialog) { }

  searchValueChanged = new EventEmitter< { searchText: string }>();

  searchFilterChanged = new EventEmitter<{filter: ProjectFilter}>();

  searchSortChanged = new EventEmitter<{filter: ProjectFilter}>();

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
    this.searchValueChanged.emit({ searchText });
  }

  openFilterDialog(){

  }

  openSortDialog(){

  }

}