import { Component, OnInit, inject } from '@angular/core';
import { TaskGroupService } from '../../services/task-group.service';
import { Task } from '../../models/task/task';
import { TaskGroup } from '../../models/task/task-group';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-add-task-group',
  templateUrl: './add-task-group.component.html',
  styleUrl: './add-task-group.component.css'
})
export class AddTaskGroupComponent implements OnInit{
  private task_group_service = inject(TaskGroupService);
  private spinner = inject(NgxSpinnerService);
  private data = inject(MAT_DIALOG_DATA);
  private dialogRef = inject(MatDialogRef<AddTaskGroupComponent>);
  public title: string = "";
  public createTaskGroup : TaskGroup = {
    id: 0,
    title: '',
    projectId: 0,
    parentTaskGroupId: 0,
    assignments: []
  };
  ngOnInit(): void {
    this.createTaskGroup.projectId = this.data[0];
    this.createTaskGroup.parentTaskGroupId = this.data[1].id;
  }
  createGroup()
  {
    if(this.title!=="")
    {
      this.spinner.show();
      this.createTaskGroup.title = this.title;
      this.task_group_service.createTaskGroup(this.createTaskGroup).subscribe({
        next : (group:any)=>{
          this.spinner.hide();
          this.dialogRef.close();
        }
      });
    }
    else
      alert("Please enter the name");
  }

}
