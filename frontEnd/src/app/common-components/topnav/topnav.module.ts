import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopnavRoutingModule } from './topnav-routing.module';
import { TopNavbarComponent } from './top-navbar/top-navbar.component';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';


@NgModule({
  declarations: [TopNavbarComponent],
  imports: [
    CommonModule,
    TopnavRoutingModule,
    SharedModuleModule
  ],
  exports:[
    TopNavbarComponent
  ]
})
export class TopnavModule { }
