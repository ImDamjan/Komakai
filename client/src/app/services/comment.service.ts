import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { tick } from '@angular/core/testing';
import { Comment } from '../models/comment/comment';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl;

  getAllComentsByTask(task_id:number) : Observable<Comment[]>
  {
    const url = this.baseUrl+"/Comment/getAllCommentsByAssignment/"+task_id;
    return this.http.get<Comment[]>(url);
  }

  createComment(data:any) : Observable<Comment>
  {
    const url = this.baseUrl + "/Comment/createComment";
    return this.http.post<Comment>(url,data);
  }
}
