import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'your-api-url/tasks'; // Replace 'your-api-url/tasks' with your actual API endpoint

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<Task> {
    return this.http.get<Task>(this.apiUrl);
  }
}