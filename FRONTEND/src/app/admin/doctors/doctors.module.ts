import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DoctorsRoutingModule } from './doctors-routing.module';
import { DoctorsComponent } from './doctors.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [DoctorsComponent],
  imports: [
    CommonModule,
    DoctorsRoutingModule,
    DataTablesModule,
    HttpClientModule
  ]
})
export class DoctorsModule { }
