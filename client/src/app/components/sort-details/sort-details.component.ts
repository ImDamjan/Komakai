import { Component, inject } from '@angular/core';
import { State } from '../../models/state/state';
import { Priority } from '../../models/priority/priority';
import { StateService } from '../../services/state.service';
import { PriorityService } from '../../services/priority.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { TaskFilter } from '../../models/task/task-filter';
import { FilterDataService } from '../../services/filterdata.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';

@Component({
  selector: 'app-sort-details',
  templateUrl: './sort-details.component.html',
  styleUrl: './sort-details.component.css'
})
export class SortDetailsComponent {

  private data : any =  inject(MAT_DIALOG_DATA)

  filter: TaskFilter = {};

  sortGroup: FormGroup;

  private sortDialog = inject(MatDialogRef<SortDetailsComponent>);

  constructor(private fb: FormBuilder){
    this.sortGroup = this.fb.group({
      property: [''],
      flag: [null]
    })
  }

  ngOnInit(){
    this.filter = this.data[0];
  }

}
