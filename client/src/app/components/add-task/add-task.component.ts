import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { State } from '../../models/state';
import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';
import { TaskGroup } from '../../models/task-group';
import { TaskGroupService } from '../../services/task-group.service';
import { AssignmentService } from '../../services/assignment.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { PriorityService } from '../../services/priority.service';
import { Priority } from '../../models/priority';
import { Task } from '../../models/task';
import { CreateTask } from '../../models/create-task';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

  private data : any =  inject(MAT_DIALOG_DATA)
  public state : State;
  public showDropdown: boolean;
  public showDropdownTask : boolean;
  public users : User[] = [];
  public taskGroups : TaskGroup[] = [];
  public message : string = "";
  private selectedAssignees : number[] = []
  private selectedDependentOn : number[] = [];
  public createTaskObj : CreateTask = {
    title: "",
    type: "",
    description: "",
    start: 0,
    end: 0,
    taskGroupId: 0,
    dependentOn: [],
    assignees: [],
    stateId: 0,
    priorityId: 4,
    owner: 0
  };

  
  // "taskGroupId": 0,
  // "userIds": [
  //   0
  // ],
  // "start": "2024-04-06T16:22:07.002Z",
  // "end": "2024-04-06T16:22:07.002Z",
  // "dependentOn": [
  //   0
  // ],
  // "title": "string",
  // "type": "string",
  // "description": "string",
  // "priorityId": 0,
  // "stateId": 0
  
  //ovako moze da se dodaje umesto da se pise u konstruktor
  private dialogRef = inject(MatDialogRef<AddTaskComponent>);
  private stateService =  inject(StateService);
  private userService = inject(UserService);
  private taskGroupService =  inject(TaskGroupService);
  private userId : number = 0;
  private assignmentService = inject(AssignmentService);
  private decoder = inject(JwtDecoderService);
  private priority_service = inject(PriorityService);
  public assignments : Task[] = [];
  public priorities : Priority[] = [];

  constructor() { 
    this.showDropdown = false;
    this.showDropdownTask = false;
    this.state = {
      id : 0,
      name : ""
    }
  }
  ngOnInit(): void {
    let token = this.decoder.getToken();
    if(token!=null)
    {
      let decode = this.decoder.decodeToken(token);
      this.userId = decode.user_id;
    }
      this.assignments = this.data[2];
  
    this.priority_service.getPriorities().subscribe({
      next : (prios :Priority[]) =>{
        this.priorities = prios;
      }
    })
    this.stateService.fetchStateName(Number(this.data[0])).subscribe({
      next : (stateName : string) => {
        this.state = {id : Number(this.data[0]), name : stateName};
        this.createTaskObj.stateId = this.state.id;
      },
      error: (error)=> console.log(error)
    })
    console.log(this.data);
    this.userService.getProjectUsers(Number(this.data[1])).subscribe({
      next : (users: User[])=>{this.users = users}
    });

    this.taskGroupService.getAllProjectTaskGroups(this.data[1]).subscribe({
      next : (groups: TaskGroup[])=> {this.taskGroups = groups},
      error:(error: any)=> console.log(error)
    });

    
  }

  createTask() : void{
    this.message = "";
    this.createTaskObj.assignees = this.selectedAssignees;
    this.createTaskObj.dependentOn = this.selectedDependentOn;
    this.createTaskObj.owner = this.userId;
    console.log(this.createTaskObj);
    if(this.createTaskObj.assignees.length == 0 || this.createTaskObj.description =="" || this.createTaskObj.end== 0 || this.createTaskObj.start==0 || this.createTaskObj.taskGroupId==0)
    {
      this.message = "Form is not filled properly, check if you entered everything correctly.";
      return;
    }
    let todayTime = new Date();
    this.createTaskObj.end = new Date(this.createTaskObj.end);
    this.createTaskObj.start = new Date(this.createTaskObj.start);
    //provera da li je end pre starta
    if(this.createTaskObj.end < this.createTaskObj.start)
    {
      this.message = "End date comes before start date.";
      return;
    }
    todayTime.setHours(0, 0, 0, 0);
    this.createTaskObj.start.setHours(0,0,0,0);
    // console.log(todayTime);
    // console.log(this.createTaskObj.start);
    //prvera da li je start date pre danasnjeg
    if(this.createTaskObj.start < todayTime)
    {
      this.message = "Start date comes before today.";
      return;

    }
    console.log(this.createTaskObj);
    this.assignmentService.createAssignment(this.createTaskObj).subscribe({
      next : (asign : Task) => {
        console.log("Creation succesful");
        confirm("Task created successfully!");
        this.closeOverlay();
      },
      error: (error)=> console.log(error)
    });

     
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
  closeOverlay(): void {
    // Close the overlay dialog
    this.dialogRef.close();
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
}
