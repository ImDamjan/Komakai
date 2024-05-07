import { Component, Output, EventEmitter, OnInit, HostListener, inject } from '@angular/core';
import { navbarData } from './nav-data';
import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { faSlack, faUncharted } from '@fortawesome/free-brands-svg-icons';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { jwtDecode } from 'jwt-decode';


interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  animations:[
    trigger('fadeInOut',[
      transition(":enter", [
        style({opacity:0}),
        animate('350ms',
        style({opacity:1})
        )
      ]),
      transition(":leave", [
        style({opacity:1}),
        animate('350ms',
        style({opacity:0})
        )
      ])
    ]),
    trigger('rotate',[
      transition(':enter',[
        animate('1000ms',
        keyframes([
          style({transform: 'rotate(0deg)', offset: '0'}),
          style({transform: 'rotate(2turn)', offset: '1'})
        ]))
      ])
    ])
  ]
})
export class SidenavComponent implements OnInit {

  faDashboard = faSlack;


  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navbarData;

  @HostListener('window:resize', ['$event'])
  onResize(event:any){
    this.screenWidth = window.innerWidth;
    if(this.screenWidth <= 768) {
      this.collapsed = !this.collapsed;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }
  private jwt_decode = inject(JwtDecoderService);
  
  ngOnInit(): void {
    // this.screenWidth = window.innerWidth;
    let user = this.jwt_decode.getLoggedUser();
    if(user!==null)
    {
      if(user.role==="Project Manager")
      {
        this.navData.splice(0,1);
      }
      else if(user.role==="Admin")
      {
        this.navData.splice(1,5);
      }
      else
        this.navData.splice(0,2);
    }
  }

  toggleCollapse(): void{
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav(): void {
    this.collapsed = false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }
}
