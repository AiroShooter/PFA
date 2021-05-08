import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorStartRoutingModule } from './doctor-start-routing.module';
import { DoctorStartComponent } from './doctor-start.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DoctorStartComponent],
  imports: [
    CommonModule,
    DoctorStartRoutingModule,
    HttpClientModule
  ]
})
export class DoctorStartModule { }
