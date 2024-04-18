import { Component, OnInit, inject } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {
  
  public roles : Role[] = [];
  public users : User[] = [];
  private role_service = inject(RoleService);
  private user_service = inject(UserService);
  
  ngOnInit(): void {
    this.role_service.getAllRoles().subscribe({
      next : (roles: Role[])=> 
      {
        this.roles = roles.filter(r=>r.id!=5);
      }
    });

    this.user_service.getUsers().subscribe({
      next : (users: User[]) => this.users = users
    })
  }

}
