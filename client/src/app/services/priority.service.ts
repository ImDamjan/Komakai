import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {
  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  fetchPriorityName(priorityId: number): Observable<string> {
    const apiUrl = `${this.apiUrl}/Priority/getById${priorityId}`;
    return this.http.get<any>(apiUrl).pipe(
      map(response => response.description) // Extracts the name from the response
    );
  }

  getPriorities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Priority/getAll`);
  }
}
