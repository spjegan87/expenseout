import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category/category.component';
import { CoreModule } from 'src/app/core-module/core.module';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    CoreModule
  ],
  exports:[
    CategoryComponent
  ]
})
export class CategoryModule { }
