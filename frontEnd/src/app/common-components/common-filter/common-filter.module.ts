import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonFilterRoutingModule } from './common-filter-routing.module';
import { CommonFilterComponent } from './common-filter/common-filter.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CoreModule } from 'src/app/core-module/core.module';

@NgModule({
  declarations: [CommonFilterComponent],
  providers :[DatePipe],
  imports: [
    CommonModule,
    CommonFilterRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    CommonFilterComponent
  ]
})
export class CommonFilterModule { }
