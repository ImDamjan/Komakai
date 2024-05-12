import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskGroup } from '../models/task/task-group';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskGroupService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  constructor() { }

  getAllProjectTaskGroups(project_id:number) : Observable<TaskGroup[]>
  {
    const url = this.baseUrl + "/TaskGroup/getTaskGroupsByProjectId/"+project_id;
    return this.http.get<TaskGroup[]>(url);
  }
  getAllProjectTaskGroupsWithAssignments(project_id:number): Observable<TaskGroup>
  {
    const url = this.baseUrl+"/TaskGroup/getTaskGroupsByProjectWithTasks/" + project_id;
    return this.http.get<TaskGroup>(url);
  }
}
