import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AuthService } from '../../core/auth.service';
import { SpinnerService } from '../../common/spinner/spinner.service';
import { validateError } from '../../../utils/firebaseAuthCodes';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  standalone: false,
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent {
  signupForm: FormGroup;

  passwordMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService
  ) {
    this.signupForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: this.passwordMatchValidator } //Validate our password
    );
  }

  async onSubmit() {
    this.spinnerService.show();
    if (this.signupForm.valid) {
      try {
        const { email, password } = this.signupForm.value;
        const response = await this.authService.signUp(email, password);
        console.log('Response is ', response);
        //this.spinnerService.hide();
      } catch (error: any) {
        console.log('Error is ', error.code);
        const errorMessage = validateError(error);
        this.toastr.error(errorMessage);
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }
}
