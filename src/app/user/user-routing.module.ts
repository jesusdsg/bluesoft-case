import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { AuthGuard } from '../core/auth.guard';

const routes: Routes = [
  { path: 'list', component: ListComponent, canActivate: [AuthGuard] },
  { path: 'create', component: FormComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
