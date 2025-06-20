import { Component, OnInit, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../../core-module/config/url';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';
import { DynamicFormComponent } from '../../dynamic-form/dynamic-form/dynamic-form.component';
declare function showLoader(): any;
declare function hideLoader(): any;
declare var $: any;
/**
 * Author: Padma Priya CK
 * Desc : tab comn compoenent with datatable
 */
@Component({
  selector: 'app-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit, OnChanges {
  @ViewChild(DynamicFormComponent) public form: any;
  @ViewChild("topNav") public topNavbar: any;
  public module_name: string = "";
  public id: string = '';
  /**
   * Get category status from list index component
   */
  public userStatus: boolean = false;
  public userType: boolean = false;
  public advanceContent: object = {};

  constructor(private appService: AppService, private router: Router, private deviceService: DeviceDetectorService, public datepipe: DatePipe) { }
  /**
   * Receive filter details form json
   */
  @Input() public filterDetails: Array<any> = [];  //common filter
  /**
   * Store module name
   */
  public module: object = {};  //common filter 
  /**
   * tab content
   */
  public tabData: any = [];
  /**
   * fullResponse content
   */
  public fullResponse: any = [];
  /**
   * tab listData
   */
  public listData: any = {};
  /**
   * loader
   */
  public loader: boolean = true;
  /**
   * submitAdvance
   */
  public submitAdvance: boolean = false;
  /**
   * modulename
   */
  @Input() public moduleName: string = '';
  /**
   * actionname
   */
  @Input() public actionName: string = '';
  /**
   * create
   */
  @Input() public create: string = '';
  /**
   * reportId
   */
  @Input() public reportId: string = '';
  /**
   * output for report history
   */
  @Output() public reportHistory: EventEmitter<any> = new EventEmitter();
  /**
   * confirmation
   */
  public confirmation: boolean = false;
  /**
   * confirmationContent
   */
  public confirmationContent: any = {};
  /**
   * filter
   */
  public filter: any = {};
  /**
   *  Radio Button
   */
  public RadioButton: Array<any>;
  /**
   * tab active
   */
  public activeTab: number;
  /**
   * Desc : showForm flag
   */
  public showFormFlag: boolean = false;
  /**
   * Desc : current path
   */
  public currentPath: string = '';
  /**
   * Desc : History Input
   */
  public historyInput: any = [];
  /**
   * history
   */
  public historyFlag: boolean = false;
  /**
   * Desc : settleform
   */
  public settleform: boolean = false;
  /**
   * Desc : List button actions
   */
  public listbuttonActionVal: any = {};
  /**
   * filterData
   */
  public filterData: any = [];
  /**
   * Store advance form value
   */
  public advanceFormVal: object = {};
  /**
   * counter for star
   */
  public counter = Array;
  /*
   * Emplyee Wise Flag 
   */
  public backToBack: boolean = false;
  /**
   * Emit flagval
   */
  // @Output() public createForm : EventEmitter<boolean> = new EventEmitter();
  public deviceInfo: any;
  public deviceFlag: boolean = false;
  /**
   * Top navbar data
   */
  @Input() public topNavData: Array<any> = [];
  /**
   * Get Top nav index
   */
  public tabIndex: number = 0;
  /**
   * Get list module & action to click top nav
   */
  public listModule: object = {};
  /**
   * Send userbased status to list index component in choose category 
   */
  @Output() public requestData = new EventEmitter();
  /**
   * Send Approve / reject status to parent component from list index component (Pending approval,settlement,expense report)
   */
  @Output() public tabStatusEvent = new EventEmitter();
  /**
   * Send Advance form create status to tab component
   */
  @Output() public advanceRequestForm = new EventEmitter();
  /**
   * Form Status top navbar count update
   */
  public formStatus: boolean = false;
  /**
   * Desc : Send User based type to parent component
   */
  @Output() public userBasedType = new EventEmitter();
  /**
   * Back to employee wise booleab action send to list index component
   */
  public backAction: boolean = false;
  /**
   * Top navbar loader
   */
  @Input() public topNavLoader: boolean = false;
  /**
   * Send adavnce type to advance form component to show / hide confirm button
   */
  public advanceType: boolean = false;
  /**
   * Desc : Send Approval status to advance alert component
   */
  public sendForApprovalStatus: boolean = false;
  /**
   * public top nav data
   */
  public topNavDataNew : any;
  /**
   * Ng Oninit
   */
  public ngOnInit(): void {

  }
  public ngOnChanges() {
    //get input data from filter (parent)
    this.deviceInformation();
    console.log(urlConfig, this.router)
    this.RadioButton = [
      {
        name: 'Report Wise',
        status: 'Y'
      },
      {
        name: 'Employee Wise',
        status: 'N'
      }
    ];
    // console.log(this.moduleName);
    // switch (this.moduleName) {
    //   case 'pendingSettlementList':
    //     this.currentPath = 'finance';
    //     break;
    //   case 'pendingApprovalList':
    //     this.currentPath = 'approver';
    //     break;
    //   case 'advanceReport':
    //     this.currentPath = 'advance';
    //     break;
    //   case 'reportExpense':
    //     this.currentPath = 'user';
    //     break;
    //   case 'adminReportExpense':
    //     this.currentPath = 'approver';
    //     break;
    //   default:
    //     break;
    // }
    console.log(this.module, this.filterDetails);
    this.module = (this.filterDetails.length > 0) ? this.filterDetails.filter(data => data.format == 'action')[0] : undefined;
    this.filterDetails = this.filterDetails.filter(data => data.format != 'action');
    // if (this.module != undefined && this.module['module_name'] == 'adminReportExpense') {
    //   var date = new Date();
    //   var y = date.getFullYear();
    //   var m = date.getMonth();
    //     this.filter['dateInterval'] = {
    //       'from': this.datepipe.transform(new Date(y,m-1,1), 'yyyy-MM-dd'),
    //       'to': this.datepipe.transform(new Date(), 'yyyy-MM-dd')
    //     }
    // }
    if (this.module && this.module != undefined) {
      this.activeTab = 0;
      this.moduleName = this.module['module_name'];
      let final = this.getResponse(this.moduleName);
      // if(final && final === this.moduleName && window.localStorage.getItem('back')){
      //   console.log(1);
      //   // this.tabResponse('tab1', 0);
      //   // window.localStorage.removeItem("back");
      // }
      if (final !== this.moduleName || !window.localStorage.getItem('back')) {
        // console.log(2);
        // this.tabResponse('tab1', 0);  //c
      }
    }
    if (history.state.tabName) {
      // console.log("1");
      this.activeTab = history.state.tabName - 1;
      // this.tabResponse('tab' + history.state.tabName, history.state.tabName - 1);
    }
  }
  public ngAfterViewInit(){
    console.log(this.topNavbar,this.topNavData, "topNav");
    if (this.topNavData && this.topNavData.length > 0) {
      this.listModule = (this.topNavData.length > 0) ? this.topNavData.filter(data => data.format == 'action')[0] : undefined;
      console.log(this.listModule);
      this.topNavDataNew = this.topNavData.filter(data => data.format != 'action');
    }
    // console.log(this.userType)
    if (this.topNavbar && this.topNavDataNew && !this.formStatus && !this.userStatus && !this.userType) {
      console.log('call');
      this.topNavbar.masterDataCall(0, this.topNavDataNew[0]);
    }
    console.log(this.module, 'iiiig8y');
  }
  public getResponse(module: string) {
    console.log(module);
    this.module_name = module;
    return this.module_name;
    // // this.moduleName = module;
    // if (this.moduleName == module) {
    //   console.log(true)
    //   this.tabResponse('tab1', 0);
    // }
  }
  public deviceInformation() {
    this.deviceInfo = this.deviceService.getDeviceInfo();
    const isMobile = this.deviceService.isMobile();
    const isTablet = this.deviceService.isTablet();
    this.deviceInfo["platform"] =
      isMobile == true ? "mobile" : isTablet == true ? "tab" : "desktop";
    (this.deviceInfo["platform"] == 'mobile' || this.deviceInfo["platform"] == 'tab') ? this.deviceFlag = true : this.deviceFlag = false;
  }
  /**
   * showPopUp
   */
  // public showPopUp(val: any, event: Event) {
  //   event.stopPropagation();
  //   this.popupVal = {
  //     'flag': true,
  //     'module': val['module'],
  //     'value': val
  //   }
  //   if (val?.action === 'previewAdvanceContent') {
  //     this.popupVal.value['type'] = 'advanceView';
  //   }
  // }
  /**
   * clickusertype
   */
  public clickusertype(index: number, value: string, id: any): void {
    console.log(value, index, id);
    if (index == 0) {
      this.backToBack = false;
    }
    this.RadioButton.map((element: any) => { element.status = 'N'; });
    this.RadioButton[index].status = 'Y';
    // this.tabResponse(value, id); //c
  }
  /**
   * Desc : closeForm
   */
  public closeForm(val: boolean): void {
    $('.cls-inner-adv').addClass('cls-close-ani');
    $('#fn-background').removeClass('cls-resp-background');
    setTimeout(() => {
      this.showFormFlag = val;
    }, 350);
    $('td').css('height', 'unset');
  }
  /**
   * showForm
  */
  public showForm(name: string): void {
    $('.cls-advance-report-container').addClass('d-block');
    // if(name === 'cls-createform'){
    //   this.showFormFlag = !this.showFormFlag;
    // } else{
    this.showFormFlag = true;
    // }
    // this.createForm.emit(this.showFormFlag);
    setTimeout(() => {
      $('.cls-advform').css({ 'top': $('.' + name).offset().top });
      $('.' + name + ' td').css('height', '55px');
    }, 100);
  }
  /**
   * applyFilter
   */
  public applyFilter(val: any = {}): void {
    console.log(val);

    this.filter = val;
    let index: number;
    console.log(index)
    // if (this.currentPath === 'advance') {
    //   index = this.activeTab;
    // }
    // else {
    //   index = this.activeTab + 1;
    // }
    this.tabResponse();
  }
  /**
   * service for tab data
   */
  public tabResponse(): void {
    // console.log(val,"in")
    console.log(this.userStatus)
    // let userBasedVal: boolean = false;
    // this.RadioButton[0].status == 'Y' ? userBasedVal = false : userBasedVal = true;
    // this.loader = true;
    // tslint:disable-next-line: max-line-length
    console.log(this.listModule, this.userStatus, this.filter);
    if (this.listModule && this.listModule != undefined) {
      if (this.userStatus)
        this.appService.httpPost(this.listModule['moduleName'], { tab: this.listModule['id'], 'userBased': this.userStatus, 'filters': this.filter }, this.listModule['actionName'], 'false').subscribe((data) => {
          // this.tabData = data.content;
          console.log(data)
          this.listData = data.content;
          // this.fullResponse = JSON.parse(JSON.stringify(data.content));
        });
      else {
        this.appService.httpPost(this.listModule['moduleName'], { tab: this.listModule['id'], 'userBased': this.userStatus, 'filters': this.filter }, this.listModule['actionName'], 'false').subscribe((data) => {
          // this.tabData = data.content;
          console.log(data)
          this.listData = data.content;
          // this.fullResponse = JSON.parse(JSON.stringify(data.content));
        });
      }
    }
  }
  /**
   * settleReport
   */
  public settleReport(data: any): void {
    this.settleform = false;
    if (data.flagVal === true) {
      data.form["reportCode"] = this.listbuttonActionVal.request.reportCode;
      data.form["type"] = 'Advance';
      this.appService.httpPost('buttonActions', data.form, "settleButtonAction", '', true).subscribe(() => {
        // this.tabResponse('tab2', this.activeTab);  //c
      });
    }
  }
  /**
   * confirm action
   */
  public confirmAction(val: any): void {
    this.confirmation = false;
    this.confirmationContent = {};
    if (val.data) {
      this.listbuttonActionVal.request['comment'] = val.data['comment'];
    }
    if (val.flag === true) {
      this.appService.httpPost(this.listbuttonActionVal.module, this.listbuttonActionVal.request, this.listbuttonActionVal.action).subscribe(() => {
        if (this.currentPath === 'advance' || this.currentPath === 'user') {
          // this.tabResponse('tab1', this.activeTab);  //c
        } else {
          // this.tabResponse('tab2', this.activeTab);  //c
        }
      });
    }
  }
  /**
 * showModal
 */
  public history(val: any): void {
    this.appService.httpPost(val['actionName'], val['value'], val['moduleName']).subscribe((data) => {
      this.historyInput = {
        data: data.content,
        type: 'report'
      };
    });
    this.historyFlag = true;
  }
  /**
   * close modal
   */
  public historyClose(val: boolean): void {
    this.historyFlag = val;
  }

  public redirectList(status: boolean) {
    // console.log(status,this.backAction,"back");
    this.backAction = false;
    this.getCategoryDetails(status)
  }
  /**
  * advanceRequest
  */
  public advanceRequest(data: object = {}): void {
    // this.showFormFlag = false;
    // this.activeTab = 1;
    // this.tabResponse('tab1', 1, 'latest');  //c
    // console.log(data, '1');
    if (data['status'] == 'success') {
      console.log(this.userStatus, !this.userStatus, "sussess");
      this.formStatus = true;
      this.topNavbar.masterDataCall(1, this.topNavDataNew[1]);
      // this.advanceRequestForm.emit(data);
    }
  }

  public getTabEvent(data: object) {
    console.log(data, this.userType, this.filter, "");
    console.log(this.listModule, this.userStatus);
    // this.tabIndex = data['index'];
    if (data['value'] && data['value'] != undefined && JSON.stringify(data['value']) != JSON.stringify({}) && data['value'] != '') {
      this.id = data['value']['id'];
      (this.listModule && this.listModule != undefined) ? this.listModule['id'] = this.id : undefined;
      let formData = {
        "tab": this.id,
        "filters": this.filter
      }
      console.log(data['value']['category']);
      if (data['value']['category']) {
        formData['userBased'] = this.userStatus;
      }
      else {
        delete formData['userBased'];
      }
      console.log(formData, "frmD");
      console.log(this.listModule);
      
      this.appService.httpPost(this.listModule['moduleName'], formData, this.listModule['actionName']).subscribe((data: any) => {
        this.listData = data.content;
        console.log(this.listData);
      });
    }
    console.log(Object.values(this.filter));
    if (data['value']['id'] !== 'create_advance') {
      // this.tabResponse('');
    }
  }
  public getCategoryDetails(status: boolean) {
    console.log(status);
    this.userStatus = status;
    this.requestData.emit(this.userStatus);
    let val = {
      index: 0,
      value: this.topNavDataNew[0]
    };
    (this.userStatus) ? this.getTabEvent(val) : undefined;
  }
  // public getTabStatusEvent(data: object) {
  //   console.log(this.userStatus,data, "tabEvent");
  //   // this.tabStatusEvent.emit({ 'data': data, 'userStatus': this.userStatus });
  //   this.tabStatusEvent.emit(data);
  // }
  // public userBasedCountUpdate(type: boolean) {
  //   console.log(type);
  //   this.userType = type;
  //   this.userBasedType.emit(this.userType);
  // }
  public getUserBasedRequestData(requestData: object) {
    this.backAction = true;
    this.loader = true;
    this.appService.httpPost(requestData['module'], requestData['value'], requestData['action']).subscribe((data: any) => {
      console.log(data, this.backAction, "backemit1");
      this.loader = false;
      this.listData = data.content;
    });
  }
  public getSendForApprovalResposne(data: object) {
    if (data['status']) {
      this.submitAdvance = true;
      this.sendForApprovalStatus = true;
      this.advanceFormVal = data['value'];
      this.appService.httpPost('advanceReport', { 'staticContent': 'yes', 'form': this.advanceFormVal }, 'previewAdvanceContent').subscribe((data: any) => {
        this.advanceContent = data.content.data;
        this.advanceType = true;
      })
    }
  }
  /**
* Desc : Mail popup & Advance form confirm / close action 
*/
  public popUpInfo(data: object): void {
    // console.log(data,this.advanceFormVal, 'emit')
    this.submitAdvance = false;
    if (data && data != undefined) {
      data['value'] = this.advanceFormVal;
      this.appService.httpPost(data['moduleName'], data['value'], data['actionName']).subscribe((data: any) => {
        // console.log(data);
        this.advanceRequest(data.content);
      })
    }
  }
}
