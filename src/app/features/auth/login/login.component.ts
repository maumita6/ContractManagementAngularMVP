import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    loginForm: FormGroup;
    loading = false;
    errorMessage: string | null = null;
    _userRole: string | null = null;

    constructor(
        private fb: FormBuilder,
        public authService: AuthService,
        private router: Router,
        private messageService: MessageService
    ) {
        this.loginForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]]
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.errorMessage = null;

        const { email, password } = this.loginForm.value;

        // console.log('Login attempt with email:', email, 'and password:', password);

        this.authService.login(email, password).subscribe({
            next: () => {
                this.loading = false;
                //this.router.navigate(['/dashboard']);
                this._userRole = this.authService.getRole();
                console.log('User role in login :', this._userRole);
                this.messageService.add({ severity: 'success', summary: 'Login Successful', detail: 'Welcome back!' });

                this.router.navigate(['/dashboard'], {
                    queryParams: { userRole: this._userRole }
                });

            },
            error: (err: any) => {
                this.loading = false;
                this.errorMessage = err?.message || 'Login failed. Please try again.';
                this.messageService.add({ severity: 'error', summary: 'Login Failed', detail: err?.message });
            }
        });
    }
}
