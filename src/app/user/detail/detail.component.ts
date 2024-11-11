import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { login, logout } from '../../store/auth/auth.actions';
import { IUser } from '../../types/User';
import { Observable } from 'rxjs';
import { selectCurrentUser } from '../../store/auth/auth.selector';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../user.service';
import { TransactionService } from '../../transaction/transaction.service';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, AsyncPipe, FormsModule],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  newValue: string = '';
  isWithdrawal: boolean = false;
  isDeposit: boolean = false;
  currentUser$: Observable<IUser | null>;

  constructor(
    private store: Store,
    private router: Router,
    private toastr: ToastrService,
    private userService: UserService,
    private transactionService: TransactionService
  ) {
    this.currentUser$ = this.store.pipe(select(selectCurrentUser));
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
    const amount = parseInt(this.newValue);

    if (amount <= 0) {
      this.toastr.error('Ingrese un valor válido');
      return;
    }

    const isDeposit = this.isDeposit;
    const isValidTransaction = this.validateTransaction(
      isDeposit,
      balance,
      amount
    );

    if (!isValidTransaction) return;

    const updatedBalance = this.isDeposit ? balance + amount : balance - amount;
    const transactionType = this.isDeposit ? 'deposit' : 'withdrawal';

    try {
      await this.updateUserBalance(uid, updatedBalance);
      await this.recordTransaction(uid, amount, transactionType);
      this.toastr.success(
        `Usted ha ${isDeposit ? 'depositado' : 'retirado'} $${
          this.newValue
        } en su cuenta`
      );
      await this.updateUserInStore(uid);
    } catch (error) {
      this.toastr.error(
        `Ha ocurrido un error al realizar el ${transactionType}`
      );
    }

    this.newValue = ''; // Clear input value
  }

  /**
   *
   * @param isDeposit
   * @param balance
   * @param amount
   * @returns
   */
  private validateTransaction(
    isDeposit: boolean,
    balance: number,
    amount: number
  ): boolean {
    if (!isDeposit && balance < amount) {
      this.toastr.error(
        'No puedes retirar una cantidad mayor a la de tu saldo'
      );
      return false;
    }
    return true;
  }

  private async updateUserBalance(uid: string, balance: number): Promise<void> {
    const user = { balance };
    await this.userService.updateUser(uid, user);
  }

  /**
   * Record transaction in db
   * @param uid
   * @param amount
   * @param type
   */
  private async recordTransaction(
    uid: string,
    amount: number,
    type: string
  ): Promise<void> {
    const transaction = {
      uid,
      createdAt: Date.now(),
      type,
      amount,
    };
    await this.transactionService.addTransaction(transaction);
  }

  private async updateUserInStore(uid: string): Promise<void> {
    const updatedUser = await this.userService.getUser(uid);
    if (updatedUser) {
      this.store.dispatch(login({ user: updatedUser }));
    }
  }
}
