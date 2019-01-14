import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './shared';

const routes: Routes = [
  { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginModule'},
  { path: 'forgot-password', loadChildren: './forgot-password/forgot-password.module#ForgotPasswordModule'},
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
    exports: [RouterModule]
})
export class AppRoutingModule { }
