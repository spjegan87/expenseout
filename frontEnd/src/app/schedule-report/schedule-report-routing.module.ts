import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ScheduleComponent } from '../schedule-report/schedule/schedule.component'
const routes: Routes = [
  {
    path: "",
    component: ScheduleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScheduleReportRoutingModule { }
