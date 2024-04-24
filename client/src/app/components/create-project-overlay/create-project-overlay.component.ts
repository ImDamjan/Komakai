import { Component, Inject, OnInit, inject, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';
import { PriorityService } from '../../services/priority.service';
import { TeamService } from '../../services/team.service';
import { User } from '../../models/user/user';
import { CreateProject } from '../../models/project/create-project';
import { Team } from '../../models/team';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent implements OnInit {
  private jwtService = inject(JwtDecoderService);
  loggedInUserId: number | null = null;
  roleid!: number;

  users: User[] = [];
  priorities: any[] | undefined;
  teams: Team[] = [];
  roles: Role[] = [];
  filteredRoles: Role[] = [];
  showDropdown: boolean = false;
  hoveredTeam: any;
  submitted = false;
  submissionError: string | null = null;

  projectObj!: CreateProject;

  selectedUserIds: number[] = [];


  selectedUserRolesMap : Map<number,number> = new Map<number,number>();
  userRoles: Map<number, number> = new Map<number, number>();
  defaultRoles: Map<number, number> = new Map<number, number>();

  selectedPriorityId!: number;
  private spinner = inject(NgxSpinnerService);
  constructor(private dialogRef: MatDialogRef<CreateProjectOverlayComponent>, private userService: UserService, private projectService: ProjectService, private priorityService: PriorityService, private teamService: TeamService, private roleService: RoleService) { }

  ngOnInit(): void {
    let token = this.jwtService.getToken();
        if (token != null) {
            let decode = this.jwtService.decodeToken(token);
            this.loggedInUserId = decode.user_id;
            this.roleid = decode.role_id;
        }
    this.roleService.getAllRoles().subscribe(roles => {
       this.roles = roles;
    });
    this.spinner.show();
    this.userService.getUsers().subscribe(users => {
      this.users = users;

      this.users.forEach(user => {
          this.userRoles.set(user.id, user.role.id);
          this.defaultRoles = this.userRoles;
          console.log(this.defaultRoles);
      });
      this.spinner.hide();
    });
    this.priorityService.getPriorities().subscribe(priorities => {
      this.priorities = priorities;
    });
    this.teamService.getTeams().subscribe(teams => {
      this.teams = teams;
    });
    this.projectObj = {
      userIds : [],
      userProjectRoleIds : [],
      priorityId : this.selectedPriorityId,
      title : "",
      start : new Date(),
      end : new Date(),
      budget : 0,
      description : "",
      type : ""
    };
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
      // Handle user selection
      if (this.isSelected(user)) {
          this.selectedUserRolesMap.delete(user.id);
          // this.selectedUserIds = this.selectedUserIds.filter(id => id !== user.id);
      } else {
          // this.selectedUserIds.push(user.id);
          this.selectedUserRolesMap.set(user.id,selectedRoleId!);
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

  createProject(): void {
    let selected_users : number[] = [];
    let selected_roles : number[] = [];
    this.selectedUserRolesMap.forEach((value,key) => {
      selected_roles.push(value);
      selected_users.push(key);
    });
    this.projectObj.userProjectRoleIds = selected_roles;
    this.spinner.show();
    this.projectObj.userIds = selected_users;
    this.projectObj.priorityId = this.selectedPriorityId;
    this.submitted = true;
    this.submissionError = null;

    if (this.loggedInUserId != null) {
      this.selectedUserRolesMap.set(this.loggedInUserId, this.roleid);
      this.projectObj.userIds.push(this.loggedInUserId);
      this.projectObj.userProjectRoleIds.push(this.roleid);
    }

    if (!this.projectObj.title.trim() || !this.projectObj.priorityId || !this.projectObj.start || !this.projectObj.end) {
      this.submissionError = 'Please fill in all necessary fields.';
      this.spinner.hide();
      return;
    }

    this.projectService.createProject(this.projectObj).subscribe(response => {
      console.log('Project created successfully:', response);
      alert('Project created successfully!');
      this.spinner.hide();
      this.resetForm();
      this.submitted = false;
    }, error => {
      console.error('Error creating project:', error);
      this.spinner.hide();
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
    this.projectObj.userProjectRoleIds = [];
    this.selectedUserIds = [];
    this.selectedUserRolesMap.clear();
    this.selectedPriorityId = 0;
    this.projectObj.budget = 0;
    this.projectObj.description = '';
    this.projectObj.type = '';
    this.userRoles = this.defaultRoles;
  }

  showTeamMembers(team: Team): void {
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
            }
        });
    } else {
        team_member_ids.forEach(member => {
            if (member.id != this.loggedInUserId) {
                const selectedRoleId = this.userRoles.get(member.id);
                if (!this.isSelected(member))
                    this.selectedUserRolesMap.set(member.id, selectedRoleId!);
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

  getRolesForUser(user: User): Role[] {
    console.log(this.roles.filter(role => (role.authority >= user.role.authority)));
    return this.roles.filter(role => role.authority >= user.role.authority);
  }
}
