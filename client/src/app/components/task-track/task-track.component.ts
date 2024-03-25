import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrl: './task-track.component.css'
})
export class TaskTrackComponent implements AfterViewInit  {

  @ViewChild('myChart') myChart!: ElementRef;

  ngAfterViewInit() {
    this.createChart();
  }
	
  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Not ready', 'Ready', 'In progress', 'Blocked', 'Done', 'Cancelled'],
        datasets: [{
          data: [15, 20, 24, 29, 73, 12],
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
          borderWidth: 2
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        },
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Tasks status preview',
            font: {
              size: 18
            }
          },
          legend: {
            display: false 
          }
        }
      }
    });
  }
}
