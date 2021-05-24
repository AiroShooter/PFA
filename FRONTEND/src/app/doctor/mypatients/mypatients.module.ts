import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MypatientsRoutingModule } from './mypatients-routing.module';
import { MypatientsComponent } from './mypatients.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [MypatientsComponent],
  imports: [
    CommonModule,
    MypatientsRoutingModule,
    HttpClientModule
  ]
})
export class MypatientsModule { }
