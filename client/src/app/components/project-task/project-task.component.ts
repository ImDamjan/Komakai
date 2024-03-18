import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrl: './project-task.component.css',
})
export class ProjectTaskComponent {
  @Input() task: any;

  getPriorityClass(priority: string): string {
    switch (priority) {
        case 'Low':
            return 'low-priority';
        case 'Medium':
            return 'medium-priority';
        case 'High':
            return 'high-priority';
        case 'At risk':
            return 'at-risk';
        default:
            return '';
    }
}
}
