import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent implements OnInit {
  users: any[] | undefined;
  selectedUser: string | undefined;
  showDropdown: boolean = false;

  constructor(private dialogRef: MatDialogRef<CreateProjectOverlayComponent>, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }
  toggleDropdown(): void {
    this.showDropdown = !this.showDropdown;
  }

  onUserSelected(userId: string): void {
    this.selectedUser = userId;
    this.showDropdown = false;
  }
  closeOverlay(): void {
    // Close the overlay dialog
    this.dialogRef.close();
  }

  
}
