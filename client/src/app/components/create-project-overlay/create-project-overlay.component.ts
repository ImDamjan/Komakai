import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';
import { PriorityService } from '../../services/priority.service';
import { TeamService } from '../../services/team.service';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent implements OnInit {
  users: any[] = [];
  priorities: any[] | undefined;
  teams: any[] = [];
  showDropdown: boolean = false;
  hoveredTeam: any;

  projectObj!: Project;

  selectedUserIds: string[] = [];
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
    this.projectObj.priorityId = this.selectedPriorityId;
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

  showTeamMembers(team: any): void {
    console.log(team.members);
    this.hoveredTeam = team; // Set the hovered team
  }

  hideTeamMembers(event: MouseEvent): void {
    const target = event.relatedTarget as HTMLElement;

    // Check if the mouse is moving from the overlay to the team members
    if (target && target.closest('.team-option') === null && target.closest('.team-members') === null) {
        this.hoveredTeam = null; // Reset the hovered team
    }
  }

  getUserName(memberId: string): string {
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
        this.selectedUserIds = this.selectedUserIds.filter((id: string) => !team.members.includes(id));
    } else {
        // If team is not selected, select it and its members
        this.selectedUserIds = [...this.selectedUserIds, ...team.members];
    }
  }

  isSelectedTeam(teamId: string): boolean {
      // Check if all members of the team are selected
      const team = this.teams.find((team: any) => team.id === teamId);
      if (team) {
          return team.members.every((memberId: string) => this.isSelected(memberId));
      }
      return false;
  }


}
