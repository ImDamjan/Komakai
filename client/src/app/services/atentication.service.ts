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
    let localStorage : Storage;
    if(typeof window !== 'undefined' && window.localStorage)
    {
      localStorage = window.localStorage;
      console.log("Postavio sam token")
      localStorage.setItem("token", token);
    }
    
  }

  isAuthenticated(): boolean {
    let localStorage : Storage;
    if(typeof window !== 'undefined' && window.localStorage)
    {
      console.log("Usao sam u if za autentifikaciju")
      localStorage = window.localStorage;
      if(localStorage.getItem("token"))
      {
        console.log("Autentifikovan sam")
        return true
      }
    }
    return false
  }  
}
