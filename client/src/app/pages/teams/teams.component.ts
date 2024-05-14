import { Component, OnInit, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user/user';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrl: './teams.component.css'
})
//updae i create
// "name": "string",
// "type": "string",
// "members": [
//   0
// ]
export class TeamsComponent implements OnInit {

  private spinner = inject(NgxSpinnerService);
  private jwt_service = inject(JwtDecoderService);
  private team_service = inject(TeamService);
  private user_service = inject(UserService);
  private loggedUser:any;
  public users: User[]= [];
  public selectedUsers: User[] =  [];
  public teams : Team[] = [];
  ngOnInit(): void {
    this.spinner.show();
    this.loggedUser = this.jwt_service.getLoggedUser();
    this.loadTeams();
    this.user_service.getUsers().subscribe({
      next :(users: User[])=>{
        let pom: User[] = []
        users.forEach(element => {
          element.fulname = element.name + " " + element.lastname;
          if(element.id!==Number(this.loggedUser.user_id))
          pom.push(element);
        });
        this.users = pom;
        this.spinner.hide();
      }
    });
  }

  loadTeams()
  {
    this.spinner.show();
    this.team_service.getMyCreatedTeams(this.loggedUser.user_id).subscribe({
      next :(teams: Team[]) =>{
        this.teams = teams;
        this.spinner.hide();
      }
    });
  }

}
