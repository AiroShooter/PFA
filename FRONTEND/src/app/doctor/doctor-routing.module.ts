import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DoctorGuard } from './doctor.guard';
import { DoctorComponent } from './doctor.component';

const routes: Routes = [
  {
    path: '',
  //  canLoad:[DoctorGuard],canActivateChild:[DoctorGuard],canActivate:[DoctorGuard],
    component: DoctorComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        canActivate:[DoctorGuard],
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        canActivate:[DoctorGuard],
        path: 'appointment',
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {  canActivate:[DoctorGuard],
        path: 'patients',
        loadChildren: () =>
          import('./mypatients/mypatients.module').then(
            (m) => m.MypatientsModule
          ),
      },
      {  canActivate:[DoctorGuard],
        path: 'scheduletiming',
        loadChildren: () =>
          import('./scheduletiming/scheduletiming.module').then(
            (m) => m.ScheduletimingModule
          ),
      },
      {
        canActivate:[DoctorGuard],
        path: 'invoice',
        loadChildren: () =>
          import('./invoice/invoice.module').then((m) => m.InvoiceModule),
      },
      {
        canActivate:[DoctorGuard],
        path: 'reviews',
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        canActivate:[DoctorGuard],
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        canActivate:[DoctorGuard],
        path: 'social-media',
        loadChildren: () =>
          import('./social-media/social-media.module').then(
            (m) => m.SocialMediaModule
          ),
      },
      {
        path: 'message',
        loadChildren: () =>
          import('./messages/messages.module').then((m) => m.MessagesModule),
      },
    ],
  },

  { 
    canActivate:[DoctorGuard],
    path: 'start', 
    loadChildren: () => 
      import('./doctor-start/doctor-start.module').then(m => m.DoctorStartModule) },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoctorRoutingModule {}
