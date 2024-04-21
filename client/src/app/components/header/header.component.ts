import { Component, OnInit, inject } from '@angular/core';
import { HeaderInfoService } from '../../services/header-info.service';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ProfileDetailsComponent } from '../profile-details/profile-details.component';
import { UserProfileService } from '../../services/user-profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  public fullname : string = "";
  public role : string = "";
  public roleId !: number;
  userid!: number;
  private jwtService = inject(JwtDecoderService);
  user!: User;
  profilePicture !: string;

  firstname: string = "";
  lastname: string = "";
  jobTitle: string = "";
  isMenuVisible: boolean = false;

  constructor(private header_info: HeaderInfoService, private userService: UserService, private dialog: MatDialog, private userProfileService: UserProfileService){}

  ngOnInit(): void {
    let token = this.jwtService.getToken();
    if(token!=null)
    {
      let decode = this.jwtService.decodeToken(token);
      this.fullname = decode.fullname;
      this.role = decode.role
      this.userid = decode.user_id;
      this.roleId = decode.role_id;
    }

    this.userService.getUserById(this.userid).subscribe((userData: any) => {
      this.user = userData;
      if (this.user && this.user.profilePicturePath) {
        this.profilePicture = `http://localhost:5295/${this.user.profilePicturePath}`;
      }
    });


    this.userProfileService.userProfileSubject.subscribe(user => {
      if (user) {
        console.log(user);
        this.firstname = user.name;
        this.lastname = user.lastname;
        this.jobTitle = user.jobTitle;
      }
    });
  }

  toggleMenu() {
    this.isMenuVisible = !this.isMenuVisible;
  }

  openProfileOverlay(id: number, event: Event) {
    const dialogConfig = new MatDialogConfig();

    this.userService.getUserById(this.userid).subscribe((userData: any) => {
      const dialogRef = this.dialog.open(ProfileDetailsComponent, {
        ...dialogConfig,
        data: { user: userData, role: this.roleId }
      });
    });
  }
}
