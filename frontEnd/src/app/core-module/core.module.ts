import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HeaderComponent } from './components/header/header.component';
import { RequestInterceptor } from './interceptors/request.interceptor';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { FormFieldDirective } from './directives/form-field.directive';
import { ValidationDirective } from './directives/validation.directive';
import { FormEventDirective } from './directives/formEvent.directive';
import { RouterModule } from '@angular/router';
import { AccessibilityHeaderComponent } from './components/accessibility-header/accessibility-header.component';
import { TranslatePipe } from './pipes/language.pipe';
import { TruncatePipe } from './pipes/limitTo.pipe';
// import { DataTableComponent } from '../data-table/data-table.component';
import { FontSizeDirective } from './directives/font-size.directive';
import { TimezonePipe } from './pipes/timezone.pipe';
import { RemoveWhiteSpace } from './pipes/removeWhiteSpace.pipe'
import { AmountPipe } from './pipes/amount.pipe';
/**
 * Author: Shailesh R
 * Modified By : Padma Priya CK 
 * Desc: Core module contains common components
 * Powered by : Infiniti software solutions
 */
@NgModule({
  declarations: [
    HeaderComponent,
    // DataTableComponent,
    FormFieldDirective,
    ValidationDirective,
    FormEventDirective,
    AccessibilityHeaderComponent,
    TranslatePipe,
    TruncatePipe,
    FontSizeDirective,
    TimezonePipe,
    RemoveWhiteSpace,
    AmountPipe
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true
    },
    {
      provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true
    }
  ],
  exports: [
    HeaderComponent,
    // DataTableComponent,
    FormFieldDirective,
    ValidationDirective,
    FormEventDirective,
    TranslatePipe,
    TruncatePipe,
    FontSizeDirective,
    TimezonePipe,
    RemoveWhiteSpace,
    AmountPipe
  ]
})
export class CoreModule { }
