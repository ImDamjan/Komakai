import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Assignment } from '../models/assignment';
import { environment } from '../enviroments/environment';
// ovo je dummy servis NE MOJ DA KORISTITE, morace da se prepravi drugi
@Injectable({
  providedIn: 'root'
})
export class KanbanAssignmentService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;
  constructor() { }

  getAllProjectAssignments(project_id : Number) : Observable<Assignment[]>
  {
    const url = this.baseUrl + "/Assignment/getAssignmentsByProject/"+project_id;
    return this.http.get<Assignment[]>(url);
  }
}
