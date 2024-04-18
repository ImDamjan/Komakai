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

    // const storedState = localStorage.getItem('selectedState');
    // const storedPriority = localStorage.getItem('selectedPriority');

    // if (storedState) {
    //   this.selectedState = parseInt(storedState);
    // }

    // if (storedPriority) {
    //   this.selectedPriority = parseInt(storedPriority);
    // }

    // const storedStartDate = localStorage.getItem('startDate');
    // const storedEndDate = localStorage.getItem('endDate');

    // if (storedStartDate) {
    //   // console.log(storedStartDate)
    //   this.startDate = moment(storedStartDate, "YYYY-MM-DD").toDate();
    //   console.log(this.startDate)
    // }
    // else{
    //   this.startDate = null;
    // }

    // if (storedEndDate) {
    //   // console.log(storedEndDate)
    //   this.endDate = new Date(storedEndDate);
    //   // console.log(this.endDate)
    // }
    // else{
    //   this.endDate = null;
    // }    

    // const storedStartDateSelection = localStorage.getItem('startDateSelection');
    // const storedEndDateSelection = localStorage.getItem('endDateSelection');

    // this.formGroup.controls['startDateSelection'].setValue(storedStartDateSelection || null);
    // this.formGroup.controls['endDateSelection'].setValue(storedEndDateSelection || null);

  }

  cancelFilters(){
    this.filterDialog.close();
  }

  confirmFilters(){
    // console.log(this.selectedState)
    // console.log(this.selectedPriority)
    // console.log(this.startDate)
    // console.log(this.endDate)
    // localStorage.setItem('selectedState', this.selectedState.toString());
    // localStorage.setItem('selectedPriority', this.selectedPriority.toString());
    // localStorage.setItem('startDate', (this.startDate?.toString()) as string);
    // localStorage.setItem('endDate', (this.endDate?.toString()) as string);
    // const startRadioLess = document.getElementById('less-start') as HTMLInputElement;
    // const startRadioMore = document.getElementById('more-start') as HTMLInputElement;
    // const endRadioLess = document.getElementById('less-end') as HTMLInputElement;
    // const endRadioMore = document.getElementById('more-end') as HTMLInputElement;

    // const startDateSelection = this.formGroup.get('startDateSelection')?.value;
    // const endDateSelection = this.formGroup.get('endDateSelection')?.value;

    // console.log(startDateSelection,endDateSelection)

    // localStorage.setItem('startDateSelection', startDateSelection?.toString());
    // localStorage.setItem('endDateSelection', endDateSelection?.toString());

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
