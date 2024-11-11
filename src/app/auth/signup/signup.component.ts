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
import { UserService } from '../../modules/user/user.service';
import { FirebaseError } from '@angular/fire/app';
import { Router } from '@angular/router';

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
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router
  ) {
    this.signupForm = this.fb.group(
      {
        name: ['', [Validators.required]],
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
        const { email, password, name } = this.signupForm.value;
        const response = await this.authService.signUp(email, password);
        if (response.user) {
          // If register sucess then create user :)
          const user = response.user;
          const newUser = {
            uid: user.uid,
            name,
            email: user.email!,
            balance: 0,
            role: 'user',
          };
          try {
            await this.userService.addUser(newUser);
            this.toastr.success('Usuario creado con éxito');
            this.router.navigate(['/user/detail']);
          } catch (dbError) {
            await user.delete();
            this.toastr.error(
              'Ocurrió un error al guardar el usuario en la base de datos. Se eliminó el registro.'
            );
          }
        }
        this.spinnerService.hide();
      } catch (error) {
        if (error instanceof FirebaseError) {
          const errorMessage = validateError(error);
          this.toastr.error(errorMessage);
        }
      }
    } else {
      this.signupForm.markAllAsTouched();
    }
  }

  get name() {
    return this.signupForm.get('name');
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
