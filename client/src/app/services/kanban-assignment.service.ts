import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment';
import { environment } from '../enviroments/environment';
// ovo je dummy servis NE MOJ DA KORISTITE, morace da se prepravi drugi
@Injectable({
  providedIn: 'root'
})
export class KanbanAssignmentService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  constructor() { }

  getAllProjectAssignments(project_id : Number) : Observable<Assignment[]>
  {
    const url = this.baseUrl + "/Assignment/getAssignmentsByProject/"+project_id;
    return this.http.get<Assignment[]>(url);
  }

  updateAssignmentById(asignment : Assignment) : Observable<Assignment>
  {
    const url = this.baseUrl + "/Assignment/update/" + asignment.id;
    const body = {
      taskGroupId : asignment.taskGroupId,
      userIds : asignment.assignees,
      start : asignment.start,
      end : asignment.end,
      dependentOn : asignment.dependentOn,
      stateId : asignment.stateId,
      percentage : asignment.percentage,
      title : asignment.title,
      type : asignment.type,
      description : asignment.description,
      priorityId : asignment.priorityId
    };
    return this.http.put<Assignment>(url,body);
  }
  // "taskGroupId": 1,
  // "userIds": [
  //   1,4
  // ],
  // "start": "2024-04-02T19:24:33.129Z",
  // "end": "2024-05-02T19:24:33.129Z",
  // "dependentOn": [
    
  // ],
  // "stateId": 4,
  // "percentage": 0,
  // "title": "string",
  // "type": "string",
  // "description": "string",
  // "priorityId": 2
}
