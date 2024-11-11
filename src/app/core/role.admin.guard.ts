import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { of } from 'rxjs';
import { getLocalStorageUser } from '../../utils/localStorage';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = getLocalStorageUser();
    if (user && user.role === 'user') {
      this.router.navigate(['/list']);
      return of(false);
    }
    return of(true);
  }
}
