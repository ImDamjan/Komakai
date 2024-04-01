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
    this.projectObj = {
      userIds: this.selectedUserIds,
      priorityId: 0, // Update with your priority logic
      title: "string", // Make sure to bind the project title to this variable
      start: "2024-04-01T00:03:42.241Z", // Bind start date variable
      end: "2026-04-01T00:03:42.241Z", // Bind end date variable
      budget: 0, // Bind budget variable
      description: "string", // Bind project description variable
      type: "string"// Bind project type variable
    };
  
    this.projectService.createProject(this.projectObj).subscribe(response => {
      // Handle success response
      console.log('Project created successfully:', response);
    }, error => {
      // Handle error response
      console.error('Error creating project:', error);
    });
  }
}
