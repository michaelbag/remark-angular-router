import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

// === Components
import { DashboardComponent } from './dashboard/dashboard.component';

// === Modules


const appRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    
    RouterModule.forRoot(appRoutes, { enableTracing: true } )
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }