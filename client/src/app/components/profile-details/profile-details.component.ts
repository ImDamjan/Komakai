import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
  user: any;
  roleId!: number;
  roles!: Role[];
  editMode = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private roleService: RoleService) {
    this.user = data.user;
    this.roleId = data.role;
  }

  ngOnInit() : void {
    this.roleService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
