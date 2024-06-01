import { Component, inject } from '@angular/core';
import { JwtDecoderService } from '../../services/jwt-decoder.service';

@Component({
  selector: 'app-helpcentre',
  templateUrl: './helpcentre.component.html',
  styleUrl: './helpcentre.component.css'
})
export class HelpcentreComponent {

  private jwtService = inject(JwtDecoderService);

  public role : string = "";

  ngOnInit(): void {
    let token = this.jwtService.getToken();
    if(token!=null)
    {
      let decode = this.jwtService.decodeToken(token);
      this.role = decode.role;
    }
  }
}
