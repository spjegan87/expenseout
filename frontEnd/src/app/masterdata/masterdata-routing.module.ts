import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterindexComponent } from './components/masterindex/masterindex.component';

const routes: Routes = [
  {
    path:'',
    component:MasterindexComponent
  },
  {
    path:'**',
    component:MasterindexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterdataRoutingModule { }
