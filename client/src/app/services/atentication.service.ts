import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private isLoggedIn: boolean = false;

  constructor() { }

  login() {
    // Logika za prijavu korisnika
    this.isLoggedIn = true;
  }

  logout() {
    // Logika za odjavu korisnika
    this.isLoggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn;
  }
}
