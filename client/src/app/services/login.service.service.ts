import { Injectable } from '@angular/core';
import { environment } from '../enviroments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {
  piUrl = environment.apiUrl;
  private baseUrl:string = "${this.apiUrl}/Auth/";
  constructor(private http : HttpClient) { }

  login(userObj:any): Observable<any>{
    return this.http.post('https://localhost:7152/api/Auth/login', userObj).pipe(catchError(this.handleError));
  }

  handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
