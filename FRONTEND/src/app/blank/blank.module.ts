import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlankComponent } from './blank.component';
import { BlankRoutingModule } from './blank-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [BlankComponent],
  imports: [CommonModule, BlankRoutingModule, HttpClientModule],
})
export class BlankModule {}
