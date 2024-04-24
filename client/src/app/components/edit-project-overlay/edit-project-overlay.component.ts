import { Component, Inject, inject} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';
import { PriorityService } from '../../services/priority.service';
import { TeamService } from '../../services/team.service';
import { User } from '../../models/user/user';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { State } from '../../models/state/state';
import { StateService } from '../../services/state.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-project-overlay',
  templateUrl: './edit-project-overlay.component.html',
  styleUrl: './edit-project-overlay.component.css'
})
export class EditProjectOverlayComponent {
  users: User[] = [];
  priorities: any[] | undefined;
  teams: any[] = [];
  states: State[] = [];

  showDropdown: boolean = false;
  hoveredTeam: any;
  submitted = false;
  submissionError: string | null = null;

  project!: Project;

  selectedUserIds: User[] = [];
  selectedPriorityId!: number;

  disabled = false;
  max = 100;
  min = 0;
  showTicks = false;
  step = 1;
  thumbLabel = false;
  value = 0;
  private spinner = inject(NgxSpinnerService);
  constructor(private dialogRef: MatDialogRef<EditProjectOverlayComponent>, private userService: UserService, private projectService: ProjectService, private priorityService: PriorityService, private teamService: TeamService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private stateService: StateService) 
  {
    this.project = data.project;
    console.log(this.project);
    this.selectedUserIds = this.project.users;
  }

  ngOnInit(): void {
    this.spinner.show();
    this.userService.getUsers().subscribe(users => {
      this.spinner.hide();
      this.users = users;
    });
    this.priorityService.getPriorities().subscribe(priorities => {
      this.priorities = priorities;
    });
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
    this.stateService.fetchAllStates().subscribe(states => {
      this.states = states;
    })
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onUserSelected(userId: number): void {
    // Handle user selection
    const user = this.users.find(user => user.id === userId);
    if (user) {
        if (this.isSelected(userId)) {
            this.selectedUserIds = this.selectedUserIds.filter(selectedUser => selectedUser.id !== userId);
        } else {
            this.selectedUserIds.push(user);
        }
    }
}

  isSelected(userId: number): boolean {
    // Check if user is selected
    return this.selectedUserIds.some(user => user.id === userId);
  }

  toggleUserSelection(userId: number, event: Event): void {
    event.stopPropagation();
    const userIndex = this.selectedUserIds.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        // User is already selected, remove them
        this.selectedUserIds.splice(userIndex, 1);
    } else {
        // User is not selected, add them
        const user = this.users.find(user => user.id === userId);
        if (user) {
            this.selectedUserIds.push(user);
        }
    }
  }

  closeOverlay(): void {
      // Close the overlay dialog
      this.dialogRef.close();
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
      this.selectedUserIds = this.selectedUserIds.filter(user => !team.members.find((member: User) => member.id === user.id));
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

  formatDate(date: Date | string): string {
    if (!date) return '';
  
    if (typeof date === 'string') return date.split('T')[0];
  
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
  editProject(projectId: Number): void {
    this.project.users = this.selectedUserIds;
    this.submitted = true;
    this.submissionError = null;

    if (!this.project.title.trim() || !this.project.priority || !this.project.start || !this.project.end) {
      this.submissionError = 'Please fill in all necessary fields.';
      return;
    }

    this.projectService.updateProject(this.project.id, this.project).subscribe(response => {
      alert('Project edited successfully!');
      this.submitted = false;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/projects']);
      });
    }, error => {
      this.submissionError = 'Error editing project. Please try again.';
    });
  }
}
