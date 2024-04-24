import { HttpClient, HttpParams } from '@angular/common/http';
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

  getProjectsData(params: ProjectFilter = {}): Observable<Project[]> {
  
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
    if (params.dateStartFlag) {
      httpParams = httpParams.set('DateStartFlag', params.dateStartFlag.toString());
    }
    if (params.start) {
      httpParams = httpParams.set('Start', params.start.toString());
    }
    if (params.dateEndFlag) {
      httpParams = httpParams.set('DateEndFlag', params.dateEndFlag.toString());
    }
    if (params.end) {
      httpParams = httpParams.set('End', params.end.toString());
    }
    if (params.stateFilter) {
      httpParams = httpParams.set('StateFilter', params.stateFilter.toString());
    }
    if (params.percentageFlag) {
      httpParams = httpParams.set('PercentageFlag', params.percentageFlag.toString());
    }
    if (params.percentageFilter) {
      httpParams = httpParams.set('PercentageFilter', params.percentageFilter.toString());
    }
    if (params.priorityFilter) {
      httpParams = httpParams.set('PriorityFilter', params.priorityFilter.toString());
    }
    if(params.budgetFilter){
      httpParams = httpParams.set('BudgetFilter',params.budgetFilter.toString());
    }
    if(params.budgetFlag){
      httpParams = httpParams.set('BudgetFlag',params.budgetFlag.toString());
    }
    if(params.spentFilter){
      httpParams = httpParams.set('SpentFilter',params.spentFilter.toString());
    }
    if(params.spentFlag){
      httpParams = httpParams.set('SpentFlag',params.spentFlag.toString());
    }

    const apiUrl = `${this.baseUrl}/Project/userProjects/${id}`;
    return this.http.get<Project[]>(apiUrl,{ params: httpParams });
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
      description : project.description,
      type : project.type
    }
    return this.http.post<Project>(url,body);
  }

  getProjectById(projectId: number): Observable<Project> {
    const url = `${this.baseUrl}/Project/getProject/${projectId}`; 
    return this.http.get<Project>(url);
  }

  updateProject(projectId: number, project: Project): Observable<Project> {
    const url = this.baseUrl + `/Project/update/${projectId}`;
    const body = {
      id: projectId,
      members: project.users.map(user => user.id),
      title: project.title,
      stateId: project.state.id,
      priorityId: project.priority.id,
      description: project.description,
      start: project.start,
      end: project.end,
      spent: project.spent,
      percentage: project.percentage
    };
      return this.http.put<Project>(url,body);
  }
}