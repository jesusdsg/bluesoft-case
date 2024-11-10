import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { UserManagementRoutingModule } from './user-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [ListComponent, FormComponent],
  imports: [CommonModule, UserManagementRoutingModule, FormsModule],
})
export class UserManagementModule {}
