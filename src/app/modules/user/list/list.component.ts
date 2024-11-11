import { Component, OnInit } from '@angular/core';
import { months } from '../../../../utils/constants';
import { IUsersResult } from '../../../types/User';
import { LogService } from '../../logs/log.service';
import { SpinnerService } from '../../../common/spinner/spinner.service';
import { ToastrService } from 'ngx-toastr';
import { logout } from '../../../store/auth/auth.actions';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  months = months;
  selectedMonth: string = (new Date().getMonth() + 1).toString();
  users: IUsersResult[] = [];

  constructor(
    private logService: LogService,
    private spinnerService: SpinnerService,
    private toastr: ToastrService,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.generateReport();
  }

  logoutUser() {
    this.store.dispatch(logout());
    this.router.navigate(['/auth/login']);
  }

  async generateReport() {
    this.spinnerService.show();
    try {
      const currentYear = new Date().getFullYear();
      const response = await this.logService.getTransactionCountWithUserDetails(
        parseInt(this.selectedMonth),
        currentYear
      );
      this.users = response;
      this.spinnerService.hide();
    } catch (error) {
      this.spinnerService.hide();
      this.toastr.error('Ha ocurrido un error obteniendo los datos');
    }
  }
}
