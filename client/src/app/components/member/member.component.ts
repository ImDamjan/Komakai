import { AfterViewInit, Component, Input, OnInit, inject } from '@angular/core';
import { Role } from '../../models/role';
import { User } from '../../models/user/user';
import { UpdateUser } from '../../models/user/update-user';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { NgxSpinnerService } from 'ngx-spinner';
import { EMPTY, catchError, forkJoin, tap } from 'rxjs';
import { SearchService } from '../../services/search.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.css'
})
export class MemberComponent implements OnInit{

  @Input() roles :Role[] = [];
  @Input() users : User[] = [];
  allUsers: User[] = [];
  filteredUsers: User[] = [];
  private user_service = inject(UserService);
  private spinner = inject(NgxSpinnerService);
  private search_service = inject(SearchService);
  profilePicturesLoaded = false;
  initialRoles: Map<number, Role> = new Map<number, Role>();
  initialActivation: Map<number, boolean> = new Map<number, boolean>();

  ngOnInit(): void {
    this.user_service.getUsers().subscribe(users => {
      this.allUsers = users;

      this.allUsers.forEach(user => {
        this.initialRoles.set(user.id, user.role);
        this.initialActivation.set(user.id,user.isActivated);
      });
      
      this.filteredUsers = this.allUsers;
      this.profilePicture(this.allUsers);

      this.search_service.currentSearchQuery.subscribe(query => {
        const searchTerms = query.toLowerCase().split(' ');
        this.filteredUsers = this.users.filter(user => {
          return searchTerms.every(term =>
            user.name.toLowerCase().includes(term) ||
            user.lastname.toLowerCase().includes(term)
          );
        });
      });
    });

    this.user_service.filteredUsers$.subscribe(users => {
      this.filteredUsers = users;
      this.filteredUsers.forEach(user => {
        this.user_service.profilePicture(user.id).subscribe({
          next: (message: { profilePicture: string, type: string }) => {
            if(message.profilePicture)
              {
                user.profilePicturePath = `data:${message.type};base64,${message.profilePicture}`;
              }
              
            else
            {
              user.profilePicturePath = "../../../assets/pictures/defaultpfp.svg";
            }
          }, 
          error: (err) => {
            console.error('Error retrieving profile picture:', err);
          },
          complete: () => {
            this.profilePicturesLoaded = true;
          }
        });
      });
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
      roleName: user.role.name,
      isActivated: user.isActivated,
      profile_picture: user.profilePicture
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
          if(message.profilePicture)
            user.profilePicture = `data:${message.type};base64,${message.profilePicture}`;
          else
            user.profilePicture = "../../../assets/pictures/defaultpfp.svg";
        }, 
        error: (err) => {
          console.error('Error retrieving profile picture:', err);
        },
        complete: () => {
          this.profilePicturesLoaded = true;
        }
      });
    });
  }

  isDefaultRole(user: User): boolean {
    const initialRole = this.initialRoles.get(user.id);
    return initialRole ? initialRole.id === user.role.id : false;
  }
  
  isDefaultActivation(user: User): boolean {
    const initialActivate = this.initialActivation.get(user.id);
    return initialActivate !== undefined ? initialActivate === user.isActivated : false; 
  }
}
