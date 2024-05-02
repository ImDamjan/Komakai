import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { UserService } from '../../services/user.service';
import { UpdateUser } from '../../models/user/update-user';
import { Router } from '@angular/router';
import { UserProfileService } from '../../services/user-profile.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
  user: UpdateUser;
  originalUser: UpdateUser;
  roleId!: number;
  roles!: Role[];
  editMode = false;
  picture!: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private roleService: RoleService, private userService: UserService, private router: Router, private userProfileService: UserProfileService) {
    this.user = data.user;
    this.originalUser = { ...this.user };
    this.roleId = data.role;
    this.user.roleId = this.roleId;
    console.log(this.user);
    this.profilePicture(this.user.id);
  }

  ngOnInit() : void {
    this.roleService.getAllRoles().subscribe(roles => {
      this.roles = roles;
    });
  }

  toggleEditMode() {
    if (!this.editMode) {
      this.originalUser = { ...this.user };
    } else {
      this.user = { ...this.originalUser };
    }
    this.editMode = !this.editMode;
  }

  editProfile(userid: Number,form: NgForm): void {
    if (form.invalid) {
      return;
    }
    this.userService.updateUser(this.user).subscribe(response => {
      this.userProfileService.setUserProfile(this.user);
      alert('Profile edited successfully!');
      this.originalUser = { ...this.user };
    });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    console.log(file);
    let picture = {
        data: '',
        filename: '', 
        type: ''
    }
    picture.type = file.type;
    picture.filename = file.name;
    if (file) {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = (reader.result as string).split(',')[1];
        picture.data = base64String;
        this.uploadProfilePicture(this.user.id, picture);
      };
  
      reader.readAsDataURL(file);
    }
  }

  uploadProfilePicture(userId: number, base64String: any) {
    this.userService.uploadProfilePicture(userId, base64String).subscribe({
      next: (message: string) => {this.profilePicture(userId)}, error: (err) => {}
    });
  }

  profilePicture(userId: number) {
    this.userService.profilePicture(userId).subscribe({
      next: (message: { profilePicture: string, type: string }) => {
        this.picture = `data:${message.type};base64,${message.profilePicture}`;
        this.userService.setProfilePicture(this.picture);
      }, error: (err) => {
        if (err.error === 'Profile picture not found for the user') {
          this.picture = "../../../assets/pictures/defaultpfp.svg";
        }
      }
    });
  }
  
}
