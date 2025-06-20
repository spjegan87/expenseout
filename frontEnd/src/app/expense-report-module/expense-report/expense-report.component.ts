import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core-module/services/app.service';
import { urlConfig } from '../../core-module/config/url';
import { config } from '../../core-module/config/app';
declare var feather: any;
declare var $: any;
/**
 * Author: Padma Priya CK.
 * Module : report list
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-expense-report',
  templateUrl: './expense-report.component.html',
  styleUrls: ['./expense-report.component.scss']
})
export class ExpenseReportComponent implements OnInit, AfterViewInit {

  constructor(private router: Router, private appService: AppService) { 
    this.appService.httpPost('CommonSetting',{'tab':'expenseReport'},'getTopTabStructure').subscribe((data:any)=>{
      this.topNavData = data.content[0];
      console.log(this.topNavData);
    });
  }
  /**
   * Desc breadcrumb
   */
  // public breadcrumb: any = [];
  /**
   * Filter
   */
  public reportId: string = '';
  /**
   * Filter Details json
   */
   public filterDetails:Array<any> =[];
   /**
    * Expense report Top nav data
    */
   public topNavData : Array<any> =[];
  /**
   * ngoninit
   */
  public ngOnInit(): void {
    if (history.state.reportid) {
      this.reportId = history.state.reportid;
    }
    // setTimeout(() => {
    // feather.replace();
    // },300);
    this.appService.httpPost('getJson','reportExpenseFilter','').subscribe((data:any)=>{
      this.filterDetails = data.content;
    });
    // this.listModule = {
    //   "module":"reportExpense",
    //   "action":"reportTabs"
    // }
  }
  public ngAfterViewInit(): void {
    feather.replace();
  }
  /**
   * create report
   */
  public createReport(): void {
    this.appService.httpPost('expenseActions', { "userId": config.USER_ID }, 'reportNameGenerator').subscribe((data: any) => {
      // console.log(data, "chenck")
      this.router.navigate([
        './' +
        urlConfig.ROUTES.home +
        '/' +
        urlConfig.ROUTES.createExpense
      ], { state: { fetchData: data.content.result } });
    })
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
   * open vault
   */
  public openVault(): void {
    this.router.navigate([
      './' +
      urlConfig.ROUTES.home +
      '/' +
      urlConfig.ROUTES.expenseVault
    ]);
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
