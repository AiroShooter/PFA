import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientsStartRoutingModule } from './patients-start-routing.module';
import { PatientsStartComponent } from './patients-start.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [PatientsStartComponent],
  imports: [
    CommonModule,
    PatientsStartRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PatientsStartModule { }
