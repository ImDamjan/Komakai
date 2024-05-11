import { AfterViewInit, Component, OnInit, inject } from '@angular/core';
import Chart from 'chart.js/auto';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { AssignmentService } from '../../services/assignment.service';
import { Task } from '../../models/task/task';

@Component({
  selector: 'app-project-weekly-analize',
  templateUrl: './project-weekly-analize.component.html',
  styleUrl: './project-weekly-analize.component.css'
})
export class ProjectWeeklyAnalizeComponent implements OnInit{

  private projectService = inject(ProjectService);
  private jwtService = inject(JwtDecoderService);
  private assignmentService = inject(AssignmentService);
  userid!: number;
  projects!: Project[];
  tasks!: Task[];
  atRiskCount = 0;
  highCount = 0;
  mediumCount = 0;
  lowCount = 0;

  patRiskCount = 0;
  phighCount = 0;
  pmediumCount = 0;
  plowCount = 0;

  constructor() { }
  ngOnInit(): void {
    this.createChart();
  }
  public chart: any;

  createChart() {
    let token = this.jwtService.getToken();
    if(token!=null)
    {
      let decode = this.jwtService.decodeToken(token);
      this.userid = decode.user_id;


      this.projectService.getProjectsData().subscribe(projects => {
        this.projects = projects;

        this.assignmentService.getAllUserAssignments(this.userid).subscribe(tasks => {
          this.tasks = tasks;
          
          this.tasks.forEach(task => {
            switch (task.priority.id) {
              case 1:
                this.atRiskCount++;
                break;
              case 2:
                this.highCount++;
                break;
              case 3:
                this.mediumCount++;
                break;
              case 4:
                this.lowCount++;
                break;
              default:
                break;
            }
          });

          this.projects.forEach(project => {
            switch (project.priority.id) {
              case 1:
                this.patRiskCount++;
                break;
              case 2:
                this.phighCount++;
                break;
              case 3:
                this.pmediumCount++;
                break;
              case 4:
                this.plowCount++;
                break;
              default:
                break;
            }
          });

          const daysOfWeek = ['At risk', 'High', 'Medium', 'Low'];
    
        this.chart = new Chart("MyChart", {
          type: 'bar',
          data: {
            labels: daysOfWeek,
            datasets: [
              { label: "Projects", data: [this.patRiskCount,this.phighCount,this.pmediumCount,this.plowCount], backgroundColor: 'rgba(0, 128, 128)' },
              { label: "Tasks", data: [this.atRiskCount,this.highCount,this.mediumCount,this.lowCount], backgroundColor: 'rgba(255, 127, 80)' }
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
                text: 'Priority Overview',
                font: {
                  size: 18
                }
              }
            },
            indexAxis: 'y',
            scales: {
              x: {
                stacked: false
              },
              y: {
                stacked: false
              }
            }
          }
        });
        });
      });
    }
  }
}
