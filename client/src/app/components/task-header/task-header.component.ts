import { Component, OnInit, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-task-header',
  templateUrl: './task-header.component.html',
  styleUrl: './task-header.component.css'
})
export class TaskHeaderComponent implements OnInit {
  projects : Project[] = [];
  private spinner = inject(NgxSpinnerService);
  constructor(private projectService: ProjectService) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fetchProjects();
  }

  fetchProjects(): void {
    this.projectService.getProjectsData().subscribe(projects => {
      this.projects = projects;
      this.spinner.hide();
    });
  }
}
