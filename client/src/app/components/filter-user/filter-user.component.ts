import { Component, OnInit, inject } from '@angular/core';
import { Role } from '../../models/role';
import { RoleService } from '../../services/role.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrl: './filter-user.component.css'
})
export class FilterUserComponent implements OnInit{
  private roleService = inject(RoleService);
  private userService = inject(UserService);
  roles: Role[] = [];
  selectedRoles: Role[] = [];
  isActivated: number = 1;
  sortMode: number = -1;

  ngOnInit(): void {
    this.roleService.getAllRoles().subscribe(roles =>{
      this.roles = roles;
    });
  }


  applyFilters() {
    const filters = {
      roleFilter: this.selectedRoles.map(role => role.id),
      isActivatedFilter: [this.isActivated],
      sortFlag: this.sortMode
    };
    this.userService.getUsers(filters).subscribe(data => {
      this.userService.updateFilteredUsers(data);
    });
  }
}
