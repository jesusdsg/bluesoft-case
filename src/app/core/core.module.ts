import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { AuthModule } from '@angular/fire/auth';
import { FirebaseAppModule } from '@angular/fire/app';
import {
  AngularFireAuth,
  AngularFireAuthModule,
} from '@angular/fire/compat/auth';

@NgModule({
  declarations: [],
  imports: [CommonModule, AuthModule, AngularFireAuthModule],
  providers: [AuthService, AuthGuard],
})
export class CoreModule {}
