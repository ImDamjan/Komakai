import { Component, EventEmitter, OnInit, ViewChild, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';
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

  selectedProjectId: number = 0;

  constructor(private projectService: ProjectService) { }

  searchValueChanged = new EventEmitter< { searchText: string }>();

  searchProjectChanged = new EventEmitter<{searchText: string;}>;

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjectsData().subscribe(projects => {
      this.projects = projects;
      // console.log(this.projects)
    });
  }

  // ngAfterViewInit(){
  //   this.fetchProjects();
  // }

  isButtonElement(target: EventTarget): target is HTMLElement {
    return target instanceof HTMLElement;
  }

  onSearch(event: KeyboardEvent) {

    const searchText = (event.target as HTMLInputElement).value;
    // console.log((document.getElementById('search-field') as HTMLInputElement).value)
    const selectedProjectId = Number(this.selectElement?.value) || 0;
    // console.log(this.selectedProjectId)
    // console.log(searchText)
    this.searchProjectChanged.emit({ searchText});

  }

  // onProjectChange(event: Event) {
  //   if (event instanceof Event && event.target instanceof HTMLSelectElement) {
  //     const selectedProjectId = Number((event.target as HTMLSelectElement).value);
  //     this.searchProjectChanged.emit({ searchText: this.searchInputValue, projectId: selectedProjectId });
  //   }

  // }

  get searchInputValue(): string {
    return (document.getElementById('search-field') as HTMLInputElement).value;
  }

  openFilterDialog() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.width = '400px';
    // dialogConfig.height = '400px';

    this.overlay.open(FilterDetailsComponent, dialogConfig);
  }
}
