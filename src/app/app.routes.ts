import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';

export const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.UserModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'log',
    loadChildren: () =>
      import('./modules/logs/logs.module').then((m) => m.LogsModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'auth/login' },
];
