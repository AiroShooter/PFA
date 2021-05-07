import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DoctorGuard } from './doctor.guard';
@NgModule({
  declarations: [DoctorComponent, SidemenuComponent],
  imports: [CommonModule, DoctorRoutingModule, ModalModule.forRoot()],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[DoctorGuard]
})
export class DoctorModule {}
