import { Component, OnInit, inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { TeamService } from '../../services/team.service';

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
  private team_service = inject(TeamService);
  ngOnInit(): void {
    
  }

}
