import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SideTabRoutingModule } from './side-tab-routing.module';
import { SideTabComponent } from './side-tab/side-tab.component';
import { CoreModule } from 'src/app/core-module/core.module';


@NgModule({
  declarations: [SideTabComponent],
  imports: [
    CommonModule,
    SideTabRoutingModule,
    CoreModule
  ],
  exports:[
    SideTabComponent
  ]
})
export class SideTabModule { }
