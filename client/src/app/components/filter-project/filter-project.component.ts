import { Component, inject } from '@angular/core';
import { State } from '../../models/state/state';
import { Priority } from '../../models/priority/priority';
import { StateService } from '../../services/state.service';
import { PriorityService } from '../../services/priority.service';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import moment from 'moment';
import { Form, FormBuilder, FormGroup } from '@angular/forms';
import { FilterDataService } from '../../services/filterdata.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project/project';
import { ProjectFilter } from '../../models/project/project-filter';
import { FilterprojectdataService } from '../../services/filterprojectdata.service';

@Component({
  selector: 'app-filter-project',
  templateUrl: './filter-project.component.html',
  styleUrl: './filter-project.component.css'
})
export class FilterProjectComponent {

  private data : any =  inject(MAT_DIALOG_DATA)

  filter: ProjectFilter = {};

  states: State[] = [];

  priorities: Priority[] = [];

  formGroup: FormGroup;

  formGroup2: FormGroup;

  projectStatePriority: FormGroup;

  private filterDialog = inject(MatDialogRef<FilterProjectComponent>);

  constructor(private fb: FormBuilder,private state: StateService,private priority: PriorityService,private filterDataService: FilterprojectdataService){
    this.formGroup = this.fb.group({
      startDateSelection: [null],
      endDateSelection: [null],
      startDate: [null],
      endDate: [null],
    });
    this.formGroup2 = this.fb.group({
      sliderValue: [50],
      sliderSelection: [null],
    });
    this.projectStatePriority = this.fb.group({
      selectedState: [0],
      selectedPriority: [0],
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

    const storedFilter = this.filterDataService.getFilter();
    if (storedFilter) {

      this.formGroup.patchValue({
        startDateSelection: storedFilter.dateStartFlag,
        endDateSelection: storedFilter.dateEndFlag,
        startDate: storedFilter.start,
        endDate: storedFilter.end
      });

      this.projectStatePriority.patchValue({
        selectedState: storedFilter.stateFilter,
        selectedPriority: storedFilter.priorityFilter
      })

      this.formGroup2.get('sliderSelection')?.setValue(storedFilter.percentageFlag);
      this.formGroup2.get('sliderValue')?.setValue(storedFilter.percentageFilter);
    }

  }

  resetFilters() {
    this.projectStatePriority.get('selectedState')?.setValue(0);
    this.projectStatePriority.get('selectedPriority')?.setValue(0);
  
    this.formGroup.reset();
    this.formGroup2.get('sliderValue')?.setValue(50);
    this.formGroup2.get('sliderSelection')?.setValue(null);
  }

  cancelFilters(){
    this.filterDialog.close();
  }

  confirmFilters(){
    
    this.filter.stateFilter = this.projectStatePriority.get('selectedState')?.value;
    this.filter.priorityFilter = this.projectStatePriority.get('selectedPriority')?.value;
    this.filter.dateStartFlag = this.formGroup.get('startDateSelection')?.value;
    this.filter.dateEndFlag = this.formGroup.get('endDateSelection')?.value;
    this.filter.start = this.formGroup.get('startDate')?.value;
    this.filter.end = this.formGroup.get('endDate')?.value;
    this.filter.percentageFlag = this.formGroup2.get('sliderSelection')?.value;
    this.filter.percentageFilter = this.formGroup2.get('sliderValue')?.value;

    this.filterDataService.setFilter(this.filter);
    this.filterDialog.close(this.filter);
  }

}
