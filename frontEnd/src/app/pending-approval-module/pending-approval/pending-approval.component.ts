import { AfterViewInit, Component } from '@angular/core';
import { AppService } from '../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../core-module/config/url';
declare var feather: any;
declare var $: any;
/**
 * Author: Padma Priya CK.
 * Module : pending approval
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.scss']
})
export class PendingApprovalComponent implements AfterViewInit {
  /**
   * 
   * @param appService : httppost calll
   */
  constructor(private appService: AppService, private router: Router) {
    this.appService.httpPost('CommonSetting', { 'tab': 'pendingApprovals' }, 'getTopTabStructure').subscribe((data: any) => {
      this.topNavData = data.content[0];
    })
   }
  /**
   * Desc breadcrumb
   */
  // public breadcrumb: any = [];
  /**
   * histort flag
   */
  public historyFlag: boolean = false;
  /**
   * historyInput
   */
  public historyInput: any = [];
  /**
   * Filter Details json
   */
  public filterDetails: Array<any> = [];
  /**
   * Expens report Top nav data
   */
  public topNavData: Array<any> = [];

  /**
   * ngonInit
   */
  ngOnInit() {
    //Common filter Service call
    this.appService.httpPost('getJson', 'pendingApprovalListFilter', '').subscribe((data: any) => {
      this.filterDetails = data.content;
    });
  }
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
        this.historyInput = data.content;
        this.historyFlag = true;
      });
  }
  /**
   * showHistory 
   */
  public historyClose(val: boolean): void {
    this.historyFlag = val;
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
  /**
   * showFilter for mobile view
   */
  public showFilter(): void {
    $('.cls-filter-container').addClass('cls-filter-close');
  }
  /**
   * Usr based List data request to select category 
   */
  public getRequestData(status: boolean) {
    this.appService.httpPost('CommonSetting', { 'tab': 'pendingApprovals', 'userBased': status }, 'getTopTabStructure').subscribe((data: any) => {
      this.topNavData = data.content[0];
    })
  }
  // public UpdateListCount(data:object){
  //   console.log(data,data['data'],data['userStatus'],"approval component");
  //   // if(data['data']['status'] == 'success'){
  //     // this.appService.httpPost('CommonSetting', { 'tab': 'pendingApprovals', 'userBased': status }, 'getTopTabStructure').subscribe((data: any) => {
  //     //   this.topNavData = data.content[0];
  //     // })
  //     console.log(true);
  //     this.getRequestData(data['userStatus']);
  //   // }
  // }
}
