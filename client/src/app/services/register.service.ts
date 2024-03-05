import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl:string = "";
  constructor(private http : HttpClient) { }

  register(userObj:any){
    return this.http.post<any>(`${this.baseUrl}register`,userObj);
  }
}
