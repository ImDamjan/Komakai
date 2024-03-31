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
  selectedUsers: string[] = [];
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
      // Handle user selection
      if (this.isSelected(userId)) {
          this.selectedUsers = this.selectedUsers.filter(id => id !== userId);
      } else {
          this.selectedUsers.push(userId);
      }
  }

  isSelected(userId: string): boolean {
      // Check if user is selected
      return this.selectedUsers.includes(userId);
  }

  toggleUserSelection(userId: string): void {
      // Toggle user selection when clicking on the option
      this.onUserSelected(userId);
  }

  closeOverlay(): void {
      // Close the overlay dialog
      this.dialogRef.close();
  }
}
