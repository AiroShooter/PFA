import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorStartRoutingModule } from './doctor-start-routing.module';
import { DoctorStartComponent } from './doctor-start.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [DoctorStartComponent],
  imports: [
    CommonModule,
    DoctorStartRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DoctorStartModule { }
