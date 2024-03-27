import { Injectable, OnDestroy } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './atentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  isRedirected = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate: CanActivateFn = () =>{
    return this.checkLogin();
  }

  checkLogin(): boolean {
    if (this.authService.isAuthenticated()) {
      console.log("Logovao sam se")
      console.log(this.router.url)
      if (!this.isRedirected && this.router.url.includes('/auth')) {
        console.log("Pokusavam da udjem na login, vraca me na dashboard")
        this.router.navigate(['/dashboard']);
        this.isRedirected = true;
      }
      return true;
    } else {
      console.log("Vraca me nazad na login")
      this.router.navigate(['/auth']);
      return false;
    }
  }

  ngOnDestroy() {
    this.isRedirected = false;
  }
}