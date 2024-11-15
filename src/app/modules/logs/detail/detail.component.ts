import { Component } from '@angular/core';
import { LogService } from '../log.service';
import { Subscription } from 'rxjs';
import { selectCurrentUser } from '../../../store/auth/auth.selector';
import { select, Store } from '@ngrx/store';
import { IUser } from '../../../types/User';
import { ITransaction } from '../../../types/Transaction';
import { ToastrService } from 'ngx-toastr';
import { SpinnerService } from '../../../common/spinner/spinner.service';
import { months } from '../../../../utils/constants';

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
  constructor(
    private store: Store,
    private logService: LogService,
    private toastr: ToastrService,
    private spinnerService: SpinnerService
  ) {}
  selectedMonth: string = (new Date().getMonth() + 1).toString();

  months = months;

  ngOnInit() {
    this.subscription.add(
      this.store.pipe(select(selectCurrentUser)).subscribe((user) => {
        this.currentUser = user;
      })
    );
    this.generateReport();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  async generateReport() {
    this.spinnerService.show();
    try {
      const currentYear = new Date().getFullYear();
      if (this.currentUser) {
        const response = await this.logService.getTransactionsByMonth(
          this.currentUser.uid,
          parseInt(this.selectedMonth),
          currentYear
        );
        this.transactions = response;
      }
      this.spinnerService.hide();
    } catch (error) {
      this.spinnerService.hide();
      this.toastr.error('Ha ocurrido un error obteniendo los datos');
    }
  }
}
