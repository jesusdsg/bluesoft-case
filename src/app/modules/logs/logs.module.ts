import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogsRoutingModule } from './logs-routing.module';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';
import { TransactionTypePipe } from '../../common/pipes/transaction-type.pipe';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, LogsRoutingModule, FormsModule, TransactionTypePipe],
})
export class LogsModule {}
