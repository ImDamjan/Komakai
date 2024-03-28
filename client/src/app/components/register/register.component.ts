import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ngOnInit(): void {
    
  }

  // registerForm!: FormGroup;

  // constructor(private fb: FormBuilder, private reg: RegisterService, private router: Router) {}

  // ngOnInit(): void {
  //   this.registerForm = this.fb.group({
  //     Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
  //     Lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
  //     Email: ['', [Validators.required, Validators.email]],
  //     Username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.-]*')]],
  //     Password: ['', [Validators.required, Validators.minLength(8)]],
  //     ConfirmPassword: ['', Validators.required]
  //   }, { validators: this.passwordMatchValidator });
  // }

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     // Remove confirmPassword from the form value before sending to the server
  //     const { ConfirmPassword, ...formData } = this.registerForm.value;
  //     console.log(formData);
  //     // Send the object to the database
  //     this.reg.register(formData)
  //       .subscribe({
  //         next: (res) => {
  //           alert("User registered successfully");
  //           this.router.navigate(['auth/']);
  //           this.registerForm.reset();
  //           //add redirection to login
  //         },
  //         error: (err) => {
  //           alert(err?.error.message);
  //         }
  //       });
  //   } else {
  //     this.validateAllFormFields(this.registerForm);
  //     alert("Your form is invalid");
  //   }
  // }

  // private passwordMatchValidator = (group: FormGroup) => {
    
  //   const passwordControl = group.get('Password');
  //   const confirmPasswordControl = group.get('ConfirmPassword');

  //   if (!passwordControl || !confirmPasswordControl) return null;

  //   if (passwordControl.value !== confirmPasswordControl.value) {
  //     confirmPasswordControl.setErrors({ passwordMismatch: true });
  //     return { passwordMismatch: true };
  //   } else {
  //     confirmPasswordControl.setErrors(null);
  //     return null;
  //   }
  // };

  // private validateAllFormFields(formGroup: FormGroup) {
  //   Object.keys(formGroup.controls).forEach(field => {
  //     const control = formGroup.get(field);
  //     if (control instanceof FormControl) {
  //       control.markAsDirty({ onlySelf: true });
  //     } else if (control instanceof FormGroup) {
  //       this.validateAllFormFields(control);
  //     }
  //   });
  // }
}