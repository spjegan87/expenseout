import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { config } from '../../core-module/config/app';
import { AppService } from '../../core-module/services/app.service';
import { urlConfig } from '../../core-module/config/url';
import { Router } from '@angular/router';
declare var $: any;
/**
 * Author: Padma Priya CK,Naveen
 * Module : dashboard
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  /**
   * tab active
   */
  public activeTab: number;
  /**
   * tab hide show flag
   */
  public tabFlag: any;
  /**
   * tab name variable
   */
  public subTabFlag: any;
  /**
   * output data
   */
  @Output() public reportCreate: EventEmitter<any> = new EventEmitter();
  @Output() public TabValue: EventEmitter<any> = new EventEmitter();
  /**
   * input for dashboard
   */
  @Input() public dashboardData: any;
  /**
   * user chart variable
   */
  public userChartData: any;
  /**
   * chart loader
   */
  public chartLoader: boolean = true;
  /**
   * filterData
   */
  @Input() public filterData: any;

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit() {
    this.tabFlag = config.USER_TYPE;
    this.subTabFlag = this.tabFlag == 'Corporate Admin' ? config.ADMIN_TYPE =='admin' ? this.tabFlag : 'User' :this.tabFlag ;
    // this.activatedRoute.params.subscribe(data => {
    //   if(typeof data.id != 'undefined') {
    //     sessionStorage.setItem('app', data.id);
    //     document.cookie = "app = ",data.id,';path=/';
    //     return true;
    //   }
    // });
    this.ngOnChanges();


    // sessionStorage.setItem('app',id);
  }
  public ngOnChanges(): void {
    if (this.dashboardData && this.dashboardData.message !== 'Data not found') {
      this.dashboardData.map((val: any, index: number) => {
        if (this.subTabFlag == val.heading) {
          this.userChartService(val.id);
          this.activeTab = index;
        }
      })
    }
  }
  /**
   * redirectRoute
   */
  public redirectRoute(routeVal: string, tabIndex: number): void {
    if (routeVal) {
      this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + routeVal],
        {
          state: {
            tabName: tabIndex
          }
        });
    }
  }
  /**
   * toggle tab
   */
  public toggletab(val: string, name: string): void {
    this.TabValue.emit({ val: val, userType: name });
    this.userChartService(val);
    this.subTabFlag = name;
  }
  /**
   * create report
   */
  public createReport(val: string) {
    this.reportCreate.emit(val);
  }
  /**
 * user dashboard chart service
 */
  public userChartService(tabVal: any) {
    this.appService.httpPost('pieChartDetails', { "type": tabVal, "filters": this.filterData }, 'allUserPieChart','false').subscribe((data) => {
      this.userChartData = data.content;
      if (this.userChartData['series'].length >= 1) {
        this.userChartData['tooltip']['y']['formatter'] = eval(
          this.userChartData['tooltip']['y']['formatter']
        );
        this.userChartData['plotOptions']['pie']['donut']['labels']['total']['formatter'] = eval(
          this.userChartData['plotOptions']['pie']['donut']['labels']['total']['formatter']
        );
      }
      this.chartLoader = false;
    });
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
    // $('.cls-bottom-container').removeClass('d-block');
    // },200);
    $('.cls-mbl-tool-filter').removeClass('circle1');
    $('.cls-tool-create').removeClass('circle2');
    $('.cls-bottom-container').removeClass('d-block');
  }
}
