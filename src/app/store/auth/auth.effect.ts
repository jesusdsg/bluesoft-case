import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs/operators';
import { login, logout } from './auth.actions';
@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions) {}

  saveUserToLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(login),
        tap(({ user }) => {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.setItem('user', JSON.stringify(user));
          }
        })
      ),
    { dispatch: false }
  );

  removeUserFromLocalStorage$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          if (typeof sessionStorage !== 'undefined') {
            sessionStorage.removeItem('user');
          }
        })
      ),
    { dispatch: false }
  );
}
