import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvanceRequestIndexComponent } from './components/advance-request-index/advance-request-index.component'
const routes: Routes = [
  {
    path:'',
    component:AdvanceRequestIndexComponent
  },
  {
    path:'**',
    component:AdvanceRequestIndexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvanceRequestModuleRoutingModule { }
