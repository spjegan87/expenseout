import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CustomReportRoutingModule } from './custom-report-routing.module';
import { CustomReportIndexComponent } from './custom-report-index/custom-report-index.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { CheckboxComponent } from './checkbox/checkbox.component';


@NgModule({
  declarations: [CustomReportIndexComponent, SideMenuComponent, CheckboxComponent],
  imports: [
    CommonModule,
    CustomReportRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    SideMenuComponent
  ]
})
export class CustomReportModule { }
