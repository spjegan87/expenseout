import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TabRoutingModule } from './tab-routing.module';
import { TabComponent } from './tab/tab.component';
import { CommonFilterModule } from '../common-filter/common-filter.module';
import { CoreModule } from 'src/app/core-module/core.module';
import { SharedModuleModule } from 'src/app/shared-module/shared-module.module';
import { TopnavModule } from '../topnav/topnav.module';
import { CommonListModule } from 'src/app/common-list/common-list.module';


@NgModule({
  declarations: [TabComponent],
  imports: [
    CommonModule,
    TabRoutingModule,
    CoreModule,
    CommonFilterModule,
    SharedModuleModule,
    TopnavModule,
    CommonListModule
  ],
  exports: [
    TabComponent
  ]
})
export class TabModule { }
