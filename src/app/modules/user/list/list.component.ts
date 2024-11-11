import { Component } from '@angular/core';
import { months } from '../../../../utils/constants';
import { IUser } from '../../../types/User';
@Component({
  selector: 'app-list',
  standalone: false,
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent {
  months = months;
  selectedMonth: string = (new Date().getMonth() + 1).toString();
  users: IUser[] = [];
}
