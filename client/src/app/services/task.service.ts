import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { environment } from '../enviroments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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

    return this.http.get<any>(this.apiUrl+`/Assignment/getByUser/` + nameidentifier);
  }
}