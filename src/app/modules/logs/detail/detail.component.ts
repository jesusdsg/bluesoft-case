import { Component } from '@angular/core';
import { ISelectItem } from '../../../types/SelectItem';
import { LogService } from '../log.service';
import { Subscription } from 'rxjs';
import { selectCurrentUser } from '../../../store/auth/auth.selector';
import { select, Store } from '@ngrx/store';
import { IUser } from '../../../types/User';
import { ITransaction } from '../../../types/Transaction';

@Component({
  selector: 'app-detail',
  standalone: false,
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  currentUser: IUser | null = null;
  transactions: ITransaction[] = [];
  private subscription: Subscription = new Subscription();
  constructor(private store: Store, private logService: LogService) {}
  selectedMonth: string = '';

  months: ISelectItem[] = [
    { label: 'Enero', value: 1 },
    { label: 'Febrero', value: 2 },
    { label: 'Marzo', value: 3 },
    { label: 'Abril', value: 4 },
    { label: 'Mayo', value: 5 },
    { label: 'Junio', value: 6 },
    { label: 'Julio', value: 7 },
    { label: 'Agosto', value: 8 },
    { label: 'Septiembre', value: 9 },
    { label: 'Octubre', value: 10 },
    { label: 'Noviembre', value: 11 },
    { label: 'Diciembre', value: 12 },
  ];

  ngOnInit() {
    this.subscription.add(
      this.store.pipe(select(selectCurrentUser)).subscribe((user) => {
        this.currentUser = user;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async generateReport() {
    try {
      const currentYear = new Date().getFullYear();
      if (this.currentUser) {
        const response = await this.logService.getTransactionsByMonth(
          this.currentUser.uid,
          parseInt(this.selectedMonth),
          currentYear
        );
        this.transactions = response;
        console.log('Response ', response);
      }
    } catch (error) {
      console.log('Error ', error);
    }
  }
}
