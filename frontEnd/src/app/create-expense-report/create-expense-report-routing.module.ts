import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReportIndexComponent} from '../create-expense-report/components/report-index/report-index.component';

const routes: Routes = [
  {
    path: "",
    component: ReportIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateExpenseReportRoutingModule { }
