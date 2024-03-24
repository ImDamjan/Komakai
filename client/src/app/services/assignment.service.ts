import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAssignmentsByProject(projectId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Assignment/getAssignmentsByProject/${projectId}`);
  }
}
