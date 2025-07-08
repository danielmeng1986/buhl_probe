import { Component, inject, output, input } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../services';
import { LoginRequest } from '../../models/user.model';

@Component({
  selector: 'app-login-dialog',
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './login-dialog.html',
  styleUrl: './login-dialog.scss',
})
export class LoginDialog {
  // Input for custom message
  message = input<string>('');

  // Output events
  dialogClose = output<void>();
  loginSuccess = output<void>();

  // Form
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  private readonly fb = inject(FormBuilder);
  private readonly authService: AuthService = inject(AuthService);

  constructor() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid && !this.isLoading) {
      this.isLoading = true;
      this.errorMessage = '';

      const credentials: LoginRequest = {
        username: this.loginForm.value.username,
        password: this.loginForm.value.password,
        expiresInMins: 60, // Set a default expiration time
      };

      this.authService.login(credentials).subscribe({
        next: () => {
          console.log(
            'LoginDialog: Login successful, checking authentication state...',
          );
          console.log(
            'LoginDialog: isAuthenticated:',
            this.authService.isAuthenticated(),
          );
          console.log(
            'LoginDialog: currentUser:',
            this.authService.getCurrentUserSync(),
          );

          this.isLoading = false;
          this.loginSuccess.emit();
          this.dialogClose.emit();
        },
        error: (error) => {
          this.isLoading = false;
          this.errorMessage = 'LOGIN.ERROR_INVALID_CREDENTIALS';
          console.error('Login failed:', error);
        },
      });
    }
  }

  onCancel(): void {
    this.dialogClose.emit();
  }

  // Convenience getters for form controls
  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
