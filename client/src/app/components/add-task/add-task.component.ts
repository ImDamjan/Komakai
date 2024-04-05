import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CreateProjectOverlayComponent } from '../create-project-overlay/create-project-overlay.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  constructor(private dialogRef: MatDialogRef<CreateProjectOverlayComponent>) { }

  closeOverlay(): void {
    this.dialogRef.close();
  }
}
