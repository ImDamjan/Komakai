import { Component, Inject, Input, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectOverlayComponent } from '../create-project-overlay/create-project-overlay.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {

  private dat : any =  inject(MAT_DIALOG_DATA)
  private dialogRef = inject(MatDialogRef<AddTaskComponent>);
  constructor() { console.log(this.dat)}

  closeOverlay(): void {
    this.dialogRef.close();
  }
}
