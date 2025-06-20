import { Component, OnInit } from '@angular/core';
import { urlConfig } from '../../../core-module/config/url';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core-module/services/app.service';
import { config } from 'src/app/core-module/config/app';
declare var $: any;
/**
 * Author: Padma Priya CK.
 * Module : user management
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-manageuserindex',
  templateUrl: './manageuserindex.component.html',
  styleUrls: ['./manageuserindex.component.scss']
})
export class ManageuserindexComponent implements OnInit {

  /**
   * Filter
   */
  public filterData: object = {};
  /**
   * uploadDetails
   */
  public uploadDetails: object = {};
  /**
   * upload profile
   */
  // public upload : boolean = false;
  /**
   * Filter Json
   */
  public filterDetails: Array<any> = [];
  /**
   * Module name
   */
  public module: object = {};
  /**
   * ListData
   */
  public listData: any = {};
  /**
   * Send Module name to common filter
   */
  public moduleName: string = "";
  /**
   * List module & action send to list index component for pagination
   */
  public listModule: object = {};
  /**
   * List data loader boolean  
   */
  public loader: boolean = false;

  constructor(private router: Router, private appService: AppService) { }
  public ngOnInit(): void {
    this.uploadDetails = {
      'uploadFlag': true,
      'actionName': 'uploadReadFile',
      'moduleName': 'bulkUserUpload',
      'csrf': true,
      'download': {
        'action': 'downloadCsvSampleFile',
        'module': 'bulkUserUpload'
      }
    }
    //Form
    this.appService.httpPost('userSettings', '', 'formDynamicFilterData').subscribe((data: any) => {
      this.filterDetails = data.content;  //Filter Data
      this.module = (this.filterDetails.length > 0) ? this.filterDetails.filter(data => data.format == 'action')[0] : undefined;
      this.filterDetails = this.filterDetails.filter(data => data.format != 'action');
      this.moduleName = (this.module != undefined) ? this.module['module_name'] : "";
      console.log(this.module,this.filterDetails,this.moduleName,"mod");
    });

    //List data module & action send to list index
    this.listModule = {
      "moduleName": "userSettings",
      "actionName": "formList"
    }
    this.loader = true;
    this.appService.httpPost(this.listModule['moduleName'], '', this.listModule['actionName']).subscribe((data: any) => {
      this.loader = false;
      this.listData = data.content;
    });
  }
  /**
   * actions
   */
  // public actions(name: string): void {
  //   // this.upload= !this.upload;
  // }
  /**
   * redirect
   */
  public redirect(name: string): void {
    //Redirect Master data module
    if (name === 'masterdata') {
      this.router.navigate([
        './' +
        urlConfig.ROUTES.home +
        '/' +
        urlConfig.ROUTES.masterData
      ])
    }
    //Download Xls file
    else if (name == 'download') {
      this.appService.httpPost('exportUserData', { 'corporateId': config.CORPORATE_ID, 'corporateName': config.CORPORATE_NAME }, 'generateExportValues').subscribe((data: any) => {
        // console.log(data);
        // let url = data.content.url;
        window.location.replace(data.content.url);
      })
    }
    //Redirect Create profile 
    else {
      this.router.navigate([
        './' +
        urlConfig.ROUTES.home +
        '/' +
        urlConfig.ROUTES.myProfile
      ],
        {
          state: {
            type: "new"
          }
        })
    }
  }
  /**
   * filterChoosed
   */
  public filterChoosed(val: any): void {
    console.log(val,this.module);
    this.filterData = val;
    this.appService.httpPost(this.module['module_name'], { 'filters': val }, this.module['action_name']).subscribe((data: any) => {
      console.log(data, "filter");
      this.listData = data.content;
    });
  }
  /**
   * mobile view to redirect home page
   */
  public redirectHome() {
    this.router.navigate([
      './' +
      urlConfig.ROUTES.home +
      '/' +
      urlConfig.ROUTES.dashboard
    ]);
  }
  /**
    * triggerAction
    */
  public triggerAction(name: string): void {
    this.appService.triggerAction(name);
  }
}
