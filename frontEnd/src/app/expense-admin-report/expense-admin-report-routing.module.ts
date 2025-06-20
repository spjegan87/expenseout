import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ExpenseAdminReportComponent } from './expense-admin-report/expense-admin-report.component';
const routes: Routes = [
  {
    path:'',
    component:ExpenseAdminReportComponent
  },
  {
    path:'**',
    component:ExpenseAdminReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseAdminReportRoutingModule { }
