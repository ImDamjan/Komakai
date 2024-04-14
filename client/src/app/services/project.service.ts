import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';
import { Project } from '../models/project/project';
import { JwtDecoderService } from './jwt-decoder.service';
import { ProjectFilter } from '../models/project/project-filter';

@Injectable({
  providedIn: 'root'
})
export class ProjectService implements OnInit{
  
  userId: number = -1;
  baseUrl = environment.apiUrl;
  private jwtDecoder = inject(JwtDecoderService);

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

   getProjectsData(): Observable<Project[]> {
    
    //uzimanje id-a iz tokena
    // const token = localStorage.getItem('token');
    // if (token) {
    //   const decodedToken: any = jwtDecode(token);
    //   this.userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
    // } else {
    //   console.error('JWT token not found in local storage');
    // }

    let token = this.jwtDecoder.getToken();
    let id = 0;
    if(token!=null)
    {
      let decode = this.jwtDecoder.decodeToken(token);
      id = decode.user_id;
    }
    //deo za uzimanje projekata
    if (id===0) {
      return of([]);
    }

    const apiUrl = `${this.baseUrl}/Project/userProjects/${id}`;
    return this.http.get<Project[]>(apiUrl);
    }

    //pravljenje projekta
    createProject(project: any): Observable<Project> {
      const url = this.baseUrl + "/Project/create";
      const body = {
        userIds : project.userIds,
        priorityId : project.priorityId,
        title : project.title,
        start : project.start,
        end : project.end,
        budget : project.budget,
        desciption : project.desciption,
        type : project.type
      }
      return this.http.post<Project>(url,body);
  }

  getProjectById(projectId: number): Observable<Project> {
    const url = `${this.baseUrl}/Project/getProject/${projectId}`; 
    return this.http.get<Project>(url);
  }
}
