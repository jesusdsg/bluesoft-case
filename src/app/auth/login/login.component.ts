import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { AuthState } from '../../core/auth.reducer';
import { Store } from '@ngrx/store';
import { user } from '@angular/fire/auth';
import { login } from '../../core/auth.actions';

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
    private store: Store<{ auth: AuthState }>
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      console.log('Formulario enviado:', this.loginForm.value);
      try {
        const { email, password } = this.loginForm.value;
        const response = await this.authService.signIn(email, password);
        if (response.user) {
          console.log('Response is ', response);
          const user = response.user;
          this.store.dispatch(login({ user }));
        }
      } catch (error) {
        console.log('Error is ', error);
      }
    } else {
      console.log('Formulario inválido');
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
