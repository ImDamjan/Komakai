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
  
  extractNumber(text: string): number | null {
    const regex = /\d+/;
    const match = regex.exec(text);
    return match ? parseInt(match[0], 10) : null;
  }

  getCorrectTime(time: string,timeDifference: number): string{
    const number = this.extractNumber(time);
    if(number){
      if(time.includes('days')){
        const days = number * 1000 * 60 * 60 * 24;
        if(days<timeDifference/3){
          return 'low-time';
        }
        else if(days<((2*timeDifference)/3)){
          return 'medium-time';
        }
        else{
          return 'high-time';
        }
      }
      else if(time.includes('hours')){
        const hours = number * 1000 * 60 * 60;
        if(hours<timeDifference/3){
          return 'low-time';
        }
        else if(hours<((2*timeDifference)/3)){
          return 'medium-time';
        }
        else{
          return 'high-time';
        }
      }
      else if(time.includes('minutes')){
        const minutes = number * 1000 * 60;
        console.log(minutes)
        console.log(timeDifference)
        if(minutes>=((2*timeDifference)/3)){
          return 'high-time';
        }
        else if(minutes>=(timeDifference/3) && minutes<((2*timeDifference)/3)){
          return 'medium-time';
        }
        else{
          return 'low-time';
        }
      }
      else{
        return 'low-time';
      }
    }
    else{
      return 'low-time';
    }
    
  }

}
