import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginObj: Login;
  
  constructor(private http: HttpClientModule,private router: Router) {
    this.loginObj=new Login();
   }

  ngOnInit(): void {
    this.http.post('',this.loginObj).subscribe((res:any)=>{
      if(res.result){
        alert("Login success");
        this.router.navigateByUrl('');
      }
    })
  }

}

export class Login{
  username: string;
  password: string;
  constructor(){
    this.username='';
    this.password='';
  }
}
