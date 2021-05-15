import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientsStartComponent } from './patients-start.component';

const routes: Routes = [{ path: '', component: PatientsStartComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientsStartRoutingModule { }
