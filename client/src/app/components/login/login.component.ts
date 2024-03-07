import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from '../../services/jwt-decoder.service';
import { decode } from 'punycode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginObj: Login;

  loginForm!: FormGroup;
  
  decodedToken: any;
  
  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router,private authService: AuthService) {
    this.loginObj=new Login();
  }

  onLogin(): void {

    this.http.post('http://localhost:5295/api/Auth/login',this.loginObj,{responseType: 'text'}).subscribe((res:any)=>{
      if(res){
        alert("Login success");
      }

    })
  }

}

export class Login{
  Username: string;
  Lastname: string;
  Password: string;
  Email: string;
  constructor(){
    this.Username='';
    this.Lastname='';
    this.Password='';
    this.Email='';
  }
}