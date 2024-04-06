import { Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from './services/atentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'client';

  userIsLogged: boolean = false

  constructor(private router: Router, private authService: AuthenticationService){ }

  ngOnInit(): void { this.userIsLogged = this.authService.isAuthenticated() }
  
}
