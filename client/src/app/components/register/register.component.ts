import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegisterService } from '../../services/register.service';
import { RoleService } from '../../services/role.service';
import { Role } from '../../models/role';
import { Register } from '../../models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  private role_service = inject(RoleService);
  public roles : Role[] = [];
  constructor(private fb: FormBuilder, private reg: RegisterService, private router: Router) {}

  ngOnInit(): void {
    this.role_service.getAllRoles().subscribe({
      next : (roles: Role[])=> 
      {
        this.roles = roles.filter(r=>r.id!=5);
      }
    });
    this.registerForm = this.fb.group({
      Name: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Lastname: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      Email: ['', [Validators.required, Validators.email]],
      Username: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9_.-]*')]],
      Password: ['', [Validators.required, Validators.minLength(8)]],
      ConfirmPassword: ['', Validators.required],
      Role : [0,[Validators.min(1)], Validators.required]
    }, { validators: this.passwordMatchValidator });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      // Remove confirmPassword from the form value before sending to the server
      const { ConfirmPassword, ...formData } = this.registerForm.value;
      console.log(formData);
      let register : Register = {
        username: formData.Username,
        name: formData.Name,
        lastname: formData.Lastname,
        password: formData.Password,
        email: formData.Email,
        roleId: formData.Role
      }
      // Send the object to the database
      this.reg.register(register)
        .subscribe({
          next: (res) => {
            alert("User registered successfully");
            // this.router.navigate(['auth/']);
            this.registerForm.reset();
            //add redirection to login
          },
          error: (err) => {
            alert(err?.error.message);
          }
        });
    } else {
      this.validateAllFormFields(this.registerForm);
      alert("Your form is invalid");
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