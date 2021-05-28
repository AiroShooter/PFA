import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminGuard } from './admin.guard';
const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
   // canLoad:[AdminGuard],canActivateChild:[AdminGuard],canActivate:[AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'forgot-pass',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import(
            './pages/authendication/forgot-password/forgot-password.module'
          ).then((m) => m.ForgotPasswordModule),
      },
      {
        path: 'login-form',
        loadChildren: () =>
          import('./pages/authendication/login/login.module').then(
            (m) => m.LoginModule
          ),
      },
      {
        path: 'admin-invoice',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./invoice/admin-invoice.module').then(
            (m) => m.AdminInvoiceModule
          ),
      },
      {
        path: 'doc-profile',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./doc-profile/doc-profile.module').then(
            (m) => m.DocProfileModule
          ),
      },
      {
        path: 'lock-screen',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./pages/authendication/lock-screen/lock-screen.module').then(
            (m) => m.LockScreenModule
          ),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./pages/authendication/regiser/register.module').then(
            (m) => m.RegisterModule
          ),
      },
      {
        path: 'blank-page',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./pages/blank-page/blank-page.module').then(
            (m) => m.BlankPageModule
          ),
      },
      {
        path: 'error-first',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./pages/error-pages/error-first/error-first.module').then(
            (m) => m.ErrorFirstModule
          ),
      },
      {
        path: 'error-second',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./pages/error-pages/error-second/error-second.module').then(
            (m) => m.ErrorSecondModule
          ),
      },
      {
        path: 'components',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./ui-interface/components/components.module').then(
            (m) => m.ComponentsModule
          ),
      },
      {
        path: 'basic-input',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./ui-interface/forms/basic-inputs/basic-inputs.module').then(
            (m) => m.BasicInputsModule
          ),
      },
      {
        path: 'form-validation',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import(
            './ui-interface/forms/form-validation/form-validation.module'
          ).then((m) => m.FormValidationModule),
      },
      {
        path: 'horizondal-form',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import(
            './ui-interface/forms/horizondal-form/horizondal-form.module'
          ).then((m) => m.HorizondalFormModule),
      },
      {
        path: 'input-groups',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./ui-interface/forms/input-groups/input-groups.module').then(
            (m) => m.InputGroupsModule
          ),
      },
      {
        path: 'vertical-form',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import(
            './ui-interface/forms/vertical-form/vertical-form.module'
          ).then((m) => m.VerticalFormModule),
      },
      {
        path: 'form-mask',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./ui-interface/forms/form-mask/form-mask.module').then(
            (m) => m.FormMaskModule
          ),
      },
      {
        path: 'basic-tables',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./ui-interface/tables/basic-tables/basic-tables.module').then(
            (m) => m.BasicTablesModule
          ),
      },
      {
        path: 'admin-data-table',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import(
            './ui-interface/tables/admin-data-table/admin-data-table.module'
          ).then((m) => m.AdminDataTableModule),
      },
      {
        path: 'appointment',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./appointments/appointments.module').then(
            (m) => m.AppointmentsModule
          ),
      },
      {
        path: 'specialities',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./specialities/specialities.module').then(
            (m) => m.SpecialitiesModule
          ),
      },
      {
        path: 'blog',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./blog/blog/blog.module').then((m) => m.BlogModule),
      },
      {
        path: 'blog-details',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./blog/blog-details/blog-details.module').then((m) => m.BlogDetailsModule),
      },
      {
        path: 'add-blog',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./blog/add-blog/add-blog.module').then((m) => m.AddBlogModule),
      },
      {
        path: 'pending-blog',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./blog/pending-blog/pending-blog.module').then((m) => m.PendingBlogModule),
      },
      {
        path: 'edit-blog',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./blog/add-blog/add-blog.module').then((m) => m.AddBlogModule),
      },
      {
        path: 'product-list',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./product-list/product-list.module').then((m) => m.ProductListModule),
      },
      {
        path: 'pharmacy-list',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./pharmacy-list/pharmacy-list.module').then((m) => m.PharmacyListModule),
      },
      {
        path: 'doctor',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./doctors/doctors.module').then((m) => m.DoctorsModule),
      },
      {
        path: 'patients',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./patients/patients.module').then((m) => m.PatientsModule),
      },
      {
        path: 'transactions',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./transactions/transactions.module').then(
            (m) => m.TransactionsModule
          ),
      },
      {
        path: 'settings',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
      },
      {
        path: 'reviews',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./reviews/reviews.module').then((m) => m.ReviewsModule),
      },
      {
        path: 'invoice-reports',
        canActivate:[AdminGuard],
        loadChildren: () =>
          import('./invoice-reports/invoice-reports.module').then(
            (m) => m.InvoiceReportsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
