import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingApprovalComponent } from './pending-approval/pending-approval.component'
const routes: Routes = [
  {
    path:'',
    component:PendingApprovalComponent
  },
  {
    path:'**',
    component:PendingApprovalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingApprovalModuleRoutingModule { }
