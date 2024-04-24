import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { User } from '../models/user/user';
import { UpdateUser } from '../models/user/update-user';

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

  updateUser(body: UpdateUser) : Observable<User>
  {
    const url = this.baseUrl + "/User/updateUserInfo/"+body.id;

    return this.http.put<User>(url,body);
  }

  uploadProfilePicture(userId: number, formData: FormData): Observable<any> {
    const url = `${this.baseUrl}/User/${userId}/uploadProfilePicture`;
  
    return this.http.post<any>(url, formData);
  }
  
  
}
