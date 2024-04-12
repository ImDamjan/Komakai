import { Component, OnInit, VERSION, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TaskKanban } from '../../models/kanbantask';
import { TaskCardKanbanComponent } from '../task-card-kanban/task-card-kanban.component';
import { StateService } from '../../services/state.service';
import { State } from '../../models/state';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AssignmentService } from '../../services/assignment.service';
import { stat } from 'fs';
import { Task } from '../../models/task';

@Component({
  selector: 'app-kanban',
  templateUrl: './kanban.component.html',
  styleUrl: './kanban.component.css'
})
export class KanbanComponent implements OnInit{
  name = 'Angular Material ' + VERSION.major + ' Kanban board';
   public board: Board;
   private projectId : number = 0;
   private state_service = inject(StateService);
   private assignment_service = inject (AssignmentService);
   private route = inject(ActivatedRoute);
   private assignments : Task[] = [];
   
  constructor(private dialog: MatDialog)
  {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
    this.board = new Board('Kanban', []);
  }

  showProjectDetails: boolean = true;
  showCreateButton: boolean = true;
  projectText: string = 'Project details';


  //otvaranje create Taska
  openCreateOverlay(column_id : string): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data:[column_id,this.projectId, this.assignments]
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getBoard();
      this.showProjectDetails = true;
      this.showCreateButton = true;
      this.projectText = 'Project details';
    });
    
    this.showProjectDetails = false;
    this.showCreateButton = false;
    this.projectText = 'Project details/Create task';
  }

  
  //pravljenje kanbana
  public ngOnInit(): void {
    this.getBoard();
  }

  private getBoard():void
  {
    this.state_service.fetchAllStates().subscribe({
      next : (states : State[])=>
    {
      let ids :string[]= []
      states.forEach(state => {
        ids.push(state.id + "");
      });
      
      //treba da se stavi od kliknutog projekta id
        this.assignment_service.getAllProjectAssignments(this.projectId).subscribe({
          next : (assignments : Task[])=>
        {
          this.assignments = assignments;
          let columns : Column[] = [];
          states.forEach(state => {
            let stateProjects : Task[] = [];
            assignments.forEach(assignment => {
              assignment.dummyTitle = assignment.title;
              if(assignment.title.length > 20)
              {
                let new_title = "";
                for (let i = 0; i < 20; i++) {
                  const element = assignment.title[i];
                  new_title+=element;
                }
                new_title+="...";
                assignment.dummyTitle = new_title;
              }
              if(assignment.state.id==state.id)
                stateProjects.push(assignment);
            });
            console.log(stateProjects);
          columns.push(new Column(state.name,state.id + "",stateProjects,ids));
        });
        this.board.columns = columns;
      },
      error : (error:any)=> console.log(error)
      });
      
    },
    error :(error)=> console.log(error)});
  }

  //promenjeno na interfejs Assignment(bilo je TaskCardKanbanComponent)
  public dropGrid(event: CdkDragDrop<Task[]>): void {
    moveItemInArray(this.board.columns, event.previousIndex, event.currentIndex);
  }
  //promenjeno na interfejs Assignment(bilo je TaskCardKanbanComponent)
  public drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      event.item.data.stateId = Number(event.container.id);
      // treba se menja na prave dependent taskove
      this.assignment_service.updateAssignmentById(event.item.data,[]).subscribe({
        next : (assignment : Task)=> {
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
