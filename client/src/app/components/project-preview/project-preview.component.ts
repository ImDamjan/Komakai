import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output, ViewChild, inject } from '@angular/core';
import { ProjectService } from '../../services/project.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { EditProjectOverlayComponent } from '../edit-project-overlay/edit-project-overlay.component';
import { Project } from '../../models/project/project';
import { ProjectFilter } from '../../models/project/project-filter';
import { ProjectsComponent } from '../../pages/projects/projects.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user.service';
import { ProjectFilterComponent } from '../project-filter/project-filter.component';
import { JwtDecoderService } from '../../services/jwt-decoder.service';

@Component({
  selector: 'app-project-preview',
  templateUrl: './project-preview.component.html',
  styleUrls: ['./project-preview.component.css']
})

export class ProjectPreviewComponent implements OnInit {

  // @Output() searchFilterChanged = new EventEmitter<ProjectFilter>();
  // @Output() searchSortChanged = new EventEmitter<ProjectFilter>();

  @ViewChild('projectHeader', { static: false }) projectHeaderComponent: ProjectsComponent | undefined;
  @ViewChild("filter_sort_project") projectFilters : ProjectFilterComponent | undefined;

  public filter: ProjectFilter = {
    propertyName : "Last Updated",
    sortFlag : -1,
    pageNumber: 1,
  };

  public desiredPage: number = 1;

  public currentPage: number = 1;

  isLastPage: boolean = false;

  private activatedRoute = inject(ActivatedRoute);

  private jwtDecoder = inject(JwtDecoderService);

  isClick = false;
  initialX: number | undefined;
  initialY: number | undefined;
  threshold = 1;
  
  isLoading: boolean = false;
  errorMessage: string = '';
  private spinner = inject(NgxSpinnerService);
  
  data: any;
  projectsData: Project[] = [];
  projectsDataOne: Project[] = [];
  users: User[] = [];
  profilePicturesLoaded = false;

  titleCharacterLimit: number = 0;
  descriptionCharacterLimit: number = 0;

  cards: any[] = [];
  cardsPerPage: number = 4;

  showProjectPreview: boolean = true;

  assignmentCounts: { [projectId: number]: number } = {};

  constructor(private http: HttpClient, private projectService: ProjectService, private router: Router, private assignmentService: AssignmentService, private dialog: MatDialog, private userService: UserService) {
    this.calculateCharacterLimit();
  }
  public isManager:boolean = false;
  public isUser : boolean = false;
  public isWorker : boolean = false;
  
