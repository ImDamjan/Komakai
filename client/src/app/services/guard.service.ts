import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './atentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate: CanActivateFn = () =>{
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      if (this.router.url.includes('/auth')) {
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/auth']);
      return false;
    }
  }
}