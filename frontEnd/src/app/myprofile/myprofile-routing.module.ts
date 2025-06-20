import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileindexComponent } from './components/profileindex/profileindex.component';
// import { FormdataComponent } from './components/formdata/formdata.component';
// ProfileindexComponent
const routes: Routes = [
  {
    path:'',
    component:ProfileindexComponent
  },
  {
    path:'**',
    component:ProfileindexComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyprofileRoutingModule { }
