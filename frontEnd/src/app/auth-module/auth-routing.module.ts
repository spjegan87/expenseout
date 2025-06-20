import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { urlConfig } from '../core-module/config/url';
import { LoginComponent } from './login/login.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { RegisterComponent } from "./register/register.component";
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component'
const routes: Routes = [
  {
    path: urlConfig.ROUTES.login,
    component: LoginComponent
  },
  {
    path: urlConfig.ROUTES.resetPassword,
    component: ResetpasswordComponent
  },
  {
    path: urlConfig.ROUTES.forgetPassword,
    component: ForgetpasswordComponent
  },
  {
    path: urlConfig.ROUTES.signup,
    component: RegisterComponent,
  },
  {
    path: '',
    redirectTo: urlConfig.ROUTES.login
  },
  {
    path: '**',
    redirectTo: urlConfig.ROUTES.login
  }
];

/**
 * Author: Shailesh R
 * Desc: Auth routing
 */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
