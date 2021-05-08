import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorStartRoutingModule } from './doctor-start-routing.module';
import { DoctorStartComponent } from './doctor-start.component';


@NgModule({
  declarations: [DoctorStartComponent],
  imports: [
    CommonModule,
    DoctorStartRoutingModule
  ]
})
export class DoctorStartModule { }
