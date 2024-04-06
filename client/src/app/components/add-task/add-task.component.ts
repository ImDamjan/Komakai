import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectOverlayComponent } from '../create-project-overlay/create-project-overlay.component';
import { State } from '../../models/state';
import { StateService } from '../../services/state.service';
import { error } from 'console';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent implements OnInit {

  private data : any =  inject(MAT_DIALOG_DATA)
  public state : State;
  public showDropdown: boolean;
  public users : User[] = [];

  private selectedAssignees : Number[] = []
  
  //ovako moze da se dodaje umesto da se pise u konstruktor
  private dialogRef = inject(MatDialogRef<AddTaskComponent>);
  private stateService =  inject(StateService);
  private userService = inject(UserService);
  constructor() { 
    this.showDropdown = false;
    this.state = {
      id : 0,
      name : ""
    }
  }
  ngOnInit(): void {
    this.stateService.fetchStateName(Number(this.data[0])).subscribe({
      next : (stateName : string) => {this.state = {id : Number(this.data[0]), name : stateName}},
      error: (error)=> console.log(error)
    })
    console.log(this.data);
    this.userService.getProjectUsers(Number(this.data[1])).subscribe({
      next : (users: User[])=>{this.users = users}
    });
  }

  closeOverlay(): void {
    this.dialogRef.close();
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
}
