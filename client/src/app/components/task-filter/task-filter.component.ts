import { Component, EventEmitter, Input, OnInit, inject } from '@angular/core';
import { StateService } from '../../services/state.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { PriorityService } from '../../services/priority.service';
import { ProjectService } from '../../services/project.service';
import { Priority } from '../../models/priority/priority';
import { TaskFilter } from '../../models/task/task-filter';
import { State } from '../../models/state/state';

@Component({
  selector: 'app-task-filter',
  templateUrl: './task-filter.component.html',
  styleUrl: './task-filter.component.css'
})
export class TaskFilterComponent implements OnInit {
  
  @Input() public filter! : TaskFilter;
  private state_service = inject(StateService);
  private spinner = inject(NgxSpinnerService);
  filterEmiter = new EventEmitter<TaskFilter>();
  private priority_service = inject(PriorityService);
  private projectService = inject(ProjectService);
  public states : State[] = [];
  public priorities : Priority[] = [];
  public EndRange : Date[] | undefined;
  public StartRange : Date[] | undefined;
  public sortList : string[] = [
    "Last Updated",
    "State",
    "Priority",
    "Title",
    "Start Date",
    "End Date",
    "Progress"
  ];

  selectedPrios : Priority[] = [];
  selectedStates : State[] = [];
  public percentageValues :number[] = [0, 100];
  ngOnInit(): void {
    this.spinner.show();

    this.state_service.fetchAllStates().subscribe({
      next : (res:State[]) => {this.states = res}
    })
    this.priority_service.getPriorities().subscribe({
      next : (res:Priority[])=>{this.priorities=res; this.spinner.hide();}
    })
  }
  sendSortFilter(mode:number){
    this.filter.sortFlag = mode;
    this.sendFilter();
  }
  
  sendFilter(){
    this.filter.priorityFilter = []
    this.filter.stateFilter = [];
    this.filter.percentageFilterFrom = this.percentageValues[0];
    this.filter.percentageFilterTo = this.percentageValues[1];
    if(this.EndRange!==null && this.EndRange!==undefined && this.EndRange.length > 0)
    {
      this.filter.endFrom = this.EndRange[0];
      this.filter.endTo = this.EndRange[1];
    }
    else
    {
      this.filter.endFrom = undefined;
      this.filter.endTo = undefined;

    }
    if(this.StartRange!==null && this.StartRange!==undefined && this.StartRange.length > 0)
    {
      this.filter.startFrom = this.StartRange[0];
      this.filter.startTo = this.StartRange[1];
    }
    else
    {
      this.filter.startFrom = undefined;
      this.filter.startTo = undefined;
    }
    if(this.selectedPrios.length > 0)
    {
      this.filter.priorityFilter = [];
      this.selectedPrios.forEach(prio => {
        this.filter.priorityFilter?.push(prio.id);
      });
    }
    if(this.selectedStates.length > 0)
    {
      this.filter.stateFilter = [];
      this.selectedStates.forEach(state=>{
        this.filter.stateFilter?.push(state.id);
      });
    }
    console.log(this.filter);

    this.filterEmiter.emit(this.filter);
  }
}
