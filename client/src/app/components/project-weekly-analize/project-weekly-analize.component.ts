import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-project-weekly-analize',
  templateUrl: './project-weekly-analize.component.html',
  styleUrl: './project-weekly-analize.component.css'
})
export class ProjectWeeklyAnalizeComponent implements OnInit{
  constructor() { }
 ngOnInit(): void {
    this.createChart();
  }
  public chart: any;

  createChart() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
    // Generisanje random vrednosti za achieved i tracked
    const achievedData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
    const trackedData = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100));
  
    this.chart = new Chart("MyChart", {
      type: 'line',
      data: {
        labels: daysOfWeek,
        datasets: [
          { label: "On time", data: achievedData },
          { label: "Off time", data: trackedData }
        ]
      },
      options: {
        aspectRatio: 2.5,
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            onClick: function() {} 
          },
          title: {
            display: true,
            text: 'Project Deadline Preview',
            font: {
              size: 18
            }
          }
        }
      }
    });
  }
}
