import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommonListRoutingModule } from './common-list-routing.module';
import { PaginationComponent } from './pagination/pagination.component'
import { ItemsPerPageComponent } from './items-per-page/items-per-page.component';
import { ListIndexComponent } from './list-index/list-index.component';
import { CategoryModule } from '../common-components/category/category.module';
import { SharedModuleModule } from '../shared-module/shared-module.module';
import { ListComponent } from './list/list.component';
import { CoreModule } from '../core-module/core.module';
import { SearchComponent } from './search/search.component';
import { SortComponent } from './sort/sort.component';
import { ReactiveFormsModule } from '@angular/forms';
import { JumpPageComponent } from './jump-page/jump-page.component';

@NgModule({
  declarations: [PaginationComponent,ItemsPerPageComponent, ListIndexComponent, ListComponent, SearchComponent, SortComponent, JumpPageComponent],
  
  imports: [
    CommonModule,
    CommonListRoutingModule,
    CategoryModule,
    SharedModuleModule,
    CoreModule,
    ReactiveFormsModule
  ],
  exports:[
    ListIndexComponent
  ]
})
export class CommonListModule { }
