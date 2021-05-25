import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password.component';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ ChangePasswordComponent ],
  imports: [
    CommonModule,
    HttpClientModule,
    ChangePasswordRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChangePasswordModule { }
