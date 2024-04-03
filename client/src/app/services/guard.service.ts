import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './atentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {

    const isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn) {
      // User is logged in, redirect to dashboard if trying to access /auth
      if (route.url[0].path === 'auth') {
        this.router.navigate(['/dashboard']);
        return false;
      }
      // User is logged in and trying to access other routes, allow access
      return true;
    } else {
      // User is not logged in, allow access to /auth but redirect for others
      if (route.url[0].path !== 'auth') {
        this.router.navigate(['/auth']);
        return false;
      }
      // User is not logged in and trying to access /auth, allow access
      return true;
    }
  }
}