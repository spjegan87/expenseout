import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { urlConfig } from '../core-module/config/url';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: urlConfig.ROUTES.signup,
  },
  {
    path: urlConfig.ROUTES.signup,
    component: FormComponent,
    data: {
      json: 'signup'
    }
  },
 
  {
    path: '**',
    redirectTo: urlConfig.ROUTES.signup 
  }
];

/**
 * Author: Shailesh R
 * Desc: Form routing
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }
