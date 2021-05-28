import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocProfileComponent } from './doc-profile.component';
import { DocProfileRoutingModule } from './doc-profile-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [ DocProfileComponent ],
  imports: [
    CommonModule,
    DocProfileRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class DocProfileModule { }
