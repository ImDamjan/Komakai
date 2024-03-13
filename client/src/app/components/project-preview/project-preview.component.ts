import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrl: './project-preview.component.css'
})
export class ProjectPreviewComponent implements OnInit{

  projects: any[] = [];
  isLoading: boolean = false;
  errorMessage: string = '';
  
  data: any;
  projectsData: any;

  constructor(private http: HttpClient, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.projectService.setUserId(2);
    this.projectService.getProjectsData().subscribe(data => {
      this.projectsData = data;
    });
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    this.projectService.getProjectsData().subscribe(
      (projects: any[]) => {
        this.projects = projects;
        this.isLoading = false;
        if (projects.length === 0) {
          this.errorMessage = 'You don\'t have any projects yet.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = 'An error occurred while fetching projects.';
      }
    );
  }
}
