import { Component, Inject, Input } from '@angular/core';
import { Task } from '../../models/task/task';

@Component({
  selector: 'app-task-card-kanban',
  templateUrl: './task-card-kanban.component.html',
  styleUrl: './task-card-kanban.component.css'
})
export class TaskCardKanbanComponent {
    @Input() public task! : Task;
}
