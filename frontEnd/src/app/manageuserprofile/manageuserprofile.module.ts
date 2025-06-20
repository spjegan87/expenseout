import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModuleModule} from '../shared-module/shared-module.module';
import { CoreModule } from '../core-module/core.module';
import { ManageuserprofileRoutingModule } from './manageuserprofile-routing.module';
import { ManageuserindexComponent } from './components/manageuserindex/manageuserindex.component';
import { ProfilefilterComponent } from './components/profilefilter/profilefilter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CommonFilterModule } from '../common-components/common-filter/common-filter.module';
import { DataTableModule } from '../data-table/data-table.module';
import { CommonListModule } from '../common-list/common-list.module';
@NgModule({
  declarations: [ManageuserindexComponent, ProfilefilterComponent],
  providers :[DatePipe],
  imports: [
    CommonModule,
    ManageuserprofileRoutingModule,
    SharedModuleModule,
    CoreModule,
    ReactiveFormsModule,
    CommonFilterModule,
    SharedModuleModule,
    CommonListModule,
    DataTableModule

  ]
})
export class ManageuserprofileModule { }


