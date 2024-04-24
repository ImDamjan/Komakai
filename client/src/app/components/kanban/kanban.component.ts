import { Component, OnInit, VERSION, inject } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem, CdkDropList } from '@angular/cdk/drag-drop';
import { Board } from '../../models/kanban/board.model';
import { Column } from '../../models/kanban/column.model';
import { TaskKanban } from '../../models/kanban/kanbantask';
import { TaskCardKanbanComponent } from '../task-card-kanban/task-card-kanban.component';
import { StateService } from '../../services/state.service';
import { State } from '../../models/state/state';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AssignmentService } from '../../services/assignment.service';
import { stat } from 'fs';
import { Task } from '../../models/task/task';
import { UpdateTask } from '../../models/task/update-task';
import { NgxSpinnerService } from 'ngx-spinner';

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
   private spinner = inject(NgxSpinnerService);
   
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
    this.spinner.show();
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
      error : (error:any)=> {console.log(error);}
      });
      this.spinner.hide();
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
    } else 
    {
      let user_ids :number[] = [];

      for (let i = 0; i < event.item.data.assignees.length; i++) {
        const element = event.item.data.assignees[i].id;
        user_ids.push(element);
        
      }
      
      let body : UpdateTask ={
        taskGroupId: event.item.data.taskGroup.id,
        userIds: user_ids,
        start: event.item.data.start,
        end: event.item.data.end,
        dependentOn: event.item.data.dependentOn,
        stateId: Number(event.container.id),
        percentage: event.item.data.percentage,
        title: event.item.data.title,
        type: event.item.data.type,
        description: event.item.data.description,
        priorityId: event.item.data.priority.id
      }
      this.assignment_service.updateAssignmentById(body,event.item.data.id).subscribe({
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
