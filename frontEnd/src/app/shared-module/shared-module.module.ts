import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModuleRoutingModule } from './shared-module-routing.module';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { WidgetComponent } from './components/widget/widget.component';
import { AlertComponent } from './components/alert/alert.component';
import { TabComponent } from './components/tab/tab.component';
import { FilterComponent } from './components/filter/filter.component';
import { CoreModule } from './../core-module/core.module';
import { AdvanceformComponent } from './components/advanceform/advanceform.component';
import { SettleformComponent } from './components/settleform/settleform.component';
import { DatePipe } from '@angular/common';
// import { DataTableComponent } from '../data-table/data-table.component';
import { BulkUploadComponent } from './components/bulk-upload/bulk-upload.component';
import { NetworkErrorComponent } from './components/network-error/network-error.component';
import { UnauthorizedPageComponent } from './components/unauthorized-page/unauthorized-page.component';
import { UserInfoComponent } from './components/user-info/user-info.component';
import { AdvancealertComponent } from './components/advancealert/advancealert.component';
import { ReporthistoryComponent } from './components/reporthistory/reporthistory.component';
import { CommonFilterModule } from '../common-components/common-filter/common-filter.module';
import { CreatecategoryComponent } from './components/createcategory/createcategory.component';
import { CreateProfileGroupComponent } from './components/create-profile-group/create-profile-group.component';
import { OverrideAmountComponent } from './components/override-amount/override-amount.component';
import { AddRuleComponent } from './components/add-rule/add-rule.component';
import { CitygroupComponent } from './components/citygroup/citygroup.component';
import { CreatePolicyComponent } from './components/create-policy/create-policy.component';
import { CreateAllowanceCreationComponent } from './components/create-allowance-creation/create-allowance-creation.component';
import { AddnewComponent } from './components/addnew/addnew.component';
// import { TopnavModule } from '../common-components/topnav/topnav.module';
import { ListLoaderComponent } from './components/list-loader/list-loader.component';
import { TopnavLoaderComponent } from './components/topnav-loader/topnav-loader.component';
import { CreateBudgetComponent } from './components/create-budget/create-budget.component';
import { CreateAdvancePolicyComponent } from './components/create-advance-policy/create-advance-policy.component';
// import { CommonListModule } from '../common-list/common-list.module';
// import { DataTableModule } from '../data-table/data-table.module';

@NgModule({
  declarations: [
    // HistoryComponent,DataTableComponent
    BreadcrumbComponent, WidgetComponent,AlertComponent, TabComponent,FilterComponent, AdvanceformComponent, SettleformComponent, BulkUploadComponent, NetworkErrorComponent, UnauthorizedPageComponent, UserInfoComponent, AdvancealertComponent, ReporthistoryComponent, CreatecategoryComponent, CreateProfileGroupComponent,CreateAllowanceCreationComponent, OverrideAmountComponent,AddRuleComponent,CreatePolicyComponent,CitygroupComponent,AddnewComponent, ListLoaderComponent, TopnavLoaderComponent, CreateBudgetComponent, CreateAdvancePolicyComponent],
  providers :[DatePipe],
  imports: [
    CommonModule,
    SharedModuleRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CommonFilterModule,
    // TopnavModule,
    // DataTableModule
    // CommonListModule
    // CreateExpenseReportModule
  ],
  exports :[
    BreadcrumbComponent,
    WidgetComponent,
    AlertComponent,
    // TabComponent,
    // DataTableComponent,
    SettleformComponent,
    NetworkErrorComponent,
    UnauthorizedPageComponent,
    AdvancealertComponent,
    UserInfoComponent,
    ReporthistoryComponent,
    BulkUploadComponent,
    CreatecategoryComponent,
    CreateProfileGroupComponent,
    CreatePolicyComponent,
    CreateAllowanceCreationComponent,
    CitygroupComponent,
    AddnewComponent,
    AdvanceformComponent,
    ListLoaderComponent,
    TopnavLoaderComponent,
    CreateBudgetComponent,
    CreateAdvancePolicyComponent
  ]
})
export class SharedModuleModule { }