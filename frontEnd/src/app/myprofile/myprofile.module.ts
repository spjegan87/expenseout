import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MyprofileRoutingModule } from './myprofile-routing.module';
import { ProfileindexComponent } from './components/profileindex/profileindex.component';
import { ProfileimageComponent } from './components/profileimage/profileimage.component';
import { FormdataComponent } from './components/formdata/formdata.component';
import { SharedModuleModule} from './../shared-module/shared-module.module';
import { CoreModule } from './../core-module/core.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AdvanceApprovalComponent } from './components/advance-approval/advance-approval.component';
import { FinanceApprovalComponent } from './components/finance-approval/finance-approval.component';
import { ExpenseApprovalComponent } from './components/expense-approval/expense-approval.component';
import { DynamicFormModule } from '../common-components/dynamic-form/dynamic-form.module';
import { SideTabModule } from '../common-components/side-tab/side-tab.module';

@NgModule({
  declarations: [ProfileindexComponent, ProfileimageComponent, FormdataComponent, ChangePasswordComponent, AdvanceApprovalComponent, FinanceApprovalComponent, ExpenseApprovalComponent],
  imports: [
    CommonModule,
    MyprofileRoutingModule,
    SharedModuleModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SideTabModule,
    DynamicFormModule
  ]
})
export class MyprofileModule { }
