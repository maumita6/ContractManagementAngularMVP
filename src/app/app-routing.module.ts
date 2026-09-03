import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';



const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule) }
    ]
  },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('./features/dashboard/dashboard.module').then(m => m.DashboardModule)
      }
    ]
  },
  // Redirects any completely unmatched URL to login
  { path: '**', redirectTo: 'login' }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
