import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../../components/add-task/add-task.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrl: './project-details.component.css'
})
export class ProjectDetailsComponent {
  showProjectDetails: boolean = true;
  showCreateButton: boolean = true;
  projectText: string = 'Project details';

  constructor(private dialog: MatDialog) { }

  openCreateOverlay(): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      this.showProjectDetails = true;
      this.showCreateButton = true;
      this.projectText = 'Project details';
    });
    
    this.showProjectDetails = false;
    this.showCreateButton = false;
    this.projectText = 'Project details/Create task';
  }

  currentView: string = 'kanban'; // Default view

  changeView(view: string): void {
    this.currentView = view;
  }
}
