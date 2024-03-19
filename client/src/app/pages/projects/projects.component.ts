import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectOverlayComponent } from '../../components/create-project-overlay/create-project-overlay.component';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {

  constructor(private dialog: MatDialog) { }

  openCreateOverlay(): void {
    const dialogRef = this.dialog.open(CreateProjectOverlayComponent, {
    });
  }
}
