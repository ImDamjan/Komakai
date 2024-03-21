import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project-overlay',
  templateUrl: './create-project-overlay.component.html',
  styleUrl: './create-project-overlay.component.css'
})
export class CreateProjectOverlayComponent {

  constructor(private dialogRef: MatDialogRef<CreateProjectOverlayComponent>) { }

  closeOverlay(): void {
    // Close the overlay dialog
    this.dialogRef.close();
  }

  
}
