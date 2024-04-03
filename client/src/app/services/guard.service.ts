import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from './atentication.service';
import { Location } from '@angular/common';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard{

  isRedirected = false;

  link : any;

  constructor(private authService: AuthenticationService, private router: Router,private location: Location,private urlService: UrlService) {}

  canActivate: CanActivateFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) =>{
    const isNavigationTriggeredByUrl = !state.urlAfterRedirects;

    if (isNavigationTriggeredByUrl) {
      const isLogged = this.checkLogin();
      return isLogged;
    } else {
      console.log("Ne treba ulaziti");
      return true;
    }
  }

  checkLogin(): boolean {
    console.log("U checkLogin-u sam")
    if(this.authService.isAuthenticated()){
      console.log("Autentifikovan sam kod" + this.location.path())
      this.router.navigate(['/dashboard']);
      return true;
    }
    else{
      console.log("Nisam autentifikovan kod" + this.location.path())
      this.router.navigate(['/auth']);
      return false;
    }
  }

}