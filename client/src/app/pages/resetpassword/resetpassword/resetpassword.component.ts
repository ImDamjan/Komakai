import { Component } from '@angular/core';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrl: './resetpassword.component.css'
})
export class ResetpasswordComponent {
  showPassword: boolean = false;


  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
