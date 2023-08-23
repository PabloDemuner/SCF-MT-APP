import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { LoginHomeComponent } from './login-home/login-home.component';

const routes: Routes = [
  { path: 'login', 
    component: LoginHomeComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SegurancaRoutingModule { }