import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl:string = "http://localhost:5295/api/Auth/";
  constructor(private http : HttpClient) { }

  register(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }
}