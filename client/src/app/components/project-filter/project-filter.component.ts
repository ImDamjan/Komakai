import { Component, OnInit, inject } from '@angular/core';
import { ProjectFilter } from '../../models/project/project-filter';
import { StateService } from '../../services/state.service';
import { PriorityService } from '../../services/priority.service';
import { State } from '../../models/state/state';
import { Priority } from '../../models/priority/priority';

@Component({
  selector: 'app-project-filter',
  templateUrl: './project-filter.component.html',
  styleUrl: './project-filter.component.css'
})
export class ProjectFilterComponent implements OnInit {
  
  projectFilter! : ProjectFilter;
  private state_service = inject(StateService);
  private priority_service = inject(PriorityService);
  public states : State[] = [];
  public priorities : Priority[] = [];
  public sortList : string[] = [
    "Last Updated",
    "State",
    "Priority",
    "Title",
    "Budget",
    "Spent",
    "Start Date",
    "End Date",
    "Progress"
  ]
  public percentageValues :number[] = [0, 100];
  public spentValues : number[] = [0,20];
  public budgetValues : number[] = [0,50];
  
  ngOnInit(): void {
    this.state_service.fetchAllStates().subscribe({
      next : (res:State[]) =>{this.states=res}
    });
    this.priority_service.getPriorities().subscribe({
      next : (res:Priority[])=>{this.priorities=res}
    })
  }

}
