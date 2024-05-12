import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, ViewChild, inject, viewChild } from '@angular/core';
import { TaskGroup } from '../../models/task/task-group';
import { ListFlatNode } from '../../models/list-flat-node';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { AssignmentService } from '../../services/assignment.service';
import { TaskGroupService } from '../../services/task-group.service';
import { ActivatedRoute } from '@angular/router';
import { DateConverterService } from '../../services/date-converter.service';
import { TaskFilter } from '../../models/task/task-filter';
import { TaskFilterComponent } from '../task-filter/task-filter.component';
import { filter } from 'rxjs';
import { AddTaskComponent } from '../add-task/add-task.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit,AfterViewInit{
  private convertDate = inject(DateConverterService);
  private dialog = inject(MatDialog);
  public filter : TaskFilter = {
    sortFlag : -1,
    propertyName : "Last Updated"

  }
  @Input() searchFilter! : string; 
  @ViewChild("taskFilter") taskfilterComponent : TaskFilterComponent | undefined;  
  private _transformer = (node: TaskGroup, level: number) => {
    if(node.children!==undefined)
      {
        node.children.forEach(element => {
          if(this.isTask(element))
            this.convertDate.setDateParametersForTask(element);
        });
      }
    return {
      expandable: !!node.children && node.children.length > 0,
      node: node,
      level: level,
    };
  };
  treeControl = new FlatTreeControl<ListFlatNode>(
    node => node.level,
    node => node.expandable,
  );

  treeFlattener = new MatTreeFlattener(
    this._transformer,
    node => node.level,
    node => node.expandable,
    node => node.children,
  );
  isTask(smth : any) : boolean{
    if(smth.assignees!==undefined)
      return true;
    return false;
  }

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // constructor() {
  //   this.dataSource.data = TREE_DATA;
  // }
  hasChild = (_: number, node: ListFlatNode) => {return node.expandable};
  
  private projectId : number = 0;
  private route = inject(ActivatedRoute);
  private task_service = inject(TaskGroupService);
  constructor() {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
  }
  ngAfterViewInit(): void {
    this.taskfilterComponent?.filterEmiter.subscribe(filter=>{
      this.filter = filter;
      this.filter.searchTitle = this.searchFilter;
      // console.log(filter)
      // console.log("stigao filter");
      this.loadTasks();
    });
  }
  ngOnInit(): void {
    this.filter.searchTitle = this.searchFilter;
    this.loadTasks();
  }

  loadTasks(): void{
    this.task_service.getAllProjectTaskGroupsWithAssignments(this.projectId,this.filter).subscribe({
      next : (group: TaskGroup) => {
        this.dataSource.data = [group];
        this.treeControl.expand(this.treeControl.dataNodes[0]);
        console.log(this.dataSource.data);
      }
    });
  }

  openCreateOverlay(node:any): void {
    const dialogRef = this.dialog.open(AddTaskComponent, {
      data:[1,this.projectId,node]
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadTasks();
    });
    
  }
}
