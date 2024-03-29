import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookingRoutingModule } from './booking-routing.module';
import { BookingComponent } from './booking.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Daterangepicker } from 'ng2-daterangepicker';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [BookingComponent],
  imports: [
    CommonModule,
    BookingRoutingModule,
    NgbModule,
    Daterangepicker,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class BookingModule { }
