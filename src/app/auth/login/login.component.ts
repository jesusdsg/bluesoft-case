import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { AuthState } from '../../store/auth/auth.reducer';
import { Store } from '@ngrx/store';
import { login } from '../../store/auth/auth.actions';
import { IUser } from '../../types/User';
import { Router } from '@angular/router';
import { SpinnerService } from '../../common/spinner/spinner.service';
import { FirebaseError } from '@angular/fire/app';
import { validateError } from '../../../utils/firebaseAuthCodes';
import { ToastrService } from 'ngx-toastr';

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
    private router: Router,
    private spinnerService: SpinnerService,
    private toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async onSubmit() {
    this.spinnerService.show();
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
          this.router.navigate(['/user/detail']);
          this.spinnerService.hide();
        }
      } catch (error) {
        if (error instanceof FirebaseError) {
          const errorMessage = validateError(error);
          this.toastr.error(errorMessage);
        }
        this.spinnerService.hide();
      }
    } else {
      this.loginForm.markAllAsTouched();
      this.spinnerService.hide();
    }
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
