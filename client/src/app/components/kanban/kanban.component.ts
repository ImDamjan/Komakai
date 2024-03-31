import { Component, OnInit, VERSION } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
  name = 'Angular Material ' + VERSION.major + ' Kanban board';
  public board: Board = new Board('Test Board', [
    new Column('Not started', '1', [
      'Some random idea',
      'This is another random idea'
    ]),
    new Column('Ready', '2', [
      'Lorem ipsum',
      'foo'
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

  public dropGrid(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }

  public drop(event: CdkDragDrop<string[]>): void {
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
