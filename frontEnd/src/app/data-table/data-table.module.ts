import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataTableRoutingModule } from './data-table-routing.module';
import { DataTableComponent } from './data-table/data-table.component';
import { CoreModule } from '../core-module/core.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';


@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    DataTableRoutingModule,
    CoreModule,
    SharedModuleModule
  ],
  exports:[
    DataTableComponent
  ]
})
export class DataTableModule { }
