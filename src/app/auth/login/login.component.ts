import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { AuthState } from '../../core/auth.reducer';
import { Store } from '@ngrx/store';
import { login } from '../../core/auth.actions';
import { IUser } from '../../types/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authService: AuthService,
    private store: Store<{ auth: AuthState }>,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      try {
        const { email, password } = this.loginForm.value;
        const response = await this.authService.signIn(email, password);
        if (response.user) {
          const user: IUser = {
            uid: response.user.uid,
            name: '',
            email: response.user.email!,
          };
          // Store user and go to detail
          this.store.dispatch(login({ user }));
          this.router.navigate(['/user/list']);
        }
      } catch (error) {
        console.log('Error is ', error);
      }
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
