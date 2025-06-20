import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ExpenseAdminReportComponent } from './expense-admin-report/expense-admin-report.component';
import { ExpenseAdminReportRoutingModule } from './expense-admin-report-routing.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoreModule } from '../core-module/core.module'
import { TabModule } from '../common-components/tab/tab.module';


@NgModule({
  declarations: [ExpenseAdminReportComponent],
  imports: [
    CommonModule,
    ExpenseAdminReportRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    TabModule
  ]
})
export class ExpenseAdminReportModule { }
