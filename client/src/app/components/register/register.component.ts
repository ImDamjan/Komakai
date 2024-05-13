import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { Role } from '../../models/role';
import { Register } from '../../models/register';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  private spinner = inject(NgxSpinnerService);
  public validRole : boolean = false;
  @Input() public roles : Role[] = [];
  constructor(private fb: FormBuilder, private reg: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.spinner.show();
    this.registerForm = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.-]*')]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPassword: ['', Validators.required],
      Role : [0
      ]
    }, { validators: this.passwordMatchValidator });
    this.spinner.hide();
  }

  onSubmit() {
    this.spinner.show();
    if (this.registerForm.valid) {
      const { ConfirmPassword, ...formData } = this.registerForm.value;
      let register : Register = {
        username: formData.Username,
        name: formData.Name,
        lastname: formData.Lastname,
        password: formData.Password,
        email: formData.Email,
        roleId: formData.Role
      }
      if(register.roleId <= 0)
      {
        this.validRole = true;
        this.spinner.hide();
        return;
      }
      this.validRole = false;
      this.reg.register(register)
        .subscribe({
          next: (res) => {
            alert("User registered successfully");
            this.registerForm.reset();
            this.spinner.hide();
          },
          error: (err) => {
            alert(err?.error.message);
          }
        });
    } else {
      this.validateAllFormFields(this.registerForm);
      alert("Your form is invalid");
      this.spinner.hide();
    }
  }

  private passwordMatchValidator = (group: FormGroup) => {
    
    const passwordControl = group.get('Password');
    const confirmPasswordControl = group.get('ConfirmPassword');

    if (!passwordControl || !confirmPasswordControl) return null;

    if (passwordControl.value !== confirmPasswordControl.value) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      confirmPasswordControl.setErrors(null);
      return null;
    }
  };

  private validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
}