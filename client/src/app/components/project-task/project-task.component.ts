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
  
  getCorrectTime(time: string): string{
    if(time.includes('days')){
      return 'high-time';
    }
    else if(time.includes('hours')){
      return 'medium-time';
    }
    else{
      return 'low-time';
    }
  }

}
