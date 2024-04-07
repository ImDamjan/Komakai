import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../services/atentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {
  private authService = inject(AuthenticationService);

  logout()
  {
    this.authService.logout();
  }
}
