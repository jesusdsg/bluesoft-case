import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../core/auth.guard';
import { DetailComponent } from './detail/detail.component';
import { ListComponent } from './list/list.component';
import { AdminGuard } from '../../core/role.admin.guard';
import { UserGuard } from '../../core/role.user.guard';

const routes: Routes = [
  {
    path: 'detail',
    component: DetailComponent,
    canActivate: [AuthGuard, UserGuard],
  },
  {
    path: 'list',
    component: ListComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserManagementRoutingModule {}
