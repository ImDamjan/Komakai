import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { Role } from '../../models/role';
import { User } from '../../models/user/user';
import { UpdateUser } from '../../models/user/update-user';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent {

  @Input() roles :Role[] = [];
  @Input() users : User[] = [];
  private user_service = inject(UserService);
  private spinner = inject(NgxSpinnerService);



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
      isActivated: user.isActivated
    }

    this.user_service.updateUser(body).subscribe({
      next: (updatedUser: User) => {user = updatedUser; confirm("User updated successfully");this.spinner.hide();},
      error: (err) => console.log(err)
    });
  }
}
