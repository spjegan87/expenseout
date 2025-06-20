import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PolicySettingModuleRoutingModule } from './policy-setting-module-routing.module';
import { SharedModuleModule} from './../shared-module/shared-module.module';
import { CoreModule } from '../core-module/core.module';
import { SettingsComponent } from './components/settings/settings.component';
// import { CreatecategoryComponent } from './components/createcategory/createcategory.component';
// import { CreatepolicyComponent } from './components/createpolicy/createpolicy.component';
// import { CreateAllowenceCreationComponent } from './components/create-allowence-creation/create-allowence-creation.component';
// import { CreateProfileGroupComponent } from './components/create-profile-group/create-profile-group.component';
// import { OverrideAmountComponent } from './components/override-amount/override-amount.component';
// import { CitygroupComponent } from './components/citygroup/citygroup.component';
import { SideTabModule } from '../common-components/side-tab/side-tab.module';
import { CommonListModule } from '../common-list/common-list.module';

@NgModule({
  declarations: [SettingsComponent],
  
  // declarations: [SettingsComponent, CreatecategoryComponent, CreatepolicyComponent, CreateAllowenceCreationComponent, CreateProfileGroupComponent, OverrideAmountComponent, CitygroupComponent],
  imports: [
    CommonModule,
    PolicySettingModuleRoutingModule,
    SharedModuleModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SideTabModule,
    CommonListModule
  ],
  exports:[
  //  CreatecategoryComponent,
  //  CreateProfileGroupComponent,
  //  CreatepolicyComponent,
  //  CitygroupComponent
  ]
})
export class PolicySettingModuleModule { }
