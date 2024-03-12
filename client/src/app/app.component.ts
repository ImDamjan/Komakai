import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'client';

  constructor(private router: Router){
  }
  
  ngOnInit(): void {
  console.log(this.router);
  console.log(this.router.url);
  }
}
