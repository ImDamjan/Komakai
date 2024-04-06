import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../enviroments/environment';
import { Assignment } from '../models/assignment';
import { Task } from '../models/task';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
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


  getAllUserAssignments(user_id: Number): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.baseUrl+`/Assignment/getByUser/` + user_id);
  }

  createAssignment(createAssignmentData : any) : Observable<Assignment>
  {
    const url = this.baseUrl + "/Assignment/create";
    return this.http.post<Assignment>(url,createAssignmentData);
  }
  getAllTasks(): Observable<Task[]> { // Specify Task[] as the expected response type

    const token = localStorage.getItem('token');

    let nameidentifier = '';

    if (token) {
      try {
        const decodedToken = jwtDecode(token) as { 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string };
        nameidentifier = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        console.log(nameidentifier)
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }

    return this.http.get<Task[]>(this.baseUrl+`/Assignment/getByUser/` + nameidentifier);
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
