import { Component, inject } from '@angular/core';
import { State } from '../../models/state/state';
import { Priority } from '../../models/priority/priority';
import { StateService } from '../../services/state.service';
import { PriorityService } from '../../services/priority.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';

@Component({
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrl: './filter-details.component.css'
})
export class FilterDetailsComponent {

  states: State[] = [];

  priorities: Priority[] = [];

  sliderValue: number = 50;

  selectedState: number=0;

  selectedPriority: number=0;

  startDate: Date | null = null;

  endDate: Date | null = null;

  private filterDialog = inject(MatDialogRef<FilterDetailsComponent>);

  constructor(private state: StateService,private priority: PriorityService){}

  ngOnInit(){

    this.state.fetchAllStates().subscribe(states =>{
      this.states = states;
      // console.log(this.states);
    })

    this.priority.getPriorities().subscribe(priorities =>{
      this.priorities = priorities;
      // console.log(this.priorities);
    })

    const storedState = localStorage.getItem('selectedState');
    const storedPriority = localStorage.getItem('selectedPriority');

    if (storedState) {
      this.selectedState = parseInt(storedState);
    }

    if (storedPriority) {
      this.selectedPriority = parseInt(storedPriority);
    }

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
  }

  cancelFilters(){
    this.filterDialog.close();
  }

  confirmFilters(){
    // console.log(this.selectedState)
    // console.log(this.selectedPriority)
    // console.log(this.startDate)
    // console.log(this.endDate)
    localStorage.setItem('selectedState', this.selectedState.toString());
    localStorage.setItem('selectedPriority', this.selectedPriority.toString());
    // localStorage.setItem('startDate', (this.startDate?.toString()) as string);
    // localStorage.setItem('endDate', (this.endDate?.toString()) as string);
    this.filterDialog.close();
  }

}
