import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { AuthService } from '../../core/auth.service';
import { ReactiveFormsModule } from '@angular/forms';
import { User } from '@angular/fire/auth';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['signIn']);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: AuthService, useValue: authServiceSpy }],
    });

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    fixture.detectChanges();
  });

  //When we loggin
  it('should show error if login fails', fakeAsync(() => {
    authService.signIn.and.returnValue(
      Promise.reject(new Error('Login failed'))
    );
    component.loginForm.setValue({
      email: 'incorrect@example.com',
      password: 'wrongpassword',
    });

    component.onSubmit();
    tick();

    expect(authService.signIn).toHaveBeenCalledWith(
      'incorrect@example.com',
      'wrongpassword'
    );
  }));

  // When we get a response
  it('should call login and receive response if credentials are correct', fakeAsync(() => {
    const mockUserCredential = {
      user: { uid: '123', email: 'test@example.com' } as User,
    } as any;

    authService.signIn.and.returnValue(Promise.resolve(mockUserCredential));
    component.loginForm.setValue({
      email: 'test@example.com',
      password: 'password123',
    });

    component.onSubmit();
    tick();

    expect(authService.signIn).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  }));
});
