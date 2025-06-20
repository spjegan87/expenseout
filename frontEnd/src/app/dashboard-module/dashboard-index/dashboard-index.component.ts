import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { urlConfig } from '../../core-module/config/url';
import { AppService } from '../../core-module/services/app.service';
import { DatePipe } from '@angular/common';
import { config } from '../../core-module/config/app';

/**
 * Author: Padma Priya CK,Naveen
 * Module : dashboard index
 * Powered by : Infiniti software solutions
 * Created Date: 25-July-2020
 */
@Component({
  selector: 'app-dashboard-index',
  templateUrl: './dashboard-index.component.html',
  styleUrls: ['./dashboard-index.component.scss']
})
export class DashboardIndexComponent implements OnInit, AfterViewInit {
  /**
   * Desc breadcrumb
   */
  // public breadcrumb: any = [];
  /**
   * dashboard data
   */
  public dashboardData: any;
  /**
   * user tab flag
   */
  public userTabFlag: boolean = true;
  /**
   * filter data
   */
  public filterData: any = {};
  /**
   * Send module name to common filter
   */
  public module: string = "";
  /**
   * Send Apprver module name common filter
   */
  public approverModule: string = "dashBoard";
  /**
  * user type
  */
  public userType: string;
  // User type of Corporate Admin
  public corporateType = config.ADMIN_TYPE;

  public filterDetails: Array<any> = [];

  constructor(private appService: AppService, private router: Router, public datepipe: DatePipe, private cd: ChangeDetectorRef) {

  }
  /**
   * Ngoninit
   */
  public ngOnInit(): void {
    let date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth();
    let firstDay = this.datepipe.transform(new Date(y, m, 1), 'yyyy-MM-dd');
    let lastDay = this.datepipe.transform(new Date(y, m + 1, 0), 'yyyy-MM-dd');
    this.filterData = {
      "dateInterval": {
        "from": firstDay,
        "to": lastDay
      }
    }
    this.chooseTab(config.USER_TYPE === 'Corporate Admin' ? (config.ADMIN_TYPE == 'admin' ? config.USER_TYPE : 'User') : config.USER_TYPE);
    //Common filter Service call
    this.appService.httpPost('getJson', 'dashboardFilter', '').subscribe((data: any) => {
      this.filterDetails = data.content;
    });
    this.module = (config.USER_TYPE == 'Corporate Admin') ? "adminDashboard" : this.approverModule;
    // console.log(this.module,config.USER_TYPE)
  }
  ngAfterViewInit() {
    this.module = (config.USER_TYPE == 'Corporate Admin') ? "adminDashboard" : this.approverModule;
    this.cd.detectChanges();
  }
  /**
   * Desc : Get Module name
   * @param name 
   */
  public getModule(name: string) {
    this.module = name;
  }
  /**
   * create report
   */
  public getreportCreate(action: string): void {
    let reportURL = (action === 'report') ? urlConfig.ROUTES.createExpense : urlConfig.ROUTES.expenseVault;
    if (reportURL == urlConfig.ROUTES.createExpense) {
      this.appService.httpPost('expenseActions', { "userId": config.USER_ID }, 'reportNameGenerator').subscribe((data: any) => {
        this.router.navigate([`./${urlConfig.ROUTES.home}/${reportURL}`], { state: { fetchData: data.content.result } });
      })
    }
    else {
      this.router.navigate([`./${urlConfig.ROUTES.home}/${reportURL}`]);

    }
  }
  /**
   * filterChoosed
   */
  public filterChoosed(val: any): void {
    this.filterData = val;
    this.chooseTab(config.USER_TYPE === 'Corporate Admin' ? (config.ADMIN_TYPE == 'admin' ? config.USER_TYPE : (this.userType != 'User' ? this.userType : 'User')) : this.userType);
  }
  /**
   * service
   */
  public async userTabservice(tabVal: any) {
    let respose = await this.appService.httpPost(this.approverModule, { "type": tabVal, "filters": this.filterData }, 'dashBoardFinalResponse', 'false').toPromise();
    this.dashboardData = respose.content;
  }
  /**
   * get tab action and service hit
   */
  public getTabValue(data: any) {
    this.userType = data.userType;
    this.userTabservice(data.val);
  }

  public chooseTab(userType: string) {
    this.userType = userType;
    switch (userType) {
      case 'User':
        this.userTabservice('tab1');
        break;
      case 'Approver':
        this.userTabservice('tab2');
        break;
      case 'Finance':
        this.userTabservice('tab3');
        break;
      default:
        this.userTabFlag = true;
        setTimeout(() => {
          this.userTabFlag = false;
        }, 100);
        break;
    }
  }
  public ngDoCheck() {
    if (config.USER_TYPE == 'Corporate Admin' && this.corporateType != config.ADMIN_TYPE) {
      this.corporateType = config.ADMIN_TYPE;
      if (config.ADMIN_TYPE == 'admin') {
        setTimeout(() => {
          this.userTabFlag = false;
        }, 100);;
      } else if (config.ADMIN_TYPE == 'user') {
        this.chooseTab('User');
        setTimeout(() => {
          this.userTabFlag = true;
        }, 1000);
      }
    }
  }
}
