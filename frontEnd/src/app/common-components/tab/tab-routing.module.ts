import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabComponent } from './tab/tab.component';

const routes: Routes = [
  {
    path:'',
    component:TabComponent
  },
  {
    path:'**',
    component:TabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabRoutingModule { }
