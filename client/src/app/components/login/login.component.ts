import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { environment } from '../../enviroments/environment';
import { Login } from '../../models/login';
import { AuthenticationService } from '../../services/atentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginObj: Login = {
    username: "johndoe",
    password: "password123"
  } as Login;

  loginForm!: FormGroup;

  idUser='';

  showPassword: boolean = false;

  decodedToken: any;
  apiUrl = environment.apiUrl;
  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router,private jwtDecoderService: JwtDecoderService, private authService: AuthenticationService) {
  }

  onLogin(): void {
    this.authService.login(this.loginObj).subscribe({
      next:(response)=>{
        this.authService.setToken(response);
        console.log("logovan sam " + this.authService.isAuthenticated());
        this.router.navigate(['/dashboard']);
      },
      error:(error)=>{
        console.log(error)
      }
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }

}
