import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { PriorityService } from '../../services/priority.service';
import { TeamService } from '../../services/team.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent implements OnInit {
  users: User[] = [];
  priorities: any[] | undefined;
  teams: any[] = [];
  showDropdown: boolean = false;
  hoveredTeam: any;
  submitted = false;
  submissionError: string | null = null;

  projectObj!: Project;

  selectedUserIds: number[] = [];
  selectedPriorityId!: number;
  constructor(private dialogRef: MatDialogRef<CreateProjectOverlayComponent>, private userService: UserService, private projectService: ProjectService, private priorityService: PriorityService, private teamService: TeamService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
    this.priorityService.getPriorities().subscribe(priorities => {
      this.priorities = priorities;
    });
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
    this.projectObj = {
      id: 0,
      stateId: 0,
      spent: 0,
      percentage: 0,
      userIds: [],
      priorityId: this.selectedPriorityId,
      title: "", 
      start: new Date(), 
      end: new Date(),
      budget: 0, 
      description: "", 
      type: "",
    };
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onUserSelected(userId: number): void {
    // Handle user selection
    if (this.isSelected(userId)) {
        this.selectedUserIds = this.selectedUserIds.filter(id => id !== userId);
    } else {
        this.selectedUserIds.push(userId);
    }
}

  isSelected(userId: number): boolean {
    // Check if user is selected
    return this.selectedUserIds.includes(userId);
  }

  toggleUserSelection(userId: number, event: Event): void {
    event.stopPropagation();
    if (this.isSelected(userId)) {
        this.selectedUserIds = this.selectedUserIds.filter(id => id !== userId);
    } else {
        this.selectedUserIds.push(userId);
    }
  }


  closeOverlay(): void {
      // Close the overlay dialog
      this.dialogRef.close();
  }

  createProject(): void {
    this.projectObj.userIds = this.selectedUserIds;
    this.projectObj.priorityId = this.selectedPriorityId;
    this.submitted = true;
    this.submissionError = null;

    if (!this.projectObj.title.trim() || !this.projectObj.priorityId || !this.projectObj.start || !this.projectObj.end) {
      this.submissionError = 'Please fill in all necessary fields.';
      return;
    }

    this.projectService.createProject(this.projectObj).subscribe(response => {
      console.log('Project created successfully:', response);
      alert('Project created successfully!');
      this.resetForm();
      this.submitted = false;
    }, error => {
      console.error('Error creating project:', error);
      this.submissionError = 'Error creating project. Please try again.';
    });
  }

  resetForm(): void {
    // Reset all input fields to their default state
    this.projectObj.title = '';
    this.projectObj.priorityId = 0;
    this.projectObj.start = new Date();
    this.projectObj.end = new Date();
    this.projectObj.userIds = [];
    this.selectedUserIds = [];
    this.selectedPriorityId = 0;
    this.projectObj.budget = 0;
    this.projectObj.description = '';
    this.projectObj.type = '';
  }

  showTeamMembers(team: any): void {
    this.hoveredTeam = team; // Set the hovered team
  }

  hideTeamMembers(event: MouseEvent): void {
    const target = event.relatedTarget as HTMLElement;

    // Check if the mouse is moving from the overlay to the team members
    if (target && target.closest('.team-option') === null && target.closest('.team-members') === null) {
        this.hoveredTeam = null; // Reset the hovered team
    }
  }

  getUserName(memberId: number): string {
    const user = this.users.find(user => user.id === memberId);
    if (user) {
        return `${user.name} ${user.lastname}`;
    } else {
        return ''; // Handle the case where user is not found
    }
  }

  onTeamSelected(team: any): void {
    if (this.isSelectedTeam(team.id)) {
        // If team is already selected, deselect it and its members
        this.selectedUserIds = this.selectedUserIds.filter((id: number) => !team.members.includes(id));
    } else {
        // If team is not selected, select it and its members
        this.selectedUserIds = [...this.selectedUserIds, ...team.members];
    }
  }

  isSelectedTeam(teamId: number): boolean {
      // Check if all members of the team are selected
      const team = this.teams.find((team: any) => team.id === teamId);
      if (team) {
          return team.members.every((memberId: number) => this.isSelected(memberId));
      }
      return false;
  }
}