  public jwt_service = inject(JwtDecoderService);
  getCreatedProject(createdProject: Project)
  {
    createdProject.truncatedTitle = this.truncate(createdProject.title, this.titleCharacterLimit);
    createdProject.truncatedDescription = this.truncate(createdProject.description, this.descriptionCharacterLimit);
    let projects : Project[] = [];
    projects.push(createdProject);
    this.projectsData.forEach(element=>{
      projects.push(element);
    });
    this.projectsData = projects;
    // console.log("Iz projekata:",createdProject);
    // window.location.reload()
  }
  ngOnInit(): void {
    let user = this.jwt_service.getLoggedUser();
    if(user!==null)
    {
      if(user.role==="Project Manager")
        this.isManager = true;
      else if(user.role==="User")
        this.isUser = true;
      else if(user.role==="Project Worker")
        this.isWorker = true;
    }


    this.projectService.getProjectsData().subscribe(
      (projects: Project[]) => {
        this.projectsDataOne = projects;
        this.projectsDataOne.forEach(project => {
          this.users = project.users;
          this.users.forEach(user => {
            this.userService.profilePicture(user.id).subscribe({
              next: (message: { profilePicture: string, type: string }) => {
                if(message.profilePicture)
                  user.profilePicture = `data:${message.type};base64,${message.profilePicture}`;
                else
                  user.profilePicture = "../../../assets/pictures/defaultpfp.svg";
              }, 
              error: (err) => {
                console.error('Error retrieving profile picture:', err);
              },
              complete: () => {
                this.profilePicturesLoaded = true;
              }
            });
          });
        });
        this.isLoading = false;
        this.spinner.hide();
        projects.forEach(project => {
          project.truncatedTitle = this.truncate(project.title, this.titleCharacterLimit);
          project.truncatedDescription = this.truncate(project.description, this.descriptionCharacterLimit);

          //NOTE: da se vrati uz projekte na beku
          // this.assignmentService.getAllProjectAssignments(project.id).subscribe(
          //   (assignments: any[]) => {
          //     this.assignmentCounts[project.id] = assignments.length;
              
          //   },
          //   (error) => {
          //     console.error('An error occurred while fetching assignments for project:', project.id, error);
          //   }
          // );

        });
        if (projects.length === 0) {
          this.spinner.hide();
          this.errorMessage = 'You don\'t have any projects yet.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.spinner.hide();
        this.errorMessage = 'An error occurred while fetching projects.';
      }
    );


    this.spinner.show();
    const mediaQuery = window.matchMedia('(max-width: 768px)');
    mediaQuery.addEventListener('change', () => {
      this.calculateCharacterLimit();
      this.truncateText();
    });
    this.adjustCardsPerPage();
    window.addEventListener('resize', () => {
      this.adjustCardsPerPage();
    });
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.has('pageNumber')) {
        this.currentPage = parseInt(params.get('pageNumber')!);
        this.filter.pageNumber = this.currentPage;
      }
      this.loadProjects();
    });
  }

  ngAfterViewInit() {
    this.projectHeaderComponent?.searchValueProjectChanged.subscribe(searchValue => {
      this.searchProjects(searchValue.searchText);
    });
    this.projectFilters?.searchFilterProjectChanged.subscribe(response=>{
      this.filterProjects(response.filter);
    });
    // this.projectHeaderComponent?.searchSortProjectChanged.subscribe(filter => {
    //   this.sortProjects(filter.filter);
    // });
  }

  searchProjects(searchText: string){
    this.filter.searchTitle=searchText;
    this.loadProjects();
  }

  filterProjects(filter: ProjectFilter){
    let text = "";
    if(this.filter.searchTitle)
      text = this.filter.searchTitle;
    this.filter = filter;
    this.filter.searchTitle = text;

    // console.log(this.filter);
    this.loadProjects();
  }

  sortProjects(filter: ProjectFilter){
    if(filter.propertyName){
      this.filter.propertyName=filter.propertyName;
    }
    if(filter.sortFlag){
      this.filter.sortFlag=filter.sortFlag;
    }

    this.loadProjects();
  }

  loadProjects() {
    this.isLoading = true;
    this.filter.pageSize = this.cardsPerPage;
    this.projectService.getProjectsData(this.filter).subscribe(
      (projects: Project[]) => {
        this.projectsData = projects;
        this.projectsData.forEach(project => {
          this.users = project.users;
          this.users.forEach(user => {
            this.userService.profilePicture(user.id).subscribe({
              next: (message: { profilePicture: string, type: string }) => {
                if(message.profilePicture)
                  user.profilePicture = `data:${message.type};base64,${message.profilePicture}`;
                else
                  user.profilePicture = "../../../assets/pictures/defaultpfp.svg";
              }, 
              error: (err) => {
                console.error('Error retrieving profile picture:', err);
              },
              complete: () => {
                this.profilePicturesLoaded = true;
              }
            });
          });
        });
        this.isLoading = false;
        this.spinner.hide();
        projects.forEach(project => {
          project.truncatedTitle = this.truncate(project.title, this.titleCharacterLimit);
          project.truncatedDescription = this.truncate(project.description, this.descriptionCharacterLimit);

          this.assignmentService.getAllProjectAssignments(project.id).subscribe(
            (assignments: any[]) => {
              this.assignmentCounts[project.id] = assignments.length;
              
            },
            (error) => {
              console.error('An error occurred while fetching assignments for project:', project.id, error);
            }
          );

        });
        if (projects.length === 0) {
          this.spinner.hide();
          this.errorMessage = 'You don\'t have any projects yet.';
        }
      },
      (error) => {
        this.isLoading = false;
        this.spinner.hide();
        this.errorMessage = 'An error occurred while fetching projects.';
      }
    );
  }

  getAssignmentCount(projectId: number): number {
    return this.assignmentCounts[projectId] || 0; // Return assignment count for the project, or 0 if not found
  }

  check(event: MouseEvent){
    this.isClick = true;
    this.initialX = event.clientX;
    this.initialY = event.clientY;
  }

  navigateToProjectDetails(event: MouseEvent,projectId: number) {

    let deltaX = event.clientX;
    let deltaY = event.clientY;

    if(this.initialX && this.initialY){
      deltaX = Math.abs(event.clientX - this.initialX);
      deltaY = Math.abs(event.clientY - this.initialY);
    }
    if (this.isClick && deltaX < this.threshold && deltaY < this.threshold){
      this.router.navigate(['projects','project-details',projectId]);
    }
    else{
      this.isClick = false;
    }
  }

  // Calculate character limits based on screen width
  calculateCharacterLimit() {
    const screenWidth = window.innerWidth;
    if (screenWidth < 768) {
      this.titleCharacterLimit = 12;
      this.descriptionCharacterLimit = 40;
    } else if (screenWidth >= 768 && screenWidth < 1025) {
      this.titleCharacterLimit = 15;
      this.descriptionCharacterLimit = 120;
    } else {
      this.titleCharacterLimit = 19;
      this.descriptionCharacterLimit = 210;
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
  // getPaginatedProjects(): any[] {
  //   if (!this.projectsData) {
  //     return [];
  //   }
  //   const startIndex = (this.currentPage - 1) * this.cardsPerPage;
  //   return this.projectsData.slice(startIndex, startIndex + this.cardsPerPage);
  // }

  // Go to the next page
  // nextPage(): void {
  //   if (this.currentPage < this.totalPages()) {
  //     this.currentPage++;
  //   }
  // }

  // // Go to the previous page
  // previousPage(): void {
  //   if (this.currentPage > 1) {
  //     this.currentPage--;
  //   }
  // }

  getPaginatedProjects(): any[] {
    if (!this.projectsData) {
      return [];
    }
    return this.projectsData;
  }

  previousPage(){
    if (this.currentPage > 1) {
      this.currentPage--;
      this.filter.pageNumber=this.currentPage;
      // this.loadProjects();
      this.router.navigate(['/projects', this.currentPage]);
      this.loadProjects();
    }
  }

  nextPage(){
    // console.log(this.projectsData.length)
    if(this.currentPage<this.getTotalPages()){
      this.currentPage++;
      this.filter.pageNumber=this.currentPage;
      this.router.navigate(['/projects', this.currentPage]);
      this.loadProjects();
    }
    this.updateIsLastPage();
  }

  // Get the total number of pages
  totalPages(): number {
    if (!this.projectsData) {
      return 0;
    }
    return Math.ceil(this.projectsData.length / this.cardsPerPage);
  }

  updateIsLastPage() {
    this.isLastPage = this.currentPage === this.getTotalPages();
  }

  fetchProjectsForCurrentPage() {
    let token = this.jwtDecoder.getToken();
    let id = 0;
    if (token != null) {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
      this.projectService.getProjectsData(this.filter).subscribe(projects => {
        
        this.projectsData = projects;
        this.projectsData.forEach(project => {
          project.truncatedTitle = this.truncate(project.title, this.titleCharacterLimit);
          project.truncatedDescription = this.truncate(project.description, this.descriptionCharacterLimit);
          this.users = project.users;
          this.users.forEach(user => {
            this.userService.profilePicture(user.id).subscribe({
              next: (message: { profilePicture: string, type: string }) => {
                if(message.profilePicture)
                  user.profilePicture = `data:${message.type};base64,${message.profilePicture}`;
                else
                  user.profilePicture = "../../../assets/pictures/defaultpfp.svg";
              }, 
              error: (err) => {
                console.error('Error retrieving profile picture:', err);
              },
              complete: () => {
                this.profilePicturesLoaded = true;
              }
            });
          });
        });
      });
    }
  }

  getTotalPages(): number {
    if (this.filter.pageSize) {
      return Math.ceil(this.projectsDataOne.length / this.filter.pageSize);
    } else {
      return 0;
    }
  }

  navigateToPage(pageNumber: number) {
    this.currentPage = pageNumber;
    this.filter.pageNumber = pageNumber;
    this.router.navigate(['/projects', pageNumber]);
    this.fetchProjectsForCurrentPage();
  }

  getDisplayedPageRange(currentPage: number, totalPages: number): number[] {
    const maxDisplayedPages = 3;
    let startPage = Math.max(1, currentPage - Math.floor(maxDisplayedPages / 2));
    const endPage = Math.min(totalPages, startPage + maxDisplayedPages - 1);
    startPage = Math.max(1, Math.min(startPage, endPage - maxDisplayedPages + 1));
    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i);
  }

  goToInputPage() {
    const pageNumber = Math.min(Math.max(this.desiredPage, 1), this.getTotalPages());
    this.currentPage = pageNumber;
    this.filter.pageNumber = pageNumber;
    if (pageNumber > this.getTotalPages()) {
      this.router.navigate(['/projects', this.getTotalPages()]);
    } else {
      this.router.navigate(['/projects', pageNumber]);
    }
    this.fetchProjectsForCurrentPage();
  }

  // Calculate the pages to show in pagination control
  // pagesToShow(): number[] {
  //   const total = this.totalPages();
  //   const current = this.currentPage;
  //   const pagesToShowCount = 3;
  
  //   let from = Math.max(1, current - Math.floor(pagesToShowCount / 2));
  //   let to = Math.min(total, from + pagesToShowCount - 1);
  
  //   if (to - from + 1 < pagesToShowCount) {
  //     if (current < Math.ceil(pagesToShowCount / 2)) {
  //       to = Math.min(total, pagesToShowCount);
  //     } else {
  //       from = Math.max(1, total - pagesToShowCount + 1);
  //     }
  //   }
  
  //   const pages: number[] = [];
  //   for (let i = from; i <= to; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // }
  
  // Method to navigate to a specific page
  goToPage(page: number): void {
    this.currentPage = page;
  }

  // Method to see if the pagination needs to move
  shouldShowBottomPagination(): boolean {
    return this.projectsData && this.projectsData.length > 0 && this.projectsData.length > this.cardsPerPage;
  }

  getTeamMemberImages(project: any): string[] {
    if (!project || !project.users) {
      return [];
    }

    const teamMemberImages: string[] = [];
    for (const user of project.users) {
      if (user.profile_picture) {
        teamMemberImages.push(user.profile_picture);
      } else {
        teamMemberImages.push("../../../assets/pictures/defaultpfp.svg");
      }
    }
    
    return teamMemberImages;
  }

  adjustCardsPerPage() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 1920 && screenWidth > 1630) {
      this.cardsPerPage = 3;
      this.loadProjects();
    } else if(screenWidth <= 1630 && screenWidth > 1371){
      this.cardsPerPage = 2;
      this.loadProjects();
    }
    else if(screenWidth <= 1371){
      this.cardsPerPage = 1;
      this.loadProjects();
    }
    else
      this.cardsPerPage = 4;
      this.loadProjects();
  }

  openEditOverlay(project: Project, event: Event): void {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      project: project
    };

    const dialogRef = this.dialog.open(EditProjectOverlayComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // When overlay is closed
      console.log("pozvan edit projekta");
      if(result!==undefined)
      {
        
        result.truncatedTitle = this.truncate(result.title, this.titleCharacterLimit);
        result.truncatedDescription = this.truncate(result.description, this.descriptionCharacterLimit);
        let ind = this.projectsData.findIndex(a=>a.id==result.id);
        this.projectsData.splice(ind,1,result);
      }
      this.showProjectPreview = true;
    });
    
    // this.showProjectPreview = false;
  }
}
