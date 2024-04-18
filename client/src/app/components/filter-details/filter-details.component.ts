import { Component, inject } from '@angular/core';
import { State } from '../../models/state/state';
import { Priority } from '../../models/priority/priority';
import { StateService } from '../../services/state.service';
import { PriorityService } from '../../services/priority.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TaskFilter } from '../../models/task/task-filter';

@Component({
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrl: './filter-details.component.css'
})
export class FilterDetailsComponent {

  private data : any =  inject(MAT_DIALOG_DATA)

  filter: TaskFilter = {};

  states: State[] = [];

  priorities: Priority[] = [];

  sliderValue: number = 50;

  selectedState: number=0;

  selectedPriority: number=0;

  startDate: Date | undefined;

  endDate: Date | undefined;

  formGroup: FormGroup;

  private filterDialog = inject(MatDialogRef<FilterDetailsComponent>);

  constructor(private fb: FormBuilder,private state: StateService,private priority: PriorityService){
    this.formGroup = this.fb.group({
      startDateSelection: [null],
      endDateSelection: [null],
      startDate: [null],
      endDate: [null],
    });
  }

  ngOnInit(){

    this.filter = this.data[0];

    this.state.fetchAllStates().subscribe(states =>{
      this.states = states;
      // console.log(this.states);
    })

    this.priority.getPriorities().subscribe(priorities =>{
      this.priorities = priorities;
      // console.log(this.priorities);
    })

  }

  cancelFilters(){
    this.filterDialog.close();
  }

  confirmFilters(){
    
    this.filter.stateFilter = this.selectedState;
    this.filter.priorityFilter = this.selectedPriority;
    this.filter.percentageFilter = this.sliderValue;
    this.filter.dateStartFlag = this.formGroup.get('startDateSelection')?.value;
    this.filter.dateEndFlag = this.formGroup.get('endDateSelection')?.value;
    this.filter.start = this.formGroup.get('startDate')?.value;
    this.filter.end = this.formGroup.get('endDate')?.value;

    this.filterDialog.close(this.filter);
  }

}
