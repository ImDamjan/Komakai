import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  
  userId: number;

  constructor(private http: HttpClient) {
      this.userId = -1;
   }
}
