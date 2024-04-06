import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { TaskGroup } from '../models/task-group';
import { environment } from '../enviroments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskGroupService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  constructor() { }

  getAllProjectTaskGroups(project_id:Number) : Observable<TaskGroup[]>
  {
    const url = this.baseUrl + "/TaskGroup/getTaskGropsByProject/"+project_id;
    return this.http.get<TaskGroup[]>(url);
  }
}
