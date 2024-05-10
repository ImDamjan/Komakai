import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { Project } from '../../models/project/project';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project-status',
  templateUrl: './project-status.component.html',
  styleUrl: './project-status.component.css'
})
export class ProjectStatusComponent implements AfterViewInit, OnInit {
  
  projects!: Project[];
  project_service = inject(ProjectService);
  notStartedCount = 0;
  readyCount = 0;
  inProgressCount = 0;
  blockedCount = 0;
  doneCount = 0;
  cancelledCount = 0;

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.createPieChart();
  }


  chart: any;

  createPieChart(): void {
    this.project_service.getProjectsData().subscribe( projects => {
      this.projects = projects;

      this.projects.forEach(project => {
        switch (project.state.id) {
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
      console.log("Not started: "+this.notStartedCount);
    console.log("Ready: "+this.readyCount);
    console.log("In progress: "+this.inProgressCount);
    console.log("Blocked: "+this.blockedCount);
    console.log("Done: "+this.doneCount);
    console.log("Cancelled: "+this.cancelledCount);



          this.chart = new Chart('canvas', {
            type: 'doughnut',
            data: {
              labels: ['Not started', 'Ready', 'In progress', 'Blocked', 'Done', 'Cancelled'],
              datasets: [{
                label: 'Percentage',
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
    });
    
    
  }
}
