import { Component, ViewChild, ElementRef, AfterViewInit, inject, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { AssignmentService } from '../../services/assignment.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { Task } from '../../models/task/task';

@Component({
  selector: 'app-task-track',
  templateUrl: './task-track.component.html',
  styleUrl: './task-track.component.css'
})
export class TaskTrackComponent implements AfterViewInit {
  
  userid!: number;
  private jwtService = inject(JwtDecoderService);
  assignmentService = inject(AssignmentService);
  tasks!: Task[];
  notStartedCount = 0;
  readyCount = 0;
  inProgressCount = 0;
  blockedCount = 0;
  doneCount = 0;
  cancelledCount = 0;
  @ViewChild('myChart') myChart!: ElementRef;

  ngAfterViewInit() {
    this.createChart();
  }
	
  createChart() {
    let token = this.jwtService.getToken();
    if(token!=null)
    {
      let decode = this.jwtService.decodeToken(token);
      this.userid = decode.user_id;

      this.assignmentService.getAllUserAssignments(this.userid).subscribe(tasks => {
        this.tasks = tasks;
        this.tasks.forEach(task => {
          switch (task.state.id) {
            case 1:
              this.notStartedCount++;
              break;
            case 2:
              this.readyCount++;
              break;
            case 3:
              this.inProgressCount++;
              break;
            case 4:
              this.blockedCount++;
              break;
            case 5:
              this.doneCount++;
              break;
            case 6:
              this.cancelledCount++;
              break;
            default:
              break;
          }
        });

        const ctx = this.myChart.nativeElement.getContext('2d');
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: ['Not ready', 'Ready', 'In progress', 'Blocked', 'Done', 'Cancelled'],
            datasets: [{
              data: [this.notStartedCount,this.readyCount, this.inProgressCount, this.blockedCount, this.doneCount, this.cancelledCount],
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
            maintainAspectRatio: false,
            plugins: {
              title: {
                display: true,
                text: 'Tasks Status Overview',
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
      });
    }
    
  }
}
