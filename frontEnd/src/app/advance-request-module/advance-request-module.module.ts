import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { AdvanceRequestModuleRoutingModule } from './advance-request-module-routing.module';
import { AdvanceRequestIndexComponent } from './components/advance-request-index/advance-request-index.component';
import { CreateExpenseReportModule } from '../create-expense-report/create-expense-report.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { DatePipe } from '@angular/common';
import { CoreModule } from '../core-module/core.module';
import { TabModule } from '../common-components/tab/tab.module';
@NgModule({
  declarations: [AdvanceRequestIndexComponent],
  providers: [DatePipe],
  imports: [
    CommonModule,
    AdvanceRequestModuleRoutingModule,
    SharedModuleModule,
    FormsModule, 
    ReactiveFormsModule,
    CreateExpenseReportModule,
    CoreModule,
    TabModule
  ]
})
export class AdvanceRequestModuleModule { }
