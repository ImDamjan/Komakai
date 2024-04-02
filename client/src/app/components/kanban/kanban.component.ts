import { Component, OnInit, VERSION, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TaskKanban } from '../../models/kanbantask';
import { TaskCardKanbanComponent } from '../task-card-kanban/task-card-kanban.component';
import { StateService } from '../../services/state.service';
import { State } from '../../models/state';
import { KanbanAssignmentService } from '../../services/kanban-assignment.service';
import { Assignment } from '../../models/assignment';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
  name = 'Angular Material ' + VERSION.major + ' Kanban board';
   public board: Board;
   private state_service = inject(StateService);
   private assignment_service = inject (KanbanAssignmentService);
  constructor()
  {
    this.board = new Board('Kanban', []);
  }

  public ngOnInit(): void {
    console.log(this.board);
    this.state_service.fetchAllStates().subscribe({
      next : (states : State[])=>
    {
      
        this.assignment_service.getAllProjectAssignments(1).subscribe({
          next : (assignments : Assignment[])=>
        {
          let columns : Column[] = [];
          states.forEach(state => {
            let stateProjects : Assignment[] = [];
            assignments.forEach(assignment => {
              if(assignment.stateId==state.id)
                stateProjects.push(assignment);
            });
            console.log(stateProjects);
          columns.push(new Column(state.name,state.id + "",stateProjects));
        });
        this.board.columns = columns;
      },
      error : (error:any)=> console.log(error)
      });
      
    },
    error :(error)=> console.log(error)});
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
    console.log(event.item.data);
  }
}
