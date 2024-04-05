import { Component, OnInit, VERSION, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TaskKanban } from '../../models/kanbantask';
import { TaskCardKanbanComponent } from '../task-card-kanban/task-card-kanban.component';
import { StateService } from '../../services/state.service';
import { State } from '../../models/state';
import { Assignment } from '../../models/assignment';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
  name = 'Angular Material ' + VERSION.major + ' Kanban board';
   public board: Board;
   private projectId : Number = 0;
   private state_service = inject(StateService);
   private assignment_service = inject (AssignmentService);
   private route = inject(ActivatedRoute);
  constructor()
  {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.board = new Board('Kanban', []);
  }

  public ngOnInit(): void {
    console.log(this.board);
    
    this.state_service.fetchAllStates().subscribe({
      next : (states : State[])=>
    {
      
      //treba da se stavi od kliknutog projekta id
        this.assignment_service.getAllProjectAssignments(this.projectId).subscribe({
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

  //promenjeno na interfejs Assignment(bilo je TaskCardKanbanComponent)
  public dropGrid(event: CdkDragDrop<Assignment[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }
  //promenjeno na interfejs Assignment(bilo je TaskCardKanbanComponent)
  public drop(event: CdkDragDrop<Assignment[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      event.item.data.stateId = Number(event.container.id);
      this.assignment_service.updateAssignmentById(event.item.data).subscribe({
        next : (assignment : Assignment)=> {
          event.item.data = assignment
        }
      });
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);

    }
    console.log(event.item.data);
  }
}
