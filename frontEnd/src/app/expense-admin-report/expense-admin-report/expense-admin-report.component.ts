import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { urlConfig } from '../../core-module/config/url';
import { AppService } from '../../core-module/services/app.service';
declare var feather: any;
declare var $: any;

@Component({
  selector: 'app-expense-admin-report',
  templateUrl: './expense-admin-report.component.html',
  styleUrls: ['./expense-admin-report.component.scss']
})
export class ExpenseAdminReportComponent implements OnInit, AfterViewInit {
  public type: boolean = false;

  constructor(private router: Router, public appService: AppService) { 
    this.topNavLoader = true;
    this.appService.httpPost('CommonSetting', { 'tab': 'adminReportExpense' }, 'getTopTabStructure').subscribe((data: any) => {
      this.topNavLoader = false;
      this.topNavData = data.content[0];
      console.log(this.topNavData);
      
    })
  }

  public reportId: string = '';
  /**
  * Filter Details json
  */
  public filterDetails: Array<any> = [];
  /**
 * Expense Admin report Top nav data
 */
  public topNavData: Array<any> = [];
  /**
   * Top navbar loader boolean variable
   */
  public topNavLoader: boolean = false;
  /**
   * ngoninit
   */
  public ngOnInit(): void {
    if (history.state.reportid) {
      this.reportId = history.state.reportid;
    }
    this.appService.httpPost('adminReportExpense', {}, 'dynamicFilterData', 'false').subscribe((data: any) => {
      this.filterDetails = data.content;
    });
  }
  public ngAfterViewInit(): void {
    feather.replace();
  }
  /**
   * showFilter for mobile view
   */
  public showFilter(): void {
    $('.cls-filter-container').addClass('cls-filter-close');
    $('.cls-bottom-container').removeClass('d-block');
  }
  /**
   * showFilter for mobile view
   */
  public openMobileTool() {
    $('.cls-bottom-container').addClass('d-block');
    $('.cls-bottom-container').removeClass('close-mobile');
    // setTimeout(()=>{
    $('.cls-mbl-tool-filter').addClass('circle1');
    $('.cls-tool-create').addClass('circle2');
    // },200);
  }
  /**
   * close mobile bottom button
   */
  public closeMobile() {
    // setTimeout(()=>{
    // },200);
    $('.cls-mbl-tool-filter').removeClass('circle1');
    $('.cls-tool-create').removeClass('circle2');
    $('.cls-bottom-container').removeClass('d-block');
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
   * Usr based List data request to select category 
   */
  public getRequestData(status: boolean) {
    this.appService.httpPost('CommonSetting', { 'tab': 'adminReportExpense', 'userBased': status }, 'getTopTabStructure').subscribe((data: any) => {
      this.topNavData = data.content[0];
    });
  }
  // public userBasedCount(type: boolean) {
  //   console.log(type, '1');
  //   this.type = type;
  //   this.getTopNavData();
  // }
}
