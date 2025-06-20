import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DynamicFormRoutingModule } from './dynamic-form-routing.module';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from 'src/app/core-module/core.module';
import { NgSelect2Module } from "ng-select2";
// import { ListdataModule } from 'src/app/listdata/listdata.module';


@NgModule({
  declarations: [DynamicFormComponent],
  imports: [
    CommonModule,
    DynamicFormRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgSelect2Module
  ],
  exports:[
    DynamicFormComponent
  ]
})
export class DynamicFormModule { }
