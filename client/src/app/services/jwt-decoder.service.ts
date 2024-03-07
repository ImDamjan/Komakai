import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  public decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }

  public getToken(): string | null {
    // Implement logic to retrieve the token from storage (e.g., localStorage, cookies)
    const token = localStorage.getItem('access_token');
    return token ? token : null;
  }
}
