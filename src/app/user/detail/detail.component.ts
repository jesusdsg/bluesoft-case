import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { logout } from '../../store/auth/auth.actions';
import { IUser } from '../../types/User';
import { Observable } from 'rxjs';
import { selectCurrentUser } from '../../store/auth/auth.selector';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent implements OnInit {
  newValue: number = 0;
  isWithdrawal: boolean = false;
  isDeposit: boolean = false;
  currentUser$: Observable<IUser | null>;

  constructor(
    private store: Store,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
  }

  ngOnInit(): void {
    this.currentUser$.subscribe((user) => {
      console.log('Usuario actual:', user); // Esto debería mostrar el usuario actual o `null` si no existe
    });
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

  async performAction(uid: string, balance: number) {
    // Deposit
    if (this.isDeposit) {
      if (this.newValue > 0) {
        const user = {
          balance: balance + this.newValue,
        };
        try {
          await this.userService.updateUser(uid, user);
          this.toastr.success(
            `Usted ha depositado ${this.newValue} en su cuenta`
          );
        } catch (error) {
          this.toastr.error('Ha ocurrido un error al realizar el depósito');
        }
      } else {
        this.toastr.error('Ingrese un valor válido');
      }
    } else {
      // WithDrawal
      if (balance < this.newValue) {
        this.toastr.error(
          'No puedes retirar una cantidad mayor a la de tu saldo'
        );
      } else {
        const user = {
          balance: balance - this.newValue,
        };
        try {
          await this.userService.updateUser(uid, user);
          this.toastr.success(
            `Usted ha retirado ${this.newValue} de su cuenta`
          );
        } catch (error) {
          this.toastr.error('Ha ocurrido un error al realizar el retiro');
        }
      }
    }
  }
}
