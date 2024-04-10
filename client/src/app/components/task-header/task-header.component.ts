import { Component, EventEmitter, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})
export class TaskHeaderComponent implements OnInit {
  projects : Project[] = [];

  constructor(private projectService: ProjectService) { }

  searchValueChanged = new EventEmitter<string>();

  ngOnInit(): void {
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjectsData().subscribe(projects => {
      this.projects = projects;
    });
  }

  onSearch(event: KeyboardEvent) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.searchValueChanged.emit(searchValue);
    // console.log('Search value:', searchValue);
  }
}
