import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { urlConfig } from '../../../core-module/config/url';
import { Router } from '@angular/router';
import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
// import { environment } from "../../../../environments/environment";
import { SideTabComponent } from 'src/app/common-components/side-tab/side-tab/side-tab.component';
import { CommonService } from '../../../core-module/services/common.service';
declare var $: any;
declare var feather: any;
@Component({
  selector: 'app-profileindex',
  templateUrl: './profileindex.component.html',
  styleUrls: ['./profileindex.component.scss']
})
export class ProfileindexComponent implements OnInit, AfterViewInit {
  /**
   * Desc breadcrumb
   */
  public breadcrumb: any = [];
  /**
   * setprofile flag
   */
  public setProfile: boolean = false;
  /**
   * Desc: type 
   */
  public type: string = 'new';
  /**
   * desc: emp details
   */
  public empDetails: any = {};
  /**
   * Desc: dropdownvalue
   */
  public dropdownArray: any = [];
  /**
   * form data employee detail
   */
  public empDetailsResponse: any = {};
  /**
   * expense approval value
   */
  public expenseApprovalDetails: any = {};
  /**
   * advance approval value
   */
  public advanceApprovalDetails: any = {};
  /**
   * finance approval value
   */
  public financeApprovalDetails: any = {};
  /**
   * Desc : loader
   */
  public loader: boolean = true
  /**
 * Desc:Store Side Tab Data Json 
 */
  public tabData: Array<any> = [];
  /**
   * Desc:Store Dynamic Form json data
   */
  public formData: any = {};
  /**
   * Click next button tab active
   */
  public tabValue: number = 0;
  /** 
   * Get dynamic form module name
   */
  public moduleName: string = "";
  public clickedIndex: number = 0;
  @ViewChild(SideTabComponent) public getTabData: any;
  /**
   * 
   * @param appService : httppost calll
   * @param router : navigation
   */
  constructor(private appService: AppService, private router: Router,private commonService :CommonService) { }
  public ngAfterViewInit(): void {
    feather.replace();
  }
  /**
   * ngOnInit
   */
  public async ngOnInit() {
    // showLoader();
    if (history.state.type) {
      this.type = history.state.type;
      // console.log(this.type, "type")
      localStorage.setItem('userDetails', JSON.stringify(history.state));
    }
    let request = (this.type == 'myprofile') ? 'userEditSetting' : 'userSetting';
    this.appService.httpPost('CommonSetting', { tab: request }, 'getsideTabStructure').subscribe((data: any) => {
      // console.log(data);
      this.tabData = data.content[0];
    })
  
    let action = (this.type == 'myprofile') ? "userView" : "adminView";
    let data = await this.appService.httpPost('userSettings', { corporateId: config.CORPORATE_ID, view: action }, 'getUserCreationForm').toPromise();
    this.formData = data.content;

    // this.formData.data.map((data: any) => {
    //   data.action.map((element: any) => {
    //     this.moduleName = (element['module_name'] && element['module_name'] != undefined) ? element['module_name'] : undefined;
    //   });
    // });
    let profileDetail: any = JSON.parse(localStorage.getItem('userDetails'));
    this.type = profileDetail['type'];
    this.appService.httpPost('userSettings', {}, 'getDropDownList', 'false').subscribe((data) => {
      this.dropdownArray = data.content;
      if (this.type === 'myprofile' || this.type === 'edituserprofile') {
        this.appService.httpPost('userSettings', { 'userId': profileDetail['userId'] }, 'editUserDetails', 'false').subscribe((data) => {
          // console.log(data);
          this.empDetailsResponse = data.content;
          this.loader = false;
        });
      } else {
        this.loader = false;
      }
    });
    if (this.type === 'new') {
      this.breadcrumb = [
        {
          name: 'Manage Profile',
          home: urlConfig.ROUTES.home,
          routerLink: urlConfig.ROUTES.manageprofile,
          active: 'N'
        },
        {
          name: 'Create Profile',
          routerLink: '',
          active: 'Y'
        }
      ];
    }
    else if (this.type === 'edituserprofile') {
      this.breadcrumb = [
        {
          name: 'Manage Profile',
          home: urlConfig.ROUTES.home,
          routerLink: urlConfig.ROUTES.manageprofile,
          active: 'N'
        },
        {
          name: 'Edit Profile',
          routerLink: '',
          active: 'Y'
        }
      ];
    }
    // setTimeout(() => {
    //   feather.replace();
    // },300);

  }
  /**
   * open set profile component
   */
  public openProfile() {
    this.setProfile = true;
  }
  /**
   * close profile
   */
  public closeProfile(data: any) {
    this.setProfile = data;
  }
  /**
   * approverDetails
   */
  // public approverDetails(data: any): void {
  //   let expenseApprover: any = [];
  //   let advanceApprover: any = [];
  //   let financeApprover: any = [];
  //   if (Object.keys(data).some(function (k) {
  //     //console.log(dataval,k)
  //     if (~k.indexOf('approver') === -1) {
  //       if (data[k] !== '') {
  //         expenseApprover.push(data[k]);
  //       }
  //     }
  //     if (~k.indexOf('advance') === -1) {
  //       // console.log(data[k]);
  //       // this.empDetails.data
  //       if (data[k] !== '') {
  //         advanceApprover.push(data[k]);
  //       }
  //     }
  //     if (~k.indexOf('finance') === -1) {
  //       if (data[k] !== '') {
  //         financeApprover.push(data[k]);
  //       }
  //     }
  //   })) { }
  //   this.empDetails['expenseApprover'] = expenseApprover;
  //   this.empDetails['advanceApprover'] = advanceApprover;
  //   this.empDetails['financeApprover'] = financeApprover;

