import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from './services/atentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  title = 'client';
  constructor(private authService: AuthenticationService){}

  isLoggedIn(){
    return this.authService.isAuthenticated();
  }
}
