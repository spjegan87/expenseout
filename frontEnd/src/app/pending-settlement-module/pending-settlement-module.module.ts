import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingSettlementModuleRoutingModule } from './pending-settlement-module-routing.module';
import { PendingSettlementComponent } from './pending-settlement/pending-settlement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '../core-module/core.module';
import { PendingApprovalModuleModule } from './../pending-approval-module/pending-approval-module.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {AdvanceRequestModuleModule } from '../advance-request-module/advance-request-module.module';
import { CreateExpenseReportModule } from '../create-expense-report/create-expense-report.module';
import { TabModule } from '../common-components/tab/tab.module';

@NgModule({
  declarations: [PendingSettlementComponent],
  imports: [
    CommonModule,
    PendingSettlementModuleRoutingModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModuleModule,
    PendingApprovalModuleModule,
    AdvanceRequestModuleModule,
    CreateExpenseReportModule,
    TabModule
  ]
})
export class PendingSettlementModuleModule { }
