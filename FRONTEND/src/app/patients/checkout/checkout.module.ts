import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { CheckoutComponent } from './checkout.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [CheckoutComponent],
  imports: [
    CommonModule,
    FormsModule,
    CheckoutRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class CheckoutModule { }
