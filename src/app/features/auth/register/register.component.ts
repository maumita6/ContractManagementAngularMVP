import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { UserRole, RoleOption } from '../../../core/models/role.model';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm!: FormGroup;
  loading: boolean = false;
  errorMessage: string = '';

  roleOptions: RoleOption[] = [
    { label: 'Reviewer', role: UserRole.REVIEWER },
    { label: 'Admin', role: UserRole.ADMIN },
    { label: 'Approver', role: UserRole.APPROVER }
  ];


  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private router: Router,
    public messageService: MessageService) {


  }

  ngOnInit(): void {

    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: [UserRole.REVIEWER, [Validators.required]],

      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const passwordCtrl = control.get('password');
    const confirmPasswordCtrl = control.get('confirmPassword');

    const passwordErrors: ValidationErrors = {};
    const confirmErrors: ValidationErrors = {};

    // Safely read and validate values using control.value
    if (passwordCtrl && !/\d/.test(passwordCtrl.value)) {
      passwordErrors['missingNumber'] = true;
    }

    if (passwordCtrl && !/[!@#$%^&*]/.test(passwordCtrl.value)) {
      passwordErrors['missingSpecialChar'] = true;
    }

    // Check confirmation rule
    if (passwordCtrl && confirmPasswordCtrl && passwordCtrl.value !== confirmPasswordCtrl.value) {
      confirmErrors['passwordMismatch'] = true;
    }

    if (passwordCtrl) {
      passwordCtrl.setErrors(Object.keys(passwordErrors).length ? passwordErrors : null);
    }
    if (confirmPasswordCtrl) {
      confirmPasswordCtrl.setErrors(Object.keys(confirmErrors).length ? confirmErrors : null);
    }
    return Object.keys(passwordErrors).length || Object.keys(confirmErrors).length ? { ...passwordErrors, ...confirmErrors } : null;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }
    this.loading = true;
    /*setTimeout(() => {
      this.loading = false;
      // Handle success here
    }, 2000);*/

    this.authService.registerUser(this.registerForm.value).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);
        this.messageService.add({ severity: 'success', summary: 'Registration Successful', detail: 'Welcome to contract management!' });

        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Error registering user:', error);
        this.errorMessage = error.message || 'An error occurred during registration.';
        this.messageService.add({ severity: 'error', summary: 'Registration Failed', detail: this.errorMessage });
      }
    });
  }

}
