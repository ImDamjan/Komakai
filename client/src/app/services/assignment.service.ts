import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../environments/environment';
import { Task } from '../models/task/task';
import { jwtDecode } from 'jwt-decode';
import { UpdateTask } from '../models/task/update-task';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  constructor() { }


  getAllProjectAssignments(project_id : number) : Observable<Task[]>
  {
    const url = this.baseUrl + "/Assignment/getAssignmentsByProject/"+project_id;
    return this.http.get<Task[]>(url);
  }

  updateAssignmentById(body : UpdateTask, asign_id: number) : Observable<Task>
  {
    const url = this.baseUrl + "/Assignment/update/" + asign_id;
    return this.http.put<Task>(url,body);
  }
  getDependentAssignmentsFor(asign_id:number) : Observable<Task[]>
  {
    const url = this.baseUrl + "/Assignment/getDependentOnAssignments/" + asign_id;
    return this.http.get<Task[]>(url);
  }
  getAssignmentById(asign_id:number): Observable<Task>
  {
    return this.http.get<Task>(this.baseUrl + "/Assignment/getById/" + asign_id);
  }

  getAllUserAssignments(user_id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.baseUrl+`/Assignment/getByUser/` + user_id);
  }

  createAssignment(createAssignmentData : any) : Observable<Task>
  {
    const url = this.baseUrl + "/Assignment/create";
    return this.http.post<Task>(url,createAssignmentData);
  }
  // getAllTasks(): Observable<Task[]> { // Specify Task[] as the expected response type

  //   const token = localStorage.getItem('token');

  //   let nameidentifier = '';

  //   if (token) {
  //     try {
  //       const decodedToken = jwtDecode(token) as { 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier': string };
  //       nameidentifier = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
  //       console.log(nameidentifier)
  //     } catch (error) {
  //       console.error('Error decoding JWT token:', error);
  //     }
  //   }

  //   return this.http.get<Task[]>(this.baseUrl+`/Assignment/getByUser/` + nameidentifier);
  // }
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
