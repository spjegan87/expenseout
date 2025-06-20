import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingApprovalModuleRoutingModule } from './pending-approval-module-routing.module';
import { PendingApprovalComponent } from './pending-approval/pending-approval.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { CoreModule } from '../core-module/core.module';
import { DatePipe } from '@angular/common';
import { CreateExpenseReportModule } from '../create-expense-report/create-expense-report.module';
import { TabModule } from '../common-components/tab/tab.module';

@NgModule({
  declarations: [PendingApprovalComponent],
  imports: [
    CommonModule,
    PendingApprovalModuleRoutingModule,
    ReactiveFormsModule,
    SharedModuleModule,
    CoreModule,
    SharedModuleModule,
    CreateExpenseReportModule,
    TabModule
    // AdvanceRequestModuleModule
  ],
  providers :[DatePipe]
})
export class PendingApprovalModuleModule { }
