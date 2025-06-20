import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasterdataRoutingModule } from './masterdata-routing.module';
import { MasterindexComponent } from './components/masterindex/masterindex.component';
import { SharedModuleModule} from './../shared-module/shared-module.module';
import { CoreModule } from '../core-module/core.module';
// import { AddnewComponent } from './components/addnew/addnew.component';
import { SideTabModule } from '../common-components/side-tab/side-tab.module';
import { CommonListModule } from '../common-list/common-list.module';

@NgModule({
  declarations: [MasterindexComponent ],
  // AddnewComponent
  imports: [
    CommonModule,
    MasterdataRoutingModule,
    SharedModuleModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    SideTabModule,
    CommonListModule
  ]
})
export class MasterdataModule { }



// <div class="tab-content">
// <ng-container *ngFor="let val of tabData; let i = index">
//     <div id="{{ val.id }}" class="container tab-pane {{ val.class }}">
//         <div class="cls-family">
//             <span class="cls-inner-title">{{ val.name | translate }} {{ "Details" | translate }}</span
//       >
//       <span class="cls-uploadtxt" (click)="bulkUpload(val.id)">
//         <em data-feather="upload-cloud"> </em
//         >{{ "Upload CSV" | translate }}
//       </span>
//             <span class="cls-list float-right">
//         <em class="icon-11-plus mr-1"></em>
//         <a
//           href="javascript:;"
//           title="{{ 'Click To' | translate }} {{ 'Add' | translate }} {{
//             val.name | translate
//           }} {{ 'Details' | translate }}"
//           class="mr-3 cls-a-hover"
//           (click)="
//             addNew(val.newcreate, val.id, val.actionName, val.name, i)
//           "
//           >{{ "Add" | translate }} {{ val.name | translate }}
//           {{ "Details" | translate }}
//         </a>
//       </span>
//             <!-- mobile add button starts-->
//             <span class="cls-mbl-add d-none" (click)="
//           addNew(val.newcreate, val.id, val.actionName, val.name, i)
//         "><em class="icon-32-reject"></em
//       ></span>
//             <!-- mobile add button end -->

