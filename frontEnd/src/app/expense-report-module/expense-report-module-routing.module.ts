import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpenseReportComponent } from './expense-report/expense-report.component'

const routes: Routes = [
  {
    path:'',
    component:ExpenseReportComponent
  },
  {
    path:'**',
    component:ExpenseReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpenseReportModuleRoutingModule { }
