import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  declarations: [DetailComponent],
  imports: [CommonModule, UserManagementRoutingModule, FormsModule],
})
export class UserModule {}