//             <!-- <div class="cls-table"> -->
//             <!-- <ng-container *ngIf="tabData[i]['dataVal']?.data?.length >= 1">
//         <select
//           class="p-2 pull-right cls-select cls-custom-input mr-3"
//           *ngIf="tabData[i]['dataVal']?.headers?.length >= 1"
//           id="sortBy{{ i }}"
//           (change)="sorting(i)"
//         >
//           <option>Sort By</option>
//           <ng-container
//             *ngFor="
//               let tabheader of tabData[i]['dataVal'].headers;
//               let headerIndex = index;
//               let last = last
//             "
//           >
//             <option value="{{ tabheader }}" *ngIf="last !== true">
//               {{ tabheader }}
//             </option>
//           </ng-container>
//         </select>
//       </ng-container> -->
//             <table class="table table-lg table-hover w-100 no-footer dataTable" id="manageDesignationList" role="grid" aria-describedby="manageDesignationList_info" style="">
//                 <thead class="cls-list-inner-heading">
//                     <tr role="row">
//                         <th class="border-0 ng-star-inserted sorting_disabled" style="width: 333.391px;" rowspan="1" colspan="1"> Code </th>
//                         <th class="border-0 ng-star-inserted sorting_disabled" style="width: 295.172px;" rowspan="1" colspan="1"> Name </th>
//                         <th class="border-0 ng-star-inserted sorting_disabled" style="width: 121.109px;" rowspan="1" colspan="1"> Created By </th>
//                         <th class="border-0 ng-star-inserted sorting_disabled" style="width: 141.562px;" rowspan="1" colspan="1"> Created Date </th>
//                         <th class="border-0 ng-star-inserted sorting_disabled" style="width: 39.6875px;" rowspan="1" colspan="1"> Status </th>
//                         <th class="border-0 ng-star-inserted sorting_disabled" style="width: 40.3438px;" rowspan="1" colspan="1"> Action </th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted odd" style="" role="row">
//                         <td class="ng-star-inserted"> TESTDESIGNING </td>
//                         <td class="ng-star-inserted"> testdesigning </td>
//                         <td class="ng-star-inserted"> MRF Admin </td>
//                         <td class="ng-star-inserted"> 14-Jul-2021 | 11:15 AM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted even" style="" role="row">
//                         <td class="ng-star-inserted"> DESIGNIN </td>
//                         <td class="ng-star-inserted"> designin </td>
//                         <td class="ng-star-inserted"> MRF Admin </td>
//                         <td class="ng-star-inserted"> 08-Jul-2021 | 09:48 AM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted odd" style="" role="row">
//                         <td class="ng-star-inserted"> SATHEESHSIVAMP </td>
//                         <td class="ng-star-inserted"> Satheeshsivam p </td>
//                         <td class="ng-star-inserted"> Soni Ignatius </td>
//                         <td class="ng-star-inserted"> 23-Jun-2021 | 06:15 AM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted even" style="" role="row">
//                         <td class="ng-star-inserted"> SALES </td>
//                         <td class="ng-star-inserted"> Sales </td>
//                         <td class="ng-star-inserted"> Admin Centrotherm </td>
//                         <td class="ng-star-inserted"> 18-May-2021 | 11:41 PM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted odd" style="" role="row">
//                         <td class="ng-star-inserted"> TESTT0023 </td>
//                         <td class="ng-star-inserted"> testt0023 </td>
//                         <td class="ng-star-inserted"> Soni Ignatius </td>
//                         <td class="ng-star-inserted"> 29-Apr-2021 | 07:02 PM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted even" style="" role="row">
//                         <td class="ng-star-inserted"> SUPERVISOR-INTERNALAUDIT </td>
//                         <td class="ng-star-inserted"> Supervisor - Internal Audit </td>
//                         <td class="ng-star-inserted"> Soni Ignatius </td>
//                         <td class="ng-star-inserted"> 25-Mar-2021 | 03:45 PM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" class="ng-star-inserted"><em  class="cls-switch-circle cls-round"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted odd" style="" role="row">
//                         <td class="ng-star-inserted"> SATHEESH3344 </td>
//                         <td class="ng-star-inserted"> satheesh3344 </td>
//                         <td class="ng-star-inserted"> Soni Ignatius </td>
//                         <td class="ng-star-inserted"> 25-Mar-2021 | 02:37 PM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted even" style="" role="row">
//                         <td class="ng-star-inserted"> TESTVALUE </td>
//                         <td class="ng-star-inserted"> Testvalue </td>
//                         <td class="ng-star-inserted"> Soni Ignatius </td>
//                         <td class="ng-star-inserted"> 17-Mar-2021 | 02:43 PM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted odd" style="" role="row">
//                         <td class="ng-star-inserted"> TEST </td>
//                         <td class="ng-star-inserted"> Test </td>
//                         <td class="ng-star-inserted"> MRF Admin </td>
//                         <td class="ng-star-inserted"> 17-Mar-2021 | 02:37 PM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                     <tr class="cls-list-inner-data cls-rowshow row0 ng-star-inserted even" style="" role="row">
//                         <td class="ng-star-inserted"> NEW001 </td>
//                         <td class="ng-star-inserted"> new001 </td>
//                         <td class="ng-star-inserted"> Soni Ignatius </td>
//                         <td class="ng-star-inserted"> 17-Mar-2021 | 11:58 AM </td>
//                         <td class="ng-star-inserted">
//                             <div class="cls-status ng-star-inserted"><label class="cls-switches"><input  type="checkbox" name="showpolicy" checked="" class="ng-star-inserted"><em  class="cls-switch-circle cls-round fn-switch-active"></em></label></div>
//                         </td>
//                         <td class="ng-star-inserted"><span class="d-inline-block ng-star-inserted"><a  href="javascript:;" data-toggle="tooltip" class="cls-hover-tooltip mr-2 text-secondary"><em  class="cls-list-icon pencil ti-pencil"></em><span  class="cls-tool">Click To Edit</span></a>
//                             </span>
//                         </td>
//                     </tr>
//                 </tbody>
//             </table>
//             <!-- </div> -->
//         </div>
//     </div>
// </ng-container>
// <app-bulk-upload *ngIf="uploadFlag" (uploadFlag)="closeUpload($event)" [upload]="upload"></app-bulk-upload>
// </div>