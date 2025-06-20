import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SavedReportListComponent } from '../custom-report-list/saved-report-list/saved-report-list.component'
const routes: Routes = [
  {
    path: "",
    component: SavedReportListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomReportListRoutingModule { }
