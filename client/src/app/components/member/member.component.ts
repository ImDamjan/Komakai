import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { Role } from '../../models/role';
import { User } from '../../models/user/user';
import { UpdateUser } from '../../models/user/update-user';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, catchError, forkJoin, tap } from 'rxjs';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit{

  @Input() roles :Role[] = [];
  @Input() users : User[] = [];
  allUsers: User[] = [];
  private user_service = inject(UserService);
  private spinner = inject(NgxSpinnerService);
  profilePicturesLoaded = false;

  ngOnInit(): void {
    this.user_service.getUsers().subscribe(users => {
      this.allUsers = users;
      console.log(this.allUsers)
      this.profilePicture(this.allUsers);
    });
  }

  updateUserRole(role: Role,user : User)
  {
      user.role = role;
  }

  changeActivationStatus(activation : number, user:User)
  {
    
    if(activation==1)
      user.isActivated = true;
    else
      user.isActivated = false;

  }

  sendUpdateRequest(user: User){
    console.log(user);
    this.spinner.show();
    let body : UpdateUser = {
      id: user.id,
      name: user.name,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      jobTitle: user.jobTitle,
      organisation: user.organisation,
      department: user.department,
      roleId: user.role.id,
      roleName: '',
      isActivated: user.isActivated,
      profile_picture: user.profile_picture
    }

    this.user_service.updateUser(body).subscribe({
      next: (updatedUser: User) => {user = updatedUser; confirm("User updated successfully");this.spinner.hide();},
      error: (err) => console.log(err)
    });
  }

  profilePicture(users: User[]) {
    this.users.forEach(user => {
      this.user_service.profilePicture(user.id).subscribe({
        next: (message: { profilePicture: string, type: string }) => {
          user.profile_picture = `data:${message.type};base64,${message.profilePicture}`;
          console.log(user.profile_picture);
        }, 
        error: (err) => {
          if (err.error === 'Profile picture not found for the user') {
            user.profile_picture = "../../../assets/pictures/defaultpfp.svg";
            console.log(user.profile_picture);
          }
        },
        complete: () => {
          this.profilePicturesLoaded = true;
        }
      });
    });
  }
}
