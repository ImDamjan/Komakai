import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../enviroments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{
  
  userId: number = -1;
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const token = localStorage.getItem('jwtToken');
    console.log(token);
    if (token) {
      const decodedToken: any = jwtDecode(token);
      this.userId = decodedToken['nameidentifier'];
      console.log(this.userId);
    } else {
      console.error('JWT token not found in local storage');
    }
  }

   getProjectsData(): Observable<any[]> {
    
    //uzimanje id-a iz tokena
    const token = localStorage.getItem('token');
    console.log(token);
    if (token) {
      const decodedToken: any = jwtDecode(token);
      console.log(decodedToken); 
      this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
      console.log(this.userId);
    } else {
      console.error('JWT token not found in local storage');
    }

    //deo za uzimanje projekata
    if (!this.userId) {
      return of([]);
    }
    const apiUrl = `${this.baseUrl}/Project/userProjects/${this.userId}`;
    return this.http.get<any[]>(apiUrl);
  }
}
