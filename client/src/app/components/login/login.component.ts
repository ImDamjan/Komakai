import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/jwt-decoder.service';
import { decode } from 'punycode';
import { environment } from '../../enviroments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginObj: Login;

  loginForm!: FormGroup;
  
  decodedToken: any;
  apiUrl = environment.apiUrl;
  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router,private authService: AuthService) {
    this.loginObj=new Login();
  }

  onLogin(): void {

    this.http.post('https://localhost:7152/api/Auth/login',this.loginObj,{responseType: 'text'}).subscribe((res)=>{
      if(res){
        console.log(res);
      }
    })
  }

}

export class Login{
  Username: string;
  Password: string;
  constructor(){
    this.Username='';
    this.Password='';
  }
}