import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ScheduleReportRoutingModule } from './schedule-report-routing.module';
import { ScheduleComponent } from './schedule/schedule.component';


@NgModule({
  declarations: [ScheduleComponent],
  imports: [
    CommonModule,
    ScheduleReportRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ScheduleReportModule { }
