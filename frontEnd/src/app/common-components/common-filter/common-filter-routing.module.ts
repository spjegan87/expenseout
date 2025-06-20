import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonFilterComponent } from './common-filter/common-filter.component';

const routes: Routes = [
  {
    path:'',
    component:CommonFilterComponent
  },
  {
    path:'**',
    component:CommonFilterComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommonFilterRoutingModule { }
