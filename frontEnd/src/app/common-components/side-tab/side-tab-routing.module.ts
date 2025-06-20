import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SideTabComponent } from './side-tab/side-tab.component';

const routes: Routes = [
  {
    path:'',
    component:SideTabComponent
  },
  {
    path:'**',
    component:SideTabComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SideTabRoutingModule { }
