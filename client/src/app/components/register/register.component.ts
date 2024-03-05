import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private reg: RegisterService){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['',Validators.required],
      surname: ['',Validators.required],
      email: ['',Validators.required],
      username: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required]
    })
  }

  onSubmit() {
    if(this.registerForm.valid){
      console.log(this.registerForm.value)
      //send the obj to database
      this.reg.register(this.registerForm.value)
      .subscribe({
        next:(res)=>{
          alert(res.message)
        },
        error:(err)=>{
          alert(err?.error.message)
        }
      })
    }else{
      //throw error
      this.validateAllFormFields(this.registerForm);
      alert("Your form is invalid")
    }
  }

  private validateAllFormFields(formGroup: FormGroup){
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if(control instanceof FormControl){
        control.markAsDirty({onlySelf:true});
      }else if(control instanceof FormGroup){
        this.validateAllFormFields(control)
      }
    })
  }
}

