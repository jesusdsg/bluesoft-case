import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { of } from 'rxjs';
import { getLocalStorageUser } from '../../utils/localStorage';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate() {
    const user = getLocalStorageUser();
    if (user) {
      return of(true);
    } else {
      this.router.navigate(['/auth/login']);
      return of(false);
    }
  }
}
