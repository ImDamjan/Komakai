import { AfterViewInit, Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrl: './project-status.component.css'
})
export class ProjectStatusComponent implements AfterViewInit {

  ngAfterViewInit(): void {
    this.createPieChart();
  }

  chart: any;

  createPieChart(): void {
    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: ['Not ready', 'Ready', 'In progress', 'Blocked', 'Done', 'Cancelled'],
        datasets: [{
          label: 'Percentage',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            'rgb(33, 28, 106)',
            'rgb(89, 180, 195)',
            'rgb(116, 226, 145)',
            'rgb(239, 243, 150)',
            'rgb(255, 207, 150)',
            'rgb(255, 128, 128)'
          ],
          borderColor: [
            'rgb(33, 28, 106, 0.2)',
            'rgb(89, 180, 195, 0.2)',
            'rgb(116, 226, 145, 0.2)',
            'rgb(239, 243, 150, 0.2)',
            'rgb(255, 207, 150, 0.2)',
            'rgb(255, 128, 128, 0.2)'
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Project Status Overview',
            font: {
              size: 18
            }
          },
          legend: {
            position: 'right',
            onClick: function() {}
          }
        }
      }
    });
  }
}
