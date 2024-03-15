import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Login } from '../models/login';
import { environment } from '../enviroments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl:string = environment.apiUrl

  constructor(private httpClient: HttpClient) { }

  // API
  login(loginData: Login):Observable<string>{
    const httpOptions = {
      responseType: 'text' as 'json'  // Postavite responseType na 'text'
    };
    return this.httpClient.post<string>(this.baseUrl+`/Auth/login`, loginData, httpOptions)
  }

  // Services
  setToken(token: string){
    // kada se uspesno ulogujemo, zovemo funkciju da setujemo token dobijen sa beka
    localStorage.setItem("token", token);
  }

  isAuthenticated(): boolean {
    if(localStorage.getItem("token"))
      return true
    return false
  }  
}
