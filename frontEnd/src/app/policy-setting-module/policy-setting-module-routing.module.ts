import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
const routes: Routes = [
  {
    path:'',
    component:SettingsComponent
  },
  {
    path:'**',
    component:SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PolicySettingModuleRoutingModule { }
