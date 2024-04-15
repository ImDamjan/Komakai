import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';
import { StateService } from '../../services/state.service';
import { Priority } from '../../models/priority/priority';
import { State } from '../../models/state/state';
import { User } from '../../models/user/user';
import { UserService } from '../../services/user.service';
import { PriorityService } from '../../services/priority.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task/task';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment/comment';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { UpdateTask } from '../../models/task/update-task';
import { error } from 'console';
import { DateConverterService } from '../../services/date-converter.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit,OnDestroy{
  private assignment_service = inject(AssignmentService);
  private jwt_service = inject(JwtDecoderService);
  private state_service =  inject(StateService);
  private user_service = inject(UserService);
  private priority_service = inject(PriorityService);
  private comment_service = inject(CommentService);
  private dialogRef = inject(MatDialogRef<TaskDetailsComponent>);
  private date_task_service = inject(DateConverterService);
  private data : any =  inject(MAT_DIALOG_DATA)




  public comments : Comment[] = []

  public commentText : string = "";
  public assignment! : Task;
  public dependentTasks : Task[] = [];
  public hasDependent : boolean = true;



//update props
  private selectedAssignees : number[] = [];
  private selectedDependentOn : number[] = []
  public showUpdate : boolean = false;
  public showDropdown :boolean = false;
  public showDropdownTask : boolean = false;

  public currentDueDate = "";
  public priorities : Priority[] = [];
  public states : State[] = [];
  public projectAssignments:Task[] = []
  public projectUsers : User[] = [];  
  public percentageChange : number = 0;

  public updateObj: UpdateTask = {
    taskGroupId: 0,
    userIds: [],
    start: new Date(),
    end: new Date(),
    dependentOn: [],
    stateId: 0,
    percentage: 0,
    title: '',
    type: '',
    description: '',
    priorityId: 0
  }
  


  constructor() {

  }
  ngOnDestroy(): void {
    this.closeOverlay();
  }
  ngOnInit(): void {
    this.assignment = this.data[0];
    console.log(this.assignment);



    this.assignment_service.getDependentAssignmentsFor(this.assignment.id).subscribe({
      next : (tasks : Task[]) => {
        if(tasks.length > 0)
            this.hasDependent = false;
        this.dependentTasks = tasks;
        console.log(tasks);
      }
    })
    this.comment_service.getAllComentsByTask(this.assignment.id).subscribe({
      next : (comments : Comment[]) =>{
        this.comments = comments;
        comments.forEach(comment => {
          comment.editedTime = new Date(comment.editedTime);
          comment.postTime = new Date(comment.postTime);
        });
      }
    });
  }
  updateTask()
  {
    this.updateObj.percentage = this.assignment.percentage;
    this.updateObj.type = this.assignment.type;
    this.updateObj.description = this.assignment.description;
    this.updateObj.priorityId = this.assignment.priority.id;
    this.updateObj.stateId = this.assignment.state.id;
    this.updateObj.start = this.assignment.start;
    this.updateObj.end = this.assignment.end;
    this.updateObj.title = this.assignment.title;
    this.updateObj.taskGroupId = this.assignment.taskGroup.id;
    this.showUpdate = true;
    this.percentageChange = this.assignment.percentage;
    //godina mesec dan
    this.currentDueDate = this.transformDate(this.assignment.end);

    //priorteti
    this.priority_service.getPriorities().subscribe({
      next : (prios : Priority[]) =>
        {
          this.priorities = prios;
        }
    });
    //project_users
    this.user_service.getProjectUsers(this.assignment.taskGroup.projectId).subscribe({
      next : (users : User[])=>
        {
          this.projectUsers = users;
          users.forEach(user => {
            if(this.assignment.assignees.find((a)=>a.id==user.id)!==undefined)
              {
                this.selectedAssignees.push(user.id);
              }
          });
        }
    });
    //projectAssignments
    this.assignment_service.getAllProjectAssignments(this.assignment.taskGroup.projectId).subscribe({
      next : (tasks : Task[]) =>
        {
          this.projectAssignments = tasks.filter((task)=>task.id!=this.assignment.id);

          this.dependentTasks.forEach(task => {
            if(this.projectAssignments.find((a)=>a.id==task.id) !==undefined)
              {
                this.selectedDependentOn.push(task.id);
              }
          });
        }
    })
    //states
    this.state_service.fetchAllStates().subscribe({
      next : (states : State[]) => 
      {
          this.states = states;
      }
    })
  }

  createUpdateRequest()
  {
    this.updateObj.end = new Date(this.currentDueDate);
    this.updateObj.dependentOn = this.selectedDependentOn;
    this.updateObj.userIds = this.selectedAssignees;
    if(this.selectedAssignees.length > 0)
    {
      this.assignment_service.updateAssignmentById(this.updateObj,this.assignment.id).subscribe
      ({
        next : (updatedTask :Task) =>
          {
            this.assignment = updatedTask;
            this.date_task_service.setDateParametersForTask(this.assignment);
            confirm("Task successfully updated!");
            this.showUpdate = false;
          },
          error :(error)=>
          {
              alert("Task update failed!");
              console.log(error);
          }
      });
    }
    else
    {
      alert("there must be at least one perosn that is assigned to this task");
    }
  }

  createComment()
  {
    let token = this.jwt_service.getToken();
    if(token!=null)
    {
      let decode = this.jwt_service.decodeToken(token);
      let obj = {
        content: this.commentText,
        userId: decode.user_id,
        assignmentId: this.assignment.id
      };
      if(obj.content!=="")
      {
        this.comment_service.createComment(obj).subscribe({
          next: (comm : Comment)=>{
            comm.editedTime = new Date(comm.editedTime);
            comm.postTime = new Date(comm.postTime);
            this.comments.push(comm);
          }
        });
      }
    }
  }

  closeOverlay()
  {
    
    this.dialogRef.close(this.assignment);
  }

  

  private transformDate(date : Date) : string
  {
    let splited =date.toLocaleDateString().split('/');
    for (let i = 0; i < splited.length; i++) {
      if(splited[i].length == 1)
        {
          splited[i] = "0"+splited[i];
        }
      
    }
    return splited[2] + "-" + splited[0] + "-" + splited[1];
  }

  toggleUserSelection(user_id: number,event: Event) {
    event.stopPropagation();
    if(this.isSelected(user_id))
      this.selectedAssignees = this.selectedAssignees.filter(id=>id!==user_id);
    else
      this.selectedAssignees.push(user_id);
    console.log(this.selectedAssignees);
  }

  isSelected(userid: number) {
    return this.selectedAssignees.includes(userid);
  }
  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  toggleDropdownTask()
  {
    this.showDropdownTask = !this.showDropdownTask;
  }
  isSelectedTask(task_id:number)
  {
    return this.selectedDependentOn.includes(task_id);
  }

  toggleTaskSelection(task_id:number, event: Event)
  {
    event.stopPropagation();
    if(this.isSelectedTask(task_id))
      this.selectedDependentOn = this.selectedDependentOn.filter(id=>id !== task_id);
    else
      this.selectedDependentOn.push(task_id);
  }
  cancelUpdateRequest()
  {
    this.showUpdate=false;
  }

}
