import { Component } from '@angular/core';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  n: number = 1; // Set your desired number of repetitions here

  constructor() { }

  getRange(n: number): number[] {
    return Array.from({length: n}, (_, i) => i + 1);
  }
}
