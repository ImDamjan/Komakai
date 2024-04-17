import { Component, OnInit, inject } from '@angular/core';
import { HeaderInfoService } from '../../services/header-info.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  public fullname : string = "";
  public role : string = "";
  userid!: number;
  private jwtService = inject(JwtDecoderService);
  users: User[] = [];

  constructor(private header_info: HeaderInfoService, private userService: UserService){}

  ngOnInit(): void {
    let token = this.jwtService.getToken();
    if(token!=null)
    {
      let decode = this.jwtService.decodeToken(token);
      console.log(decode);
      this.fullname = decode.fullname;
      this.role = decode.role
      this.userid = decode.user_id;
    }
    console.log(token);

    this.userService.getUserById(this.userid).subscribe((userData: any) => {
      this.users = userData;
      console.log(this.users);
  });
  }
}
