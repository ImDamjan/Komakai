import { Component } from '@angular/core';
import { State } from '../../models/state/state';
import { Priority } from '../../models/priority/priority';
import { StateService } from '../../services/state.service';
import { PriorityService } from '../../services/priority.service';

@Component({
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrl: './filter-details.component.css'
})
export class FilterDetailsComponent {

  states: State[] = [];

  priorities: Priority[] = [];

  constructor(private state: StateService,private priority: PriorityService){}

  ngOnInit(){

    this.state.fetchAllStates().subscribe(states =>{
      this.states = states;
      // console.log(states);
    })

    this.priority.getPriorities().subscribe(priorities =>{
      this.priorities = priorities;
      console.log(this.priorities);
    })

  }

  sliderValue: number = 50;

}
