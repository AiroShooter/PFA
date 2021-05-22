import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpecialitiesRoutingModule } from './specialities-routing.module';
import { AddComponent } from './add/add.component';
import { ViewComponent } from './view/view.component';
import { SpecialitiesComponent } from './specialities.component';
import { DataTablesModule } from 'angular-datatables';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AddComponent, ViewComponent, SpecialitiesComponent],
  imports: [
    CommonModule,
    SpecialitiesRoutingModule,
    FormsModule,
    DataTablesModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class SpecialitiesModule { }
