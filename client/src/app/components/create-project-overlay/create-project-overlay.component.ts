import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { StateService } from '../../services/state.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent implements OnInit {
  users: any[] | undefined;
  states: any[] | undefined;
  showDropdown: boolean = false;

  projectObj!: Project;

  selectedUserIds: string[] = [];
  constructor(private dialogRef: MatDialogRef<CreateProjectOverlayComponent>, private userService: UserService, private stateService: StateService, private projectService: ProjectService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.stateService.getStates().subscribe(states => {
      this.states = states;
    });
    this.projectObj = {
      userIds: [],
      priorityId: 0,
      title: "", 
      start: this.getCurrentDate(), 
      end: this.getCurrentDate(),
      budget: 0, 
      description: "", 
      type: "" 
    };
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onUserSelected(userId: string): void {
    // Handle user selection
    if (this.isSelected(userId)) {
        this.selectedUserIds = this.selectedUserIds.filter(id => id !== userId);
    } else {
        this.selectedUserIds.push(userId);
    }
  }

  isSelected(userId: string): boolean {
    // Check if user is selected
    return this.selectedUserIds.includes(userId);
  }

  toggleUserSelection(userId: string): void {
      // Toggle user selection when clicking on the option
      this.onUserSelected(userId);
  }

  closeOverlay(): void {
      // Close the overlay dialog
      this.dialogRef.close();
  }

  createProject(): void {
    this.projectObj.userIds = this.selectedUserIds;
  
    this.projectService.createProject(this.projectObj).subscribe(response => {
      // Handle success response
      console.log('Project created successfully:', response);
    }, error => {
      // Handle error response
      console.error('Error creating project:', error);
    });
  }

  getCurrentDate(): string {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // Months are zero-based
    const day = ('0' + currentDate.getDate()).slice(-2);
    const hours = ('0' + currentDate.getHours()).slice(-2);
    const minutes = ('0' + currentDate.getMinutes()).slice(-2);
    const seconds = ('0' + currentDate.getSeconds()).slice(-2);
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.000Z`;
  }
}
