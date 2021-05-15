import { NgModule,NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScheduletimingRoutingModule } from './scheduletiming-routing.module';
import { ScheduletimingComponent } from './scheduletiming.component';
import { NgSelect2Module } from 'ng-select2';
import { FormsModule } from '@angular/forms';

@NgModule({
  schemas:[NO_ERRORS_SCHEMA],
  declarations: [ScheduletimingComponent],
  imports: [NgSelect2Module, CommonModule, ScheduletimingRoutingModule, FormsModule],
})
export class ScheduletimingModule {}
