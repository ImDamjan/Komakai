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
  selector: 'app-filter-details',
  templateUrl: './filter-details.component.html',
  styleUrl: './filter-details.component.css'
})
export class FilterDetailsComponent {

  private data : any =  inject(MAT_DIALOG_DATA)

  filter: TaskFilter = {};

  states: State[] = [];

  priorities: Priority[] = [];

  projects: Project[] = [];

  startDate: Date | undefined;

  endDate: Date | undefined;

  formGroup: FormGroup;

  formGroup2: FormGroup;

  projectStatePriority: FormGroup;

  private filterDialog = inject(MatDialogRef<FilterDetailsComponent>);

  constructor(private fb: FormBuilder,private state: StateService,private priority: PriorityService,private filterDataService: FilterDataService, private project: ProjectService){
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
    this.projectStatePriority = fb.group({
      selectedProject: [0],
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

    this.project.getProjectsData().subscribe(projects =>{
      this.projects = projects;
      // console.log(this.projects)
    });

    const storedFilter = this.filterDataService.getFilter();
    if (storedFilter) {

      this.formGroup.patchValue({
        startDateSelection: storedFilter.dateStartFlag,
        endDateSelection: storedFilter.dateEndFlag,
        startDate: storedFilter.start,
        endDate: storedFilter.end
      });

      this.projectStatePriority.patchValue({
        selectedProject: storedFilter.project_id,
        selectedState: storedFilter.stateFilter,
        selectedPriority: storedFilter.priorityFilter
      })

      this.formGroup2.get('sliderSelection')?.setValue(storedFilter.percentageFlag);
      this.formGroup2.get('sliderValue')?.setValue(storedFilter.percentageFilter);
    // Update form group values based on stored filter data (startDateSelection, endDateSelection, startDate, endDate)
    }

  }

  resetFilters() {
    this.projectStatePriority.get('selectedProject')?.setValue(0);
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
    
    this.filter.project_id = this.projectStatePriority.get('selectedProject')?.value;
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
