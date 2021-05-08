import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorStartComponent } from './doctor-start.component';

const routes: Routes = [{ path: '', component: DoctorStartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorStartRoutingModule { }
