import { AfterViewInit, Component, OnInit } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../../core-module/config/url';
declare var feather: any;
declare var $: any;
declare function showLoader(): any;
/*
*  TS Component Name---------- Advance request
*  Author --------------- Padma Priya CK
*  Powered by ---------------------Infiniti software solutions
*/
@Component({
  selector: 'app-advance-request-index',
  templateUrl: './advance-request-index.component.html',
  styleUrls: ['./advance-request-index.component.scss']
})
export class AdvanceRequestIndexComponent implements OnInit, AfterViewInit {
 public topNavData: Array<any> = [];
  /**
   * 
   * @param appService : httppost calll
   */
  constructor(private appService: AppService, private router: Router) { 
    this.appService.httpPost('commonSetting', { 'tab': 'advanceReport' }, 'getTopTabStructure').subscribe((data: any) => {
      console.log(data)
      this.topNavData = data.content[0];
    })
  }
  /**
   * histort flag
   */
  public historyFlag: boolean = false;
  /**
   * historyInput
   */
  public historyInput: any = [];
  public filterDetails: Array<any> = [];
  public listData: any = {};
  /**
  * Desc : ngOnInit
  */
  public ngOnInit(): void {
    // showLoader();

    //Common filter Service call
    this.appService.httpPost('getJson', 'advanceReportFilter', '').subscribe((data: any) => {
      this.filterDetails = data.content;
    });
    //Top navbar structure
    // this.appService.httpPost('commonSetting', { 'tab': 'advanceReport' }, 'getTopTabStructure').subscribe((data: any) => {
    //   console.log(data)
    //   this.topNavData = data.content[0];
    // })
  }
  /**
   * after view oninit
   */
  public ngAfterViewInit(): void {
    feather.replace();
  }
  /**
   * open history modal
   */
  public history(val: any): void {
    let formData = val;
    this.appService
      .httpPost('reportHistory', formData, 'fetchReportHistory', 'false')
      .subscribe((data) => {
        this.historyInput = {
          data: data.content,
          type: 'advance'
        };
        this.historyFlag = true;
        console.log(this.historyInput);
      });
  }
  /**
   * showHistory 
   */
  public historyClose(val: boolean): void {
    this.historyFlag = val;
  }
  /**
   * showFilter for mobile view
   */
  public showFilter(): void {
    $('.cls-filter-container').addClass('cls-filter-close');
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
  // /**
  //  * Get advance form success status & Top navbar count update
  //  */
  // public listCountUpdate(_data:object = {}) {
  //   this.tabStatus = true;
  //   (this.tabStatus) ? this.getTopNavData() : undefined;  
  // }
}
