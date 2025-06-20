import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreModule } from '../core-module/core.module';

import { SharedModuleModule } from '../shared-module/shared-module.module';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home/home.component';
import { NgxImageCompressService } from 'ngx-image-compress';
import { WelcomeGuideComponent } from './welcome-guide/welcome-guide.component';
/**
 * Author: Shailesh R
 * Desc: Home module
 */
@NgModule({
  declarations: [HomeComponent, WelcomeGuideComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModuleModule,
    CoreModule
  ],
  providers: [NgxImageCompressService]
})
export class HomeModule { }
