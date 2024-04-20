import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
  
  constructor(public dialogRef: MatDialogRef<ProfileDetailsComponent>) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
