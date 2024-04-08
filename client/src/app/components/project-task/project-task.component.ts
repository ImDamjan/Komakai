import { Component, Input, inject} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-task',
  templateUrl: './project-task.component.html',
  styleUrl: './project-task.component.css',
})
export class ProjectTaskComponent {
  @Input() task: any;
  private router = inject(Router);

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

  extractAfterNumber(text: string): string | null {
    const regex = /\d+/;
    const match = regex.exec(text);
    if (match) {
      const startOfTextAfterNumber = match.index + match[0].length;
      return text.substring(startOfTextAfterNumber);
    } else {
      return null;
    }
  }
  navigateToTaskDetails(task_id:number)
  {
    this.router.navigate(["tasks","task-details",task_id]);
  }
  extractNumberAndText(text: string): { number: number | null; text: string | null } {
    const regex = /(\d+\.?\d*)/; // Match digits, optional decimal, and digits
    const match = regex.exec(text);
  
    if (match) {
      const extractedNumber = parseFloat(match[0]); // Convert matched string to number (including decimals)
      const startOfTextAfterNumber = match.index + match[0].length;
      const extractedText = text.substring(startOfTextAfterNumber);
      return { number: extractedNumber, text: extractedText };
    } else {
      return { number: null, text: null }; // No number found
    }
  }

  getCorrectTime(time: string,timeDifference: number): string{
    const number = this.extractNumber(time);
    // console.log(number)
    // console.log(timeDifference)
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
        // console.log(minutes)
        // console.log(timeDifference)
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

  getFloorRemaining(remaining: string): string{
    const string = this.extractNumberAndText(remaining);
    if(string && string.number && string.text){
      const floor = Math.floor(string.number)
      // console.log(floor)
      return (floor).toString() + string.text;
    }
    else{
      return 'No more time';
    }
  }

}
