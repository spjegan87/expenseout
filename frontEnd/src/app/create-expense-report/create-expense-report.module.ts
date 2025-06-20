import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormModule} from '../form-module/form.module';
import { CreateExpenseReportRoutingModule } from './create-expense-report-routing.module';
import { ReportIndexComponent } from './components/report-index/report-index.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CoreModule } from '../core-module/core.module';
import { ImagepreviewComponent } from './components/imagepreview/imagepreview.component';
import { GridListComponent } from './components/grid-list/grid-list.component';
import { DatePipe } from '@angular/common';
import { AdvanceAdjustmentComponent } from './components/advance-adjustment/advance-adjustment.component';
import { ManualReimbursementComponent } from './components/manual-reimbursement/manual-reimbursement.component';
import { ApprovalAlertComponent } from './components/approval-alert/approval-alert.component';
import { ReportReciptComponent } from './components/report-recipt/report-recipt.component';
import { MileageItineraryMobileComponent } from './components/mileage-itinerary-mobile/mileage-itinerary-mobile.component';
import { MileageReportMobileComponent} from './components/mileage-report-mobile/mileage-report-mobile.component';
import {NgxImageCompressService} from 'ngx-image-compress';
import { MileageReportWebviewComponent } from './components/mileage-report-webview/mileage-report-webview.component';
import { TravelStatementComponent } from './components/travel-statement/travel-statement.component';
import { DefaultPopupComponent } from './components/default-popup/default-popup.component';
import {NgxPrintModule} from 'ngx-print';
@NgModule({
  declarations: [ReportIndexComponent, ImagepreviewComponent, GridListComponent, AdvanceAdjustmentComponent, ManualReimbursementComponent, ApprovalAlertComponent, ReportReciptComponent,MileageItineraryMobileComponent,MileageReportMobileComponent,MileageReportWebviewComponent, TravelStatementComponent, DefaultPopupComponent],
  imports: [
    CommonModule,
    CreateExpenseReportRoutingModule,
    SharedModuleModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    NgxPrintModule
  ],
  exports:[
    ImagepreviewComponent
  ],
  providers: [NgxImageCompressService,DatePipe]
})
export class CreateExpenseReportModule { }
