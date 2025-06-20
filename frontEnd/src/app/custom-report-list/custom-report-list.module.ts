import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomReportListRoutingModule } from './custom-report-list-routing.module';
import { ListComponent } from './list/list.component';
import { SavedReportListComponent } from './saved-report-list/saved-report-list.component';
import { CustomReportModule } from '../custom-report/custom-report.module'

@NgModule({
  declarations: [ListComponent, SavedReportListComponent],
  imports: [
    CommonModule,
    CustomReportListRoutingModule,
    CustomReportModule
  ]
})
export class CustomReportListModule { }
