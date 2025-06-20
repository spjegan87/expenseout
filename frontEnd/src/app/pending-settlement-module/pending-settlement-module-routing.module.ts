import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PendingSettlementComponent } from './pending-settlement/pending-settlement.component'

const routes: Routes = [
  {
    path:'',
    component:PendingSettlementComponent
  },
  {
    path:'**',
    component:PendingSettlementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingSettlementModuleRoutingModule { }
