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
    username: "aleksandrastaniic",
    password: "Boki037"
  } as Login;

  loginForm!: FormGroup;

  idUser='';

  decodedToken: any;
  apiUrl = environment.apiUrl;
  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router,private jwtDecoderService: JwtDecoderService, private authService: AuthenticationService) {
  }

  onLogin(): void {
    this.authService.login(this.loginObj).subscribe({
      next:(response)=>{
        this.authService.setToken(response)
        this.router.navigate(['/dashboard']);
      },
      error:(error)=>{
        console.log(error)
      }
    })

  //   this.http.post('http://localhost:5295/api/Auth/login',this.loginObj,{responseType: 'text'}).subscribe((res)=>{
  //     if(res){
  //       this.decodedToken=jwtDecode(res);
        
  //       this.http.get('http://localhost:5295/api/User',this.decodedToken.nameidentifier).subscribe((res1:any)=>{

  //         if(this.loginObj.username==res1[0].username){
  //           alert('Login success');
  //           this.router.navigateByUrl('/dashboard');
  //         }

  //       },
  //       )

  //     }
  //   },
  //   (err) =>{
  //     alert(err.error);
  //   }
  // )
  }
}
