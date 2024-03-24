import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  userId: number;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
    this.userId = 1;
   }

   setUserId(userId: number) {
    this.userId = userId;
   }

   getProjectsData(): Observable<any[]> {
    if (!this.userId) {
      return of([]);
    }
    const apiUrl = `${this.baseUrl}/Project/userProjects/${this.userId}`;
    return this.http.get<any[]>(apiUrl);
  }
}
