import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';

const routes: Routes = [
  {
    path:'',
    component:TopNavbarComponent
  },
  {
    path:'**',
    component:TopNavbarComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopnavRoutingModule { }
