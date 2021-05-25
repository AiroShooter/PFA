import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { ForgotPasswordModule } from './../../forgot-password/forgot-password.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
// import { MorrisJsModule } from 'angular-morris-js';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ForgotPasswordModule,
    HttpClientModule,
    RouterModule,
    // MorrisJsModule,
  ],
})
export class DashboardModule {}
