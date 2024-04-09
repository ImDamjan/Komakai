import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AssignmentService } from '../../services/assignment.service';
import { StateService } from '../../services/state.service';
import { Priority } from '../../models/priority';
import { State } from '../../models/state';
import { User } from '../../models/user';
import { Assignment } from '../../models/assignment';
import { UserService } from '../../services/user.service';
import { PriorityService } from '../../services/priority.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Task } from '../../models/task';
import { CommentService } from '../../services/comment.service';
import { Comment } from '../../models/comment';
import { JwtDecoderService } from '../../services/jwt-decoder.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit{
  private assignment_service = inject(AssignmentService);
  private jwt_service = inject(JwtDecoderService);
  private state_service =  inject(StateService);
  private user_service = inject(UserService);
  private priority_service = inject(PriorityService);
  private comment_service = inject(CommentService);
  private dialogRef = inject(MatDialogRef<TaskDetailsComponent>);
  private data : any =  inject(MAT_DIALOG_DATA)

  public comments : Comment[] = []

  public commentText : string = "";


  public priority :string = "";
  public state: string = "";
  public Owner: User = {
    id: 0,
    username: '',
    email: '',
    jobTitle: '',
    organisation: '',
    department: '',
    roleId: '',
    name: '',
    lastname: ''
  };
  public assignees : User[] = [];
  public assignment! : Task;
  public dependentTasks : Task[] = [];
  public hasDependent : boolean = true;
  constructor() {

  }
  //zbog ovoga mozda treba izmena dto-a na backu ?
  //vracati cele stateove, prioritete?
  // vracati cele usere?
  ngOnInit(): void {
    this.assignment = this.data[0];
    this.assignment_service.getDependentAssignmentsFor(this.assignment.id).subscribe({
      next : (tasks : Task[]) => {
        if(tasks.length > 0)
            this.hasDependent = false;
        this.dependentTasks = tasks;
      }
    })
    this.user_service.getAssignmentUsers(this.assignment.id).subscribe({
      next: (users : User[]) =>{
        this.assignees = users;
        console.log(users);
      }
    });
    this.comment_service.getAllComentsByTask(this.assignment.id).subscribe({
      next : (comments : Comment[]) =>{
        this.comments = comments;
        comments.forEach(comment => {
          comment.editedTime = new Date(comment.editedTime);
          comment.postTime = new Date(comment.postTime);
        });
      }
    });
    this.state_service.fetchStateName(this.assignment.stateId).subscribe({
      next : (name : string)=> {
        this.state =name;
      }
    });
    this.priority_service.fetchPriorityName(this.assignment.priorityId).subscribe({
      next :(name : string) => {
        this.priority = name;
      }
    });
    this.user_service.getUserById(this.assignment.owner).subscribe({
      next :(user : User) => {
        this.Owner = user;
      }
    });
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

      this.comment_service.createComment(obj).subscribe({
        next: (comm : Comment)=>{
          comm.editedTime = new Date(comm.editedTime);
          comm.postTime = new Date(comm.postTime);
          this.comments.push(comm);
        }
      });
    }
  }

  closeOverlay()
  {
    this.dialogRef.close();
  }
}
