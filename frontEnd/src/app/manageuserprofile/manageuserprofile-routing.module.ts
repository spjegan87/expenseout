import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ManageuserindexComponent } from './components/manageuserindex/manageuserindex.component';

const routes: Routes = [
  {
    path:'',
    component:ManageuserindexComponent
  },
  {
    path:'**',
    component:ManageuserindexComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageuserprofileRoutingModule { }
