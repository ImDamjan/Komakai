import { Component, OnInit, VERSION } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TaskKanban } from '../../models/kanbantask';
import { TaskCardKanbanComponent } from '../task-card-kanban/task-card-kanban.component';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
  name = 'Angular Material ' + VERSION.major + ' Kanban board';
  public board: Board = new Board('Kanban', [
    new Column('Not started', '1', [
      new TaskKanban('Some random idea', 'Opis zadatka 1', TaskCardKanbanComponent),
      new TaskKanban('Neki tusk', 'Opis zadatka 2', TaskCardKanbanComponent)
    ]),
    new Column('Ready', '2', [
      'Lorem ipsum',
      'Task'
    ]),
    new Column('In progress', '3', [
      'Lorem ipsum',
      'foo'
    ]),
    new Column('Blocked', '4', [
      'Lorem ipsum',
      'foo'
    ]),
    new Column('Done', '5', [
      'Lorem ipsum',
      'foo'
    ]),
    new Column('Cancelled', '6', [
      'Lorem ipsum',
      'foo'
    ])
  ]);

  constructor(){}

  public ngOnInit(): void {
    console.log(this.board);
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
