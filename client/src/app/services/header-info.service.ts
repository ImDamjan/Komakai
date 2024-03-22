import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../enviroments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeaderInfoService {
  apiUrl = environment.apiUrl;
  private baseUrl:string = "${this.apiUrl}/Auth/";
  constructor(private http: HttpClient) { }

   getImenaILokacije(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}`);
   }
}
