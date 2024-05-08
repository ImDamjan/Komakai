import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../environments/environment';
import { Task } from '../models/task/task';
import { jwtDecode } from 'jwt-decode';
import { UpdateTask } from '../models/task/update-task';
import { TaskFilter } from '../models/task/task-filter';

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

  getAllUserAssignments(user_id: number,params: TaskFilter = {}): Observable<Task[]> {
    const url = this.baseUrl + `/Assignment/getByUser/${user_id}`;

    let httpParams = new HttpParams();
    
    if (params.propertyName) {
      httpParams = httpParams.set('PropertyName', params.propertyName);
    }
    if (params.sortFlag) {
      httpParams = httpParams.set('SortFlag', params.sortFlag.toString());
    }
    if (params.pageNumber) {
      httpParams = httpParams.set('PageNumber', params.pageNumber.toString());
    }
    if (params.pageSize) {
      httpParams = httpParams.set('PageSize', params.pageSize.toString());
    }
    if (params.searchTitle) {
      httpParams = httpParams.set('SearchTitle', params.searchTitle);
    }
    if (params.startFrom) {
      httpParams = httpParams.set('StartFrom', params.startFrom.toDateString());
    }
    if (params.startTo) {
      httpParams = httpParams.set('StartTo', params.startTo.toDateString());
    }
    if (params.endFrom) {
      httpParams = httpParams.set('EndFrom', params.endFrom.toDateString());
    }
    if (params.endTo) {
      httpParams = httpParams.set('EndTo', params.endTo.toDateString());
    }
    if (params.stateFilter) {
      params.stateFilter.forEach(element => {
        if(!httpParams.has("StateFilter"))
          httpParams = httpParams.set('StateFilter',element.toString());
        else
          httpParams = httpParams.append("StateFilter",element.toString());
      });
    }
    if (params.projects) {
      params.projects.forEach(element => {
        if(!httpParams.has("projects"))
          httpParams = httpParams.set('projects',element.toString());
        else
          httpParams = httpParams.append("projects",element.toString());
      });
    }
    if (params.percentageFilterFrom) {
      httpParams = httpParams.set('PercentageFilterFrom', params.percentageFilterFrom.toString());
    }
    if (params.percentageFilterTo) {
      httpParams = httpParams.set('PercentageFilterTo', params.percentageFilterTo.toString());
    }
    if (params.priorityFilter) {
      params.priorityFilter.forEach(element => {
        if(!httpParams.has("PriorityFilter"))
          httpParams = httpParams.set('PriorityFilter', element.toString());
        else
          httpParams = httpParams.append("PriorityFilter",element.toString());
      });
    }

    return this.http.get<Task[]>(url, { params: httpParams });
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
