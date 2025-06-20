import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { CoreModule } from '../core-module/core.module';
import { FormModule} from '../form-module/form.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { RegisterComponent } from "./register/register.component";

/**
 * Author: Shailesh R
 * Desc: App module
 */
@NgModule({
  declarations: [LoginComponent, ResetpasswordComponent, ForgetpasswordComponent,RegisterComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    CoreModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
