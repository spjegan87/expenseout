import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core-module/core.module'
import { ExpenseReportModuleRoutingModule } from './expense-report-module-routing.module';
import { ExpenseReportComponent } from './expense-report/expense-report.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { TabModule } from '../common-components/tab/tab.module';
@NgModule({
  declarations: [ExpenseReportComponent],
  imports: [
    CommonModule,
    ExpenseReportModuleRoutingModule,
    CoreModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    TabModule
  ]
})
export class ExpenseReportModuleModule { }
