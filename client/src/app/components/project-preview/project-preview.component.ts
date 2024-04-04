import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { Router } from '@angular/router';
import { StateService } from '../../services/state.service';
import { AssignmentService } from '../../services/assignment.service';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css']
})

export class ProjectPreviewComponent implements OnInit {
  
  isLoading: boolean = false;
  errorMessage: string = '';
  
  data: any;
  projectsData: any;

  // Properties for character limits
  titleCharacterLimit: number = 0;
  descriptionCharacterLimit: number = 0;

  // Properties for pagination
  cards: any[] = [];
  currentPage: number = 1;
  cardsPerPage: number = 8;

  constructor(private http: HttpClient, private projectService: ProjectService, private router: Router, private stateService: StateService, private assignmentService: AssignmentService) {
    // Initialize component
    this.calculateCharacterLimit();
  }

  ngOnInit(): void {
    // Detect changes in screen size for character limits
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', () => {
      this.calculateCharacterLimit();
      this.truncateText();
    });
    this.adjustCardsPerPage();
    window.addEventListener('resize', () => {
      this.adjustCardsPerPage(); // Call adjustCardsPerPage whenever the screen size changes
    });
    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    this.projectService.getProjectsData().subscribe(
      (projects: any[]) => {
        this.projectsData = projects;
        this.isLoading = false;
        projects.forEach(project => {
          project.truncatedTitle = this.truncate(project.title, this.titleCharacterLimit);
          project.truncatedDescription = this.truncate(project.description, this.descriptionCharacterLimit);

          // Fetch state name based on stateId using StateService
          this.stateService.fetchStateName(project.stateId).subscribe(
            (stateName: string) => {
              project.stateName = stateName;
            },
            (error) => {
              console.error('An error occurred while fetching state name:', error);
            }
          );

          this.assignmentService.getAssignmentsByProject(project.id).subscribe(
            (assignments: any[]) => {
              project.assignmentCount = assignments.length;
            },
            (error) => {
              console.error('An error occurred while fetching assignments for project:', project.id, error);
            }
          );

        });
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

  navigateToProjectDetails(projectId: number) {
    this.router.navigate(['projects','project-details',projectId]);
  }

  // Calculate character limits based on screen width
  calculateCharacterLimit() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.titleCharacterLimit = 5;
      this.descriptionCharacterLimit = 30;
    } else if (screenWidth >= 768 && screenWidth < 1025) {
      this.titleCharacterLimit = 10;
      this.descriptionCharacterLimit = 100;
    } else {
      this.titleCharacterLimit = 15;
      this.descriptionCharacterLimit = 190;
    }
  }

  // Truncate text to specified character limit
  truncateText() {
    this.projectsData.forEach((projectsData: { truncatedTitle: string; title: string; truncatedDescription: string; description: string; }) => {
      projectsData.truncatedTitle = this.truncate(projectsData.title, this.titleCharacterLimit);
      projectsData.truncatedDescription = this.truncate(projectsData.description, this.descriptionCharacterLimit);
    });
  }

  // Helper function to truncate text
  truncate(text: string, limit: number): string {
    if (text.length > limit) {
      return text.substring(0, limit) + '...';
    } else {
      return text;
    }
  }

  // Pagination functions

  // Get projects for the current page
  getPaginatedProjects(): any[] {
    if (!this.projectsData) {
      return [];
    }
    const startIndex = (this.currentPage - 1) * this.cardsPerPage;
    return this.projectsData.slice(startIndex, startIndex + this.cardsPerPage);
  }

  // Go to the next page
  nextPage(): void {
    if (this.currentPage < this.totalPages()) {
      this.currentPage++;
    }
  }

  // Go to the previous page
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  // Get the total number of pages
  totalPages(): number {
    if (!this.projectsData) {
      return 0;
    }
    return Math.ceil(this.projectsData.length / this.cardsPerPage);
  }

  // Calculate the pages to show in pagination control
  pagesToShow(): number[] {
    const total = this.totalPages();
    const current = this.currentPage;
    const pagesToShowCount = 3;
  
    let from = Math.max(1, current - Math.floor(pagesToShowCount / 2));
    let to = Math.min(total, from + pagesToShowCount - 1);
  
    if (to - from + 1 < pagesToShowCount) {
      if (current < Math.ceil(pagesToShowCount / 2)) {
        to = Math.min(total, pagesToShowCount);
      } else {
        from = Math.max(1, total - pagesToShowCount + 1);
      }
    }
  
    const pages: number[] = [];
    for (let i = from; i <= to; i++) {
      pages.push(i);
    }
    return pages;
  }
  
  // Method to navigate to a specific page
  goToPage(page: number): void {
    this.currentPage = page;
  }


  // Method to see if the pagination needs to move
  shouldShowBottomPagination(): boolean {
    return this.projectsData && this.projectsData.length > 0 && this.projectsData.length > this.cardsPerPage;
  }

  getTeamMemberImages(project: any): string[] {
    const mockImages = ['/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg', '/assets/project-task/person.svg'];
    return project && project.teamMemberImages ? mockImages.concat(project.teamMemberImages) : mockImages;
  }

  adjustCardsPerPage() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1800 && screenWidth > 1300) {
      this.cardsPerPage = 6;
    } else if(screenWidth < 1300 && screenWidth > 820){
      this.cardsPerPage = 4;
    }
    else if(screenWidth < 820 && screenWidth > 300){
      this.cardsPerPage = 2;
    }
    else
      this.cardsPerPage = 8;
  }
}
