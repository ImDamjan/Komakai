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
import { Role } from '../../models/role';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { RoleService } from '../../services/role.service';
import { Team } from '../../models/team';
import { UpdateProject } from '../../models/project/update-project';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-edit-project-overlay',
  templateUrl: './edit-project-overlay.component.html',
  styleUrl: './edit-project-overlay.component.css'
})
export class EditProjectOverlayComponent {
  private jwtService = inject(JwtDecoderService);
  private roleService = inject(RoleService);
  loggedInUserId: number | null = null;
  fullname!: string;
  roleid!: number;
  
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

  roles: Role[] = [];
  selectedUserRolesMap : Map<number,number> = new Map<number,number>();
  userRoles: Map<number, number> = new Map<number, number>();
  defaultRoles: Map<number, number> = new Map<number, number>();
  private spinner = inject(NgxSpinnerService);

  searchQuery: string = '';
  selectedUsers: User[] = [];

  constructor(private dialogRef: MatDialogRef<EditProjectOverlayComponent>, private userService: UserService, private projectService: ProjectService, private priorityService: PriorityService, private teamService: TeamService, @Inject(MAT_DIALOG_DATA) public data: any, private router: Router, private stateService: StateService) 
  {
    this.project = data.project;
    this.selectedUserIds = this.project.users;
  }

  ngOnInit(): void {
    let token = this.jwtService.getToken();
        if (token != null) {
            let decode = this.jwtService.decodeToken(token);
            this.loggedInUserId = decode.user_id;
            this.roleid = decode.role_id;
            this.fullname = decode.fullname;
        }
    this.roleService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
    this.spinner.show();
    this.userService.getUsers().subscribe(users => {
      this.spinner.hide();
      this.users = users;

      this.users.forEach(user => {
        this.userRoles.set(user.id, user.role.id);
        this.defaultRoles = this.userRoles;
      });

      this.project.users.forEach(user => {
        const roleId = user.role.id;
        this.selectedUserRolesMap.set(user.id, roleId);
      });
    });
    this.priorityService.getPriorities().subscribe(priorities => {
      this.priorities = priorities;
    });
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
    this.stateService.fetchAllStates().subscribe(states => {
      this.states = states;
    });
    this.selectedUsers = this.project.users;
  }

  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onUserSelected(user: User, event: any): void {
    event.stopPropagation();
    const target = event.target;
    if (target && target.value !== undefined) {
      const selectedRoleId = event.target?.value;
      // Handle user selection
      if (this.isSelected(user)) {
          this.selectedUserRolesMap.delete(user.id);
          // this.selectedUserIds = this.selectedUserIds.filter(id => id !== user.id);
      } else {
          // this.selectedUserIds.push(user.id);
          this.selectedUserRolesMap.set(user.id,selectedRoleId);
      }
    }
  }

  isSelected(user: User): boolean {
    // Check if user is selected
    if(user.id == this.roleid)
      return true;
    // return this.selectedUserIds.includes(user.id);
    return this.selectedUserRolesMap.has(user.id);
  }

  toggleUserSelection(user: User): void {
    const selectedRoleId = this.userRoles.get(user.id);
    if (this.isSelected(user)) {
        this.selectedUserRolesMap.delete(user.id);
        this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.id !== user.id);
    } else {
        this.selectedUserRolesMap.set(user.id, selectedRoleId!);
        this.selectedUsers.push(user);
    }
  }

  onRoleChanged(user: User, event: any) {
    const selectedRoleId = event.target.value;
    this.userRoles.set(user.id,selectedRoleId);

    if(this.isSelected(user))
      this.selectedUserRolesMap.set(user.id,selectedRoleId);
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

  onTeamSelected(team: Team): void {
    let team_member_ids: User[] = [];
    team.members.forEach(member => {
        team_member_ids.push(member);
    });
    if (this.isSelectedTeam(team.id)) {
        team_member_ids.forEach(member => {
            if (member.id != this.loggedInUserId) {
                this.selectedUserRolesMap.delete(member.id);
                this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.id !== member.id);
            }
        });
    } else {
        team_member_ids.forEach(member => {
            if (member.id != this.loggedInUserId) {
                const selectedRoleId = this.userRoles.get(member.id);
                if (!this.isSelected(member)) {
                    this.selectedUserRolesMap.set(member.id, selectedRoleId!);
                    this.selectedUsers.push(member);
                }
            }
        });
    }
  }

  isSelectedTeam(teamId: number): boolean {
      // Check if all members of the team are selected
      const team = this.teams.find((team: Team) => team.id === teamId);
      if (team) {
          return team.members.every((member: User) => this.isSelected(member));
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
  
  editProject(projectId: number): void {
    let selected_users : number[] = [];
    let selected_roles : number[] = [];
    this.selectedUserRolesMap.forEach((value,key) => {
      selected_roles.push(value);
      selected_users.push(key);
    });

    const updateProjectData: UpdateProject = {
      members: selected_users,
      projectRoles: selected_roles,
      title: this.project.title,
      stateId: this.project.state.id,
      priorityId: this.project.priority.id,
      description: this.project.description,
      start: this.project.start,
      end: this.project.end,
      spent: this.project.spent,
      percentage: this.project.percentage
    };
    
    this.submitted = true;
    this.submissionError = null;

    if (!this.project.title.trim() || !this.project.priority || !this.project.start || !this.project.end) {
      this.submissionError = 'Please fill in all necessary fields.';
      return;
    }

    if (!updateProjectData.title.trim() || !updateProjectData.priorityId || !updateProjectData.start || !updateProjectData.end) {
      this.submissionError = 'Please fill in all necessary fields.';
      return;
    }

    this.projectService.updateProject(projectId, updateProjectData).subscribe(response => {
      alert('Project edited successfully!');
      this.submitted = false;

      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/projects']);
      });
    }, error => {
      this.submissionError = 'Error editing project. Please try again.';
    });
  }

  getRolesForUser(user: User): Role[] {
    return this.roles.filter(role => role.authority >= user.role.authority);
  }

  get filteredUsers(): any[] {
    return this.users.filter(user =>
      (user.name + ' ' + user.lastname).toLowerCase().includes(this.searchQuery.toLowerCase()) && user.role.authority != 1
    );
  }

  get filteredTeams(): any[] {
      return this.teams.filter(team =>
          team.name.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
  }

  removeSelectedUser(user: User): void {
    this.selectedUsers = this.selectedUsers.filter(selectedUser => selectedUser.id !== user.id);
    this.selectedUserRolesMap.delete(user.id);
  } 
}
