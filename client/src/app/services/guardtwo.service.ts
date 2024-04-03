import { Injectable, OnDestroy } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenticationService } from './atentication.service';
import { Location } from '@angular/common';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root'
})
export class GuardTwo{

  // isRedirected = false;

  // link : any;

  // constructor(private authService: AuthenticationService, private router: Router,private location: Location,private urlService: UrlService) {}

  // canActivate: CanActivateFn = () =>{
  //   const isLogged = this.checkLogin();
  //   this.urlService.setUrl(this.location.path());
  //   return isLogged;
  // }

  // checkLogin(): boolean {
  //   console.log("U checkLogin-u sam")
  //   if (!this.authService.isAuthenticated()) {
  //     // this.link = this.location.path();
  //     console.log("Url u gardu za autentifikovanog je : " + this.location.path());
  //     // if(this.isLoggedIn && this.location.path().includes('/auth')){
  //     //   console.log(this.link);
  //     //   // this.router.navigate([this.location.path()]);
  //     //   this.router.navigate(['/dashboard'])
  //     //   return false;
  //     // }
  //     return true;
  //   }
  //   else{
  //     this.router.navigate(['/dashboard']);
  //     return false;
  //   }
  // }

}