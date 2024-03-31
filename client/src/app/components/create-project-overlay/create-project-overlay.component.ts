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

  constructor(private dialogRef: MatDialogRef<CreateProjectOverlayComponent>, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

  closeOverlay(): void {
    // Close the overlay dialog
    this.dialogRef.close();
  }

  
}
