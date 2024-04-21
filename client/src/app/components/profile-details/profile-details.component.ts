import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { UserService } from '../../services/user.service';
import { UpdateUser } from '../../models/user/update-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
  user: UpdateUser;
  roleId!: number;
  roles!: Role[];
  editMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private roleService: RoleService, private userService: UserService, private router: Router) {
    this.user = data.user;
    this.roleId = data.role;
    this.user.roleId = this.roleId;
    console.log(this.user);
  }

  ngOnInit() : void {
    this.roleService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  editProfile(userid: Number): void {
    this.userService.updateUser(this.user).subscribe(response => {
      alert('Project edited successfully!');
    });  
  }
}
