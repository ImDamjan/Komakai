import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseUrl}/User`);
  }

  getProjectUsers(project_id : number) : Observable<User[]>
  {
    const url = this.baseUrl + "/User/getProjectUsers/" + project_id;
    return this.http.get<User[]>(url);
  }
  getUserById(user_id : number) : Observable<User>
  {
    const url = this.baseUrl + "/User/getUserById/" + user_id;
    return this.http.get<User>(url);
  }

  getAssignmentUsers(asign_id:number) : Observable<User[]>
  {
    const url = this.baseUrl + "/User/getAssignmentUsers/"+asign_id;
    return  this.http.get<User[]>(url);
  }
}