  //   //console.log(this.empDetails,"aprover");
  //   this.appService.httpPost('userSettings', this.empDetails, 'insertUserSetting', '', true).subscribe((data) => {
  //     if (data.content.status === 'danger') {
  //       if (data.content.error === 'email') {
  //         setTimeout(() => {
  //           $('#profileEmpDetails').trigger('click');
  //           $('.cls-email').addClass('cls-border-error');
  //         })
  //       }
  //     } else {
  //       this.router.navigate([
  //         './' +
  //         urlConfig.ROUTES.home +
  //         '/' +
  //         urlConfig.ROUTES.manageprofile
  //       ])
  //     }
  //   });
  // }
  /**
   * empDetailsUpdated
   */
  // public empDetailsUpdated(val: any): void {
  //   this.empDetailsResponse = val;
  // }
  /**
   * desc: profileEmpdetails
   */
  public profileEmpDetails(data: any): void {
    this.empDetails = data;
    $('#profileExpenseApproval').trigger('click');
  }
  /**
  * backtoList
  */
  public backtoList(): void {
    this.router.navigate([
      './' +
      urlConfig.ROUTES.home +
      '/' +
      urlConfig.ROUTES.manageprofile
    ])
  }
  /**
   * to open mobile view tab function
   */
  public openMobileTab() {
    $('#fn-mbl-tab').addClass('d-block');
  }
  /**
   * Desc: Logut
   */
  public logOut(): void {
    // this.appService.httpPost("logout", 'user logout', "", 'false').subscribe((data: any) => {
    //   if (data.content.logout === true) {
    //     config.AUTH_STATUS = false;
    //     this.appService.deleteAllCookies();
    //     localStorage.clear();
    //     if (this.appService.SSODetails !== "") {
    //       document.location.href = environment.aypPath.replace(
    //         "index",
    //         "logout"
    //       );
    //     } else {
    //       this.router.navigate(["./" + urlConfig.ROUTES.auth]);
    //     }
    //     // hideLoader();
    //   }
    // });
    this.commonService.logOut('user logout');
    // config.CURRENTLANGUAGE = 'EN';
    // window.localStorage.setItem('language', 'en');
  }
  /**
   * close my profile
   */
  public closeMyprofile() {
    this.router.navigate([
      './' +
      urlConfig.ROUTES.home +
      '/' +
      urlConfig.ROUTES.dashboard
    ])
  }
  /**
   * triggerAction
   */
  public triggerAction(name: string): void {
    this.appService.triggerAction(name);
  }
  /**
   * expense approval details
   */
  public expenseDetails(data: any) {
    //console.log(data);
    this.expenseApprovalDetails = data;
    $('#profileAdvanceApproval').trigger('click');
  }
  /**
   * advance approval details
   */
  public advanceDetails(data: any) {
    //console.log(data);
    this.advanceApprovalDetails = data;
    $('#profileFinanceApproval').trigger('click');
  }
  /**
   * finance approval details
   */
  public financeDetails(data: any) {
    this.financeApprovalDetails = data;
    this.empDetails['expenseApprover'] = this.expenseApprovalDetails.expenseApprover;
    this.empDetails['advanceApprover'] = this.advanceApprovalDetails;
    this.empDetails['financeApprover'] = this.financeApprovalDetails;
    this.empDetails['exceptionApprover'] = this.expenseApprovalDetails.exceptionApprover;
    //console.log(this.empDetails);
    this.appService.httpPost('userSettings', this.empDetails, 'insertUserSetting', '', true).subscribe((data) => {
      //console.log(data, 'jkjkjcurency');
      if (data.content.status === 'danger') {
        if (data.content.error === 'email') {
          setTimeout(() => {
            $('#profileEmpDetails').trigger('click');
            $('.cls-email').addClass('cls-border-error');
          })
        }
      } else {
        this.router.navigate([
          './' +
          urlConfig.ROUTES.home +
          '/' +
          urlConfig.ROUTES.manageprofile
        ])
      }
    });
  }
  /**
* Desc : Side tab status active when click get index from side tab component
* @param index 
*/
  public tabEvent(index: number) {
    // this.clickedIndex = index;
    this.formData.data.map((element: any) => {
      element.status = 'N';
    });
    this.formData.data[index].status = 'Y'; //Dynamicform status active
  }
  /**
   * Tab Event change on button click & tab event send to side tab component
   */
  public changeTabEvent(tabValue: number) {
    (this.getTabData && this.getTabData != undefined) ? this.getTabData.status = true : this.getTabData = false;
    this.tabValue = tabValue;  // Get next tab index
  }
}
