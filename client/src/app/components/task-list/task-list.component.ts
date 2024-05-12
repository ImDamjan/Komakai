import { Component, OnInit, inject } from '@angular/core';
import { TaskGroup } from '../../models/task/task-group';
import { ListFlatNode } from '../../models/list-flat-node';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {FlatTreeControl} from '@angular/cdk/tree';
import { AssignmentService } from '../../services/assignment.service';
import { TaskGroupService } from '../../services/task-group.service';
import { ActivatedRoute } from '@angular/router';
import { DateConverterService } from '../../services/date-converter.service';


@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent{
  private convertDate = inject(DateConverterService);
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
    console.log(smth);
    if(smth.assignees!==undefined)
      return true;
    return false;
  }

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  // constructor() {
  //   this.dataSource.data = TREE_DATA;
  // }
  hasChild = (_: number, node: ListFlatNode) => {console.log(node); return node.expandable};
  
  private projectId : number = 0;
  private route = inject(ActivatedRoute);
  private task_service = inject(TaskGroupService);
  constructor() {
    this.projectId = Number(this.route.snapshot.paramMap.get('projectId'));
  }
  ngOnInit(): void {
    this.task_service.getAllProjectTaskGroupsWithAssignments(this.projectId).subscribe({
      next : (group: TaskGroup) => {this.dataSource.data = [group]; console.log(this.dataSource.data);}
    });
  }
}
