import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegiserComponent } from './regiser.component';
import { RegisterRoutingModule } from './register-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [RegiserComponent],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class RegisterModule { }
