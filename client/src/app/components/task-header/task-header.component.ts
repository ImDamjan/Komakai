import { Component, EventEmitter, Input, OnInit, ViewChild, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { FilterDetailsComponent } from '../filter-details/filter-details.component';
import { TaskFilter } from '../../models/task/task-filter';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})

export class TaskHeaderComponent implements OnInit {

  @Input() filter!: TaskFilter;

  @ViewChild('Select') selectElement: HTMLSelectElement | undefined;

  private overlay = inject(MatDialog);

  projects : Project[] = [];

  selectedProjectId: number = 0;

  constructor(private projectService: ProjectService) { }

  searchValueChanged = new EventEmitter< { searchText: string }>();

  searchFilterChanged = new EventEmitter<{filter: TaskFilter}>();

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
    //const selectedProjectId = Number(this.selectElement?.value) || 0;
    // console.log(this.selectedProjectId)
    // console.log(searchText)
    this.searchValueChanged.emit({ searchText });

  }

  // onProjectChange(event: Event) {
  //   if (event instanceof Event && event.target instanceof HTMLSelectElement) {
  //     const selectedProjectId = Number((event.target as HTMLSelectElement).value);
  //     this.searchProjectChanged.emit({ searchText: this.searchInputValue, projectId: selectedProjectId });
  //   }

  // }

  // get searchInputValue(): string {
  //   return (document.getElementById('search-field') as HTMLInputElement).value;
  // }

  openFilterDialog() {
    const dialogConfig = new MatDialogConfig();

    // dialogConfig.width = '400px';
    // dialogConfig.height = '400px';

    const dialogRef = this.overlay.open(FilterDetailsComponent, {
      data:[this.filter]
    });

    dialogRef.afterClosed().subscribe(result => {
      this.filter = result;
      this.searchFilterChanged.emit({filter: this.filter})
    });
  }
}
