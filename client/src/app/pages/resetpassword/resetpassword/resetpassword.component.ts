import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../../../services/atentication.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent implements OnInit{
  private route = inject(ActivatedRoute);
  private authService = inject(AuthenticationService);
  showPassword: boolean = false;
  newPassword: string = '';
  confirmPassword: string = '';
  token: string = '';
  changed: boolean = false;
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

  changePassword() {
    if (this.newPassword !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const payload = { resetToken: this.token, newPassword: this.newPassword };
    this.authService.resetPassword(payload).subscribe(
      response => {
        console.log('Password reset successful', response);
        this.changed = true;
      },
      error => {
        console.error('Password reset failed', error);
        alert('Password reset failed');
      }
    );
  }
}
