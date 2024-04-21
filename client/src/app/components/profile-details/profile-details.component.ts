import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-profile-details',
  templateUrl: './profile-details.component.html',
  styleUrl: './profile-details.component.css'
})
export class ProfileDetailsComponent {
  user: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.user = data.user;
    console.log(this.user);
  }
}
