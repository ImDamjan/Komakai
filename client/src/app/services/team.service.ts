import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
