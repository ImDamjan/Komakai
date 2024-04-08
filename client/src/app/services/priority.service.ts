import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { Observable, map } from 'rxjs';
import { Priority } from '../models/priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  //mozda ce morati da se ispravi
  fetchPriorityName(priorityId: number): Observable<string> {
    const apiUrl = `${this.apiUrl}/Priority/getById/${priorityId}`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => response.description) // Extracts the name from the response
    );
  }

  getPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>(`${this.apiUrl}/Priority/getAll`);
  }
  getPriorityById(prio_id: Number) : Observable<Priority>
  {
    const url = this.apiUrl + "/Priority/getById/" + prio_id;
    return this.http.get<Priority>(url);
  }
}
