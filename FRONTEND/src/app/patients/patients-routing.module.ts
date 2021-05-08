import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientGuard } from './patient.guard';
import { PatientsComponent } from './patients.component';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'favourites',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./favourites/favourites.module').then(
            (m) => m.FavouritesModule
          ),
      },
      {
        path: 'booking',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./booking/booking.module').then((m) => m.BookingModule),
      },
      {
        path: 'component',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./component/component.module').then((m) => m.ComponentModule),
      },
      {
        path: 'patient-profile',
        loadChildren: () =>
          import('./patient-profile/patient-profile.module').then(
            (m) => m.PatientProfileModule
          ),
      },
      {
        path: 'add-billing',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./add-billing/add-billing.module').then(
            (m) => m.AddBillingModule
          ),
      },
      {
        path: 'edit-billing',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./edit-billing/edit-billing.module').then(
            (m) => m.EditBillingModule
          ),
      },
      {
        path: 'add-prescription',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./add-prescription/add-prescription.module').then(
            (m) => m.AddPrescriptionModule
          ),
      },
      {
        path: 'add-prescription',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./edit-prescription/edit-prescription.module').then(
            (m) => m.EditPrescriptionModule
          ),
      },
      {
        path: 'edit-prescription',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./add-prescription/add-prescription.module').then(
            (m) => m.AddPrescriptionModule
          ),
      },
      {
        path: 'doctor-profile',
        loadChildren: () =>
          import('./doctor-profile/doctor-profile.module').then(
            (m) => m.DoctorProfileModule
          ),
      },
      {
        path: 'settings',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'search-doctor',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./search-doctor/search-doctor.module').then(
            (m) => m.SearchDoctorModule
          ),
      },
      {
        path: 'message',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./../doctor/messages/messages.module').then(
            (m) => m.MessagesModule
          ),
      },
      {
        path: 'success',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./success/success.module').then((m) => m.SuccessModule),
      },
      {
        path: 'checkout',
       // canActivate:[PatientGuard],
        loadChildren: () =>
          import('./checkout/checkout.module').then((m) => m.CheckoutModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
