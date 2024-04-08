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

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private assignment_service = inject(AssignmentService);
  private state_service =  inject(StateService);
  private user_service = inject(UserService);
  private priority_service = inject(PriorityService);

  public priority! :string;
  public state!: string;
  public Owner!: User;
  public assignees : User[] = [];
  public asignment! : Assignment;
  public dependentTasks : Assignment[] = [];
  private taskId : Number = 0;
  constructor() {
    this.taskId = Number(this.route.snapshot.paramMap.get('taskId'));
  }
  //zbog ovoga mozda treba izmena dto-a na backu ?
  ngOnInit(): void {
    this.assignment_service.getAssignmentById(this.taskId.valueOf()).subscribe({
      next : (assignment: Assignment)=>{
        this.asignment = assignment;
        this.state_service.fetchStateName(assignment.stateId.valueOf()).subscribe({
          next : (name : string)=> {
            this.state =name;
          }
        });
        this.priority_service.fetchPriorityName(assignment.priorityId.valueOf()).subscribe({
          next :(name : string) => {
            this.priority = name;
          }
        });
        this.user_service.getUserById(assignment.owner).subscribe({
          next :(user : User) => {
            this.Owner = user;
          }
        });
      }
    });
  }
}
