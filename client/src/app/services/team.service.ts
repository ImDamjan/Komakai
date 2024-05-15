import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/Team/getTeams`);
  }
  getMyCreatedTeams(userId : number, searchText: string = "") : Observable<Team[]>
  {
    const url = this.apiUrl + "/Team/getAllCreatedTeamsByUser/" + userId;
    let httpParams : HttpParams = new HttpParams();
    if(searchText!=="")
      httpParams.set("searchText",searchText);
    return this.http.get<Team[]>(url,{params:httpParams});
  }

  createTeam(){
    
  }
}
