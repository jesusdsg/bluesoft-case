import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { TransactionTypePipe } from '../../common/pipes/transaction-type.pipe';

@NgModule({
  declarations: [DetailComponent, ListComponent],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    FormsModule,
    TransactionTypePipe,
  ],
})
export class UserModule {}
