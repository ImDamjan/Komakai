import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  piUrl = environment.apiUrl;
  private baseUrl:string = "${this.apiUrl}/Auth/";
  constructor(private http : HttpClient) { }

  login(){
    
  }

}
