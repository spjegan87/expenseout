import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DashboardModuleRoutingModule } from './dashboard-module-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from './../core-module/core.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { DashboardFilterComponent } from './dashboard-filter/dashboard-filter.component';
import { DashboardIndexComponent } from './dashboard-index/dashboard-index.component';
import { DonutchartComponent } from './donutchart/donutchart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { BarchartComponent } from './barchart/barchart.component';
import { BudgetBarchartComponent } from './budget-barchart/budget-barchart.component';
import { CommonFilterModule } from '../common-components/common-filter/common-filter.module';
@NgModule({
  declarations: [DashboardComponent, AdminDashboardComponent, DashboardFilterComponent, DashboardIndexComponent, DonutchartComponent, BarchartComponent,BudgetBarchartComponent],
  providers :[DatePipe],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    CoreModule,
    SharedModuleModule,
    NgApexchartsModule,
    FormsModule, 
    ReactiveFormsModule,
    CommonFilterModule
  ]
})
export class DashboardModuleModule { }
