import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { JwtDecoderService } from '../../services/jwt-decoder.service';
import { decode } from 'punycode';
import { environment } from '../../enviroments/environment';
import { Observable, catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{
  loginObj: Login;

  loginForm!: FormGroup;

  idUser='';

  decodedToken: any;
  apiUrl = environment.apiUrl;
  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router,private jwtDecoderService: JwtDecoderService) {
    this.loginObj=new Login();
  }

  onLogin(): void {

    this.http.post('https://localhost:7152/api/Auth/login',this.loginObj,{responseType: 'text'}).subscribe({ next: (res)=>{
      if(res){
        this.decodedToken=jwtDecode(res);
        
        this.http.get('https://localhost:7152/api/User',this.decodedToken.nameidentifier).subscribe((res1:any)=>{

          if(this.loginObj.Username==res1[0].username){
            alert('Login success');
            this.router.navigateByUrl('/dashboard');
          }

        },
        )

      }
    },
    error: (err) =>{
      alert(err?.error.message);
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