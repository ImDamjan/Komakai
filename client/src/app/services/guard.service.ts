import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './atentication.service';
import { Location } from '@angular/common';
import { PreviousUrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  constructor(private authService: AuthenticationService, private router: Router, private location: Location, private previousUrlService: PreviousUrlService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | boolean | UrlTree {

    const isLoggedIn = this.authService.isAuthenticated();

    if (isLoggedIn) {
      
      if (route.url[0].path === 'auth') {
        // console.log(this.location.path())
        this.router.navigate(['/dashboard']);
        return false;
      }
      return true;
    } else {
      if (route.url[0].path !== 'auth') {
        // console.log(this.location.path())
        this.router.navigate(['/auth']);
        return false;
      }
      return true;
    }
  }
}