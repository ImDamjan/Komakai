import { Component, EventEmitter, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterDetailsComponent } from '../filter-details/filter-details.component';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})
export class TaskHeaderComponent implements OnInit {

  private overlay = inject(MatDialog);

  projects : Project[] = [];

  constructor(private projectService: ProjectService) { }

  searchValueChanged = new EventEmitter< { searchText: string; projectId?: string }>();

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjectsData().subscribe(projects => {
      this.projects = projects;
    });
  }

  ngAfterViewInit(){
    console.log(this.projects)
  }

  isButtonElement(target: EventTarget): target is HTMLElement {
    return target instanceof HTMLElement;
  }

  onSearch(event: KeyboardEvent) {

    let searchText: string ='';
    let selectedProjectId: string | undefined;
    
    if ('type' in event && event.type === 'keyup') { // Check for keyboard event (search)
      const searchValue = (event.target as HTMLInputElement).value;
      this.searchValueChanged.emit( {searchText: searchValue});
    } else if (event instanceof MouseEvent && event.type === 'click') { // Check for click event (filter)
      this.openFilterDialog();
    }else if (event instanceof Event && event.target instanceof HTMLSelectElement) { // Check for project selection change
      selectedProjectId = (event.target as HTMLSelectElement).value;
    }

    if (searchText || selectedProjectId) {
      this.searchValueChanged.emit({ searchText, projectId: selectedProjectId });
    }
  }

  openFilterDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = '400px';

    this.overlay.open(FilterDetailsComponent, dialogConfig);
  }
}
