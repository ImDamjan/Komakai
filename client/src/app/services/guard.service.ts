import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './atentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']); // Navigate to the login page if not authenticated
      return false;
    }
  }
}