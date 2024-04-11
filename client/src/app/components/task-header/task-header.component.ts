import { Component, EventEmitter, OnInit, ViewChild, inject } from '@angular/core';
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

  @ViewChild('Select') selectElement: HTMLSelectElement | undefined;

  private overlay = inject(MatDialog);

  projects : Project[] = [];

  constructor(private projectService: ProjectService) { }

  searchValueChanged = new EventEmitter< { searchText: string; projectId?: number }>();

  searchProjectChanged = new EventEmitter<{projectId: number}>;

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
    let selectedProjectId;
    
    if ('type' in event && event.type === 'keyup') {
      const searchValue = (event.target as HTMLInputElement).value;
      this.searchValueChanged.emit( {searchText: searchValue});
    } else if (event instanceof MouseEvent && event.type === 'click') {
      this.openFilterDialog();
    }

    if (searchText && selectedProjectId) {
      this.searchValueChanged.emit({ searchText, projectId: Number(selectedProjectId) });
    }
  }

  onProjectChange(event: Event) {
    if (event instanceof Event && event.target instanceof HTMLSelectElement) {
      const selectedProjectId = Number((event.target as HTMLSelectElement).value); // Convert to number
      this.searchProjectChanged.emit({ projectId: selectedProjectId });
      return selectedProjectId;
    }
    return 0;

  }

  openFilterDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = '400px';

    this.overlay.open(FilterDetailsComponent, dialogConfig);
  }
}
