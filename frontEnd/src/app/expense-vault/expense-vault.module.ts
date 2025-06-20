import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ExpenseVaultRoutingModule } from './expense-vault-routing.module';
import { GalleryComponent } from './gallery/gallery.component';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ExpenseFormComponent } from './expense-form/expense-form.component';
import { CreateExpenseReportModule } from '../create-expense-report/create-expense-report.module';
import { CoreModule } from '../core-module/core.module';
import { NgxImageCompressService } from 'ngx-image-compress';
@NgModule({
  declarations: [GalleryComponent, ExpenseFormComponent],
  imports: [
    CommonModule,
    ExpenseVaultRoutingModule,
    SharedModuleModule,
    CreateExpenseReportModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [NgxImageCompressService]
})
export class ExpenseVaultModule { }
