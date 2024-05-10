import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-task-tags',
  templateUrl: './task-tags.component.html',
  styleUrl: './task-tags.component.css'
})
export class TaskTagsComponent implements AfterViewInit{
  @ViewChild('myChart') myChart!: ElementRef;

  ngAfterViewInit() {
    this.createChart();
  }
	
  createChart() {
    const ctx = this.myChart.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Bug', 'Spike', 'Feature', 'Penest'],
        datasets: [{
          data: [15, 20, 24, 29],
          backgroundColor: [
            'rgb(116, 226, 145)',
            'rgb(116, 226, 145)',
            'rgb(116, 226, 145)',
            'rgb(116, 226, 145)',
            'rgb(116, 226, 145)',
            'rgb(116, 226, 145)'
          ],
          borderColor: [
            'rgb(116, 226, 145, 0.2)',
            'rgb(116, 226, 145, 0.2)',
            'rgb(116, 226, 145, 0.2)',
            'rgb(116, 226, 145, 0.2)',
            'rgb(116, 226, 145, 0.2)',
            'rgb(116, 226, 145, 0.2)'
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
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: 'Tasks by tag preview',
            font: {
              size: 18
            }
          },
          legend: {
            display: false,
            onClick: function() {} 
          }
        }
      }
    });
  }
}
