import { Component, OnInit, inject } from '@angular/core';
import { HeaderInfoService } from '../../services/header-info.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';

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
  user!: User;
  profilePicture !: string;

  isMenuVisible: boolean = false;

  constructor(private header_info: HeaderInfoService, private userService: UserService, private dialog: MatDialog){}

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
      this.user = userData;
      if (this.user && this.user.profilePicturePath) {
        this.profilePicture = `http://localhost:5295/${this.user.profilePicturePath}`;
      }
  });
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  openProfileOverlay(id: number, event: Event) {
    event.stopPropagation();
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = {
      userId: id
    };

    this.dialog.open(ProfileDetailsComponent, dialogConfig);
  }
}
