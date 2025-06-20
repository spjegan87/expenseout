import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomReportIndexComponent } from '../custom-report/custom-report-index/custom-report-index.component'
const routes: Routes = [
  {
    path: "",
    component: CustomReportIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomReportRoutingModule { }
