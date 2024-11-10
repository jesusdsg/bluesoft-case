import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';
import { IUser } from '../../types/User';
import { Observable } from 'rxjs';
import { selectCurrentUser } from '../../store/auth/auth.selector';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  balance: number = 0;
  isWithdrawal: boolean = false;
  isDeposit: boolean = false;
  currentUser: Observable<IUser | null>;
  constructor(private store: Store, private router: Router) {
    this.currentUser = this.store.pipe(select(selectCurrentUser));
  }
  logoutUser() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth/login']);
  }

  goToDeposit() {
    this.isDeposit = true;
    this.isWithdrawal = false;
  }

  goToWithdrawal() {
    this.isDeposit = false;
    this.isWithdrawal = true;
  }

  cancelAction() {
    this.isDeposit = false;
    this.isWithdrawal = false;
  }
}
