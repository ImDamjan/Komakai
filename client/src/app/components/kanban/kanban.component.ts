import { Component, OnInit, VERSION } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TaskKanban } from '../../models/kanbantask';
import { TaskCardKanbanComponent } from '../task-card-kanban/task-card-kanban.component';
import { StateService } from '../../services/state.service';
import { State } from '../../models/state';
import { ProjectService } from '../../services/project.service';

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
    private state_service : StateService
  )
  {
    this.board = new Board('Kanban', []);
  }

  public ngOnInit(): void {
    // console.log(this.board);
    this.state_service.fetchAllStates().subscribe((states : State[])=>
    {
      let columns : Column[] = [];
      states.forEach(state => {
        columns.push(new Column(state.name,state.id + "",[]))
      });
      this.board.columns = columns;
    },
    error=> console.log(error));
  }

  public dropGrid(event: CdkDragDrop<TaskCardKanbanComponent[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<TaskCardKanbanComponent[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
