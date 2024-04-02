import { Component, OnInit, VERSION } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TaskKanban } from '../../models/kanbantask';
import { TaskCardKanbanComponent } from '../task-card-kanban/task-card-kanban.component';
import { StateService } from '../../services/state.service';
import { State } from '../../models/state';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
  name = 'Angular Material ' + VERSION.major + ' Kanban board';
   public board: Board;

  constructor
  (
    private state_service : StateService,
    private project_service : ProjectService
  )
  {
    this.board = new Board('Kanban', []);
  }

  public ngOnInit(): void {
    console.log(this.board);
    this.state_service.fetchAllStates().subscribe((states : State[])=>
    {
      
        this.project_service.getProjectsData().subscribe((projects : Project[])=>
        {
          let columns : Column[] = [];
          states.forEach(state => {
            let stateProjects : string[] = [];
            projects.forEach(project => {
              if(project.stateId==state.id)
                stateProjects.push(project.title);
            });
            console.log(stateProjects);
          columns.push(new Column(state.name,state.id + "",stateProjects));
        });
        this.board.columns = columns;
      });
      
    },
    error=> console.log(error));
  }

  public dropGrid(event: CdkDragDrop<TaskCardKanbanComponent[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<TaskCardKanbanComponent[]>): void {
    if (event.previousContainer === event.container) {
      // console.log("kliknuo sam 1");
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // console.log("kliknuo sam 2");
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
