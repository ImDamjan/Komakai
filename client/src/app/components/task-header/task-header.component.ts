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

  selectedProjectId: number = 0;

  constructor(private projectService: ProjectService) { }

  searchValueChanged = new EventEmitter< { searchText: string }>();

  searchProjectChanged = new EventEmitter<{searchText: string; projectId: number}>;

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

  async onSearch(event: KeyboardEvent) {

    // let searchText: string = '';
    // let selectedProjectId;

    // await this.fetchProjects(); 

    // if ('type' in event && event.type === 'keyup') {
    //   const searchValue = (event.target as HTMLInputElement).value;
    //   if(this.projects.length>0){
    //     console.log(this.projects)
    //     selectedProjectId = this.selectElement?.value;
    //     console.log(selectedProjectId);
    //   }
    //   this.searchValueChanged.emit({ searchText: searchValue });
    // } else if (event instanceof MouseEvent && event.type === 'click') {
    //   this.openFilterDialog();
    // }

    // if (searchText) {
    //   this.searchValueChanged.emit({ searchText, projectId: Number(selectedProjectId) });
    // }

    const searchText = (event.target as HTMLInputElement).value;
    // console.log((document.getElementById('search-field') as HTMLInputElement).value)
    const selectedProjectId = Number(this.selectElement?.value) || 0;
    // console.log(this.selectedProjectId)
    // console.log(searchText)
    this.searchProjectChanged.emit({ searchText,projectId: this.selectedProjectId});

  }

  onProjectChange(event: Event) {
    if (event instanceof Event && event.target instanceof HTMLSelectElement) {
      const selectedProjectId = Number((event.target as HTMLSelectElement).value);
      this.searchProjectChanged.emit({ searchText: this.searchInputValue, projectId: selectedProjectId });
    }

  }

  get searchInputValue(): string {
    return (document.getElementById('search-field') as HTMLInputElement).value;
  }

  openFilterDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = '400px';
    dialogConfig.height = '400px';

    this.overlay.open(FilterDetailsComponent, dialogConfig);
  }
}
