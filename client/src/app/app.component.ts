import { AfterViewInit, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { AuthenticationService } from './services/atentication.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'client';

  userIsLogged: boolean = false
  

  constructor(private router: Router, public authService: AuthenticationService){

  }

  ngOnInit(): void {
    this.userIsLogged = this.authService.isAuthenticated();
    console.log("logovan sam iz app " + this.authService.isAuthenticated());
  }


}
