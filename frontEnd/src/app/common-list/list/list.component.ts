import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { config } from 'src/app/core-module/config/app';
import { urlConfig } from 'src/app/core-module/config/url';
import { Router } from '@angular/router';
import { AppService } from 'src/app/core-module/services/app.service';
declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
/**
 * Name : Meenakshi Sundaram R
 * Date : 25-06-2021
 * Desc : List Component
 */
export class ListComponent implements OnChanges {
  // public radioButton: { id: string; name: string; userBased: boolean; status: string }[] = [
  //   {
  //     id: "1",
  //     name: 'Report Wise',
  //     userBased: false,
  //     status: 'Y'
  //   },
  //   {
  //     id: "2",
  //     name: 'Employee Wise',
  //     userBased: true,
  //     status: 'N'
  //   }
  // ];
  config = config;
  /**
   * List data
   */
  @Input() public listData: any = {};
  public historyFlag: boolean = false;
  public confirmation: boolean = false;
  public confirmationContent: any = {};
  //  { title: string; button: { label: string; status: boolean; }[]; };
  public historyInput: { data: any; type: string; };
  public type: string ='';
  /**
   * Expand Icon enable / disable boolean value
   */
  public enableExpand: boolean = false;
  /**
   * List Main header (not expand)
   */
  public mainHeader: Array<any> = [];
  /**
   * List sub header (expand)
   */
  public subHeader: Array<any> = [];
  /**
   * Expand all boolean value 
   */
  public expandAllIcon: boolean = true;
  //Expand all boolean action
  public expandAll: boolean[] = [];
  /**
   * popupVal
   */
  public popupVal: object = {
    "flag": false,
    "module": "",
    "value": {}
  };
  /**
   *  requestData
   */
  public requestData: object = {};
  /**
 * Desc: setting create new
 */
  public createNew: boolean = false;
  /**
   * Tab data
   */
  @Input() public tabData: Array<any> = [];
  /**
 * Desc: editcategoryVal
 */
  public editcategoryVal: any = {};
  /**
   * Policy,Profile group ,allowance
   */
  @Input() public settingsList: object = {};
  /**
   * Store Advance module popup
   */
  public advanceContent: object = {};
  @Input() public tabValue: string = '';

  /**
   * Send edit list data response to list index component 
   */
  @Output() public editResponse = new EventEmitter();
  /**
  * To send list create / update response status to settings component
  */
  @Output() public emitListStatus = new EventEmitter();
  /**
   * Get userbased status in list index component
   */
  @Input() public userBasedList: boolean = false;
  /**
   * 
   */
  @Output() public emitUserBasedList = new EventEmitter();
  statusCall: { module: string; action: string; };
  public statusIndex: number = 0;
  public advanceId: string = '';
  /**
  * Send success action tab component to tab data load dynamically
  */
  @Output() public loadTabData = new EventEmitter();
  @Output() public actionType = new EventEmitter();
  /**
   * path
   */
  public currentPath: string;
  /**
   * Get list module data
   */
  @Input() public listModule: any;
  /**
   * deviceFlag
   */
  @Input() public deviceFlag: boolean = false;
  /**
   * Send Advance Type toAdvance alert component
   */
  public advanceType: boolean = false;
  /**
   * Desc : Show Mail / user info popup boolean variable
   */
  public userInfoPopup: boolean = false;
  /**
   * Desc : Settleform Boolean action
   */
  public settleform: boolean = false;
  /**
   * Desc : Settle form data
   */
  public settleFormData : Array<any> = [];

  constructor(private router: Router, private appService: AppService) { }

  /**
   * ngOnChanges
   */
  ngOnChanges(): void {
    let emptyObj = Object.keys(this.listData).length > 0;
    if (emptyObj) {
      this.enableExpand = this.listData!.default_Parms!.expand != undefined ? this.listData!.default_Parms!.expand : this.enableExpand;
      this.mainHeader = this.listData['list_header']?.filter((data: any) => data.status != false);
      if (this.enableExpand == true)
        this.subHeader = this.listData['list_header']?.filter((data: any) => data.status == false);
    }
  }
  /**
   * view action
   */
  public viewAction(listdata: any, event: Event) {
    // console.log(this.mainHeader, listdata);
    this.mainHeader.forEach((data: any) => {
      if (data.name === 'Action') {
        data.icons.forEach((val: any) => {
          if (val.name === 'view' || val.name === 'edit') {
            // console.log(val,listdata);
            if(listdata.disable != true && val.action_name != "editAdvance"){
              this.action(val, listdata, event);
            }
          }
        })
      }
    });    
  }
  /**
   * Desc : List view action
   * @param icon 
   * @param listData 
   */
  public action(icon: object, listData: any, event: Event, rowIndex: number = 0) {
    event.stopPropagation();
    console.log(icon, listData,rowIndex);
    this.requestData = {
      module: icon['module_name'],
      value: listData['action'],
      action: icon['action_name']
    }
    console.log(icon['name']);
    // console.log(this.requestData, "req");
    switch(this.listModule.moduleName) {
      case 'pendingSettlementList':
        this.currentPath = 'finance';
        break;
      case 'pendingApprovalList':
        this.currentPath = 'approver';
        break;
      case 'advanceReport':
      this.currentPath = 'advance';
      break;
      case 'reportExpense':
        this.currentPath = 'user';
      break;
      default:
      break;
    }
    let formData = {
      value: {
        reportCode: listData?.reportCode,
      }
    }
    if (icon['type']) {
      formData['type'] = icon['type'];
    }
    else {
      delete formData['type'];
    }
    let confirmationTitle;
    if (icon['name'] == 'view') {
      if (icon['action'] == '' && this.userBasedList) {
        this.requestData['value']['id'] = this.listData['table_id'];
        this.requestData['value']['type'] = 'employeeWise';
        this.emitUserBasedList.emit(this.requestData);

      }
      else {
        this.router.navigate([
          './' +
          urlConfig.ROUTES.home +
          '/' +
          urlConfig.ROUTES[icon['action']]
        ],
          {
            state: {
              reportid: { reportCode: this.requestData['value']['reportCode'], reportId: this.requestData['value']['reportId'], reportname: this.requestData['value']['reportname'] },
              // path: icon['path'],
              path: this.currentPath,
              tabName: 1
            }
          });
      }
    }
    //Edit / Clone List data
    if (icon['name'] == 'edit' || icon['name'] == 'clone') {
      console.log(this.requestData);
      // para,raplet 40mg,offlomatic 200mg
      this.type = icon['name'];
      this.actionType.emit(this.type);
      if (icon['action']) {
        console.log('navigate');
        this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES[icon['action']]],
          {
            state: {
              type: icon['type'],
              userId: listData['action']['userId'],
            }
          });
      }
      else {
        this.appService.httpPost(this.requestData['module'], this.requestData['value'], this.requestData['action'], 'false').subscribe((data) => {
          console.log(data.content, 'curency');
          let response = {
            "status": true,
            "data": data.content,
            "type": listData['action']['action']
          }
          this.editResponse.emit(response);  // Send response to list index 
        });
      }
    }
    //Delete action
    if (icon['name'] == 'delete') {
      confirmationTitle = this.capitalizeTitle(icon['name']);
      this.confirmPopup(confirmationTitle, "warning", false);
    }
    //History Input action
    if (icon['name'] == 'history') {
      this.appService.httpPost(this.requestData['module'], this.requestData['value'], this.requestData['action'], 'false').subscribe((data) => {
        //report
        this.historyInput = {
          data: data.content,
          type: icon['type']
        };
      });
      this.historyFlag = true;
    }
    //Send for approval action in advance module
    if (icon['name'] == 'send_approval') {
      this.popupVal['flag'] = true;
      this.appService.httpPost(this.requestData['module'], this.requestData['value'], this.requestData['action'], 'false').subscribe((data) => {
        this.advanceContent = data.content.data;
        // this.advanceContent['reportCode'] = listData['report_id'];
        this.advanceId = listData['report_id'];
        this.advanceType = true;
        // this.advanceContent['currencyAmount'] = '';
      });
    }

    //Approve , Call back , Send back action in list
    if (icon['name'] == 'approve') {
      confirmationTitle = this.capitalizeTitle(icon['name']);
      this.confirmPopup(confirmationTitle, "warning", false);
    }
    if (icon['name'] == 'reject' || icon['name'] == 'send_back' || icon['name'] == 'call_back') {
      confirmationTitle = this.capitalizeTitle(icon['name']);
      this.confirmPopup(confirmationTitle, "warning", true);
    }
    if (icon['name'] == 'settle') {
      // $('.cls-settlediv').css('top', ($('.cls-row' + rowIndex).offset().top + 40));
      this.settleform = true;
    }
  }

  /**
   * Desc : Confirm Popup action in alert popup (common function)
   * @param title 
   * @param popupType 
   * @param popupContent 
   */
  public confirmPopup(title: string, popupType: string, popupContent: boolean) {
    this.confirmationContent = {
      title: "Are you sure want to " + title + "?",
      type: popupType,
      reason: popupContent,
      button: [
        {
          label: 'No',
          status: false
        },
        {
          label: 'Yes',
          status: true
        }
      ]
    }
    this.confirmation = true;
  }
  public capitalizeTitle(str: string) {
    let i: number, action = str.split('_');
    for (i = 0; i < action.length; i++) {
      action[i] = action[i].charAt(0).toUpperCase() + action[i].slice(1);
    }
    // console.log(action, action.join(' '));
    return action.join(' ');
  }

  /** 
 * Expand all list row
 */
  public expandAllList() {
    this.expandAllIcon = !this.expandAllIcon;
    if (this.expandAll.length == 0) {
      for (let i = 0; i < this.listData['default_data'].length; i++) {
        let flag: boolean = ($('#expandContainer' + i).hasClass('d-none')) ? true : false;
        this.expandAll.push(flag);
      }
    }
    if (this.expandAll.indexOf(false) == -1) {
      for (let i = 0; i < this.listData['default_data'].length; i++) {
        this.expandAll[i] = false;
        $('#expandclose' + i).removeClass('icon-17-expand').addClass('icon-18-collapse');
      }
      $('.cls-sublist').removeClass('d-none').addClass('d-flex');

      this.listData.default_Parms.expand = true;
    }
    else {
      $('.cls-sublist').removeClass('d-flex').addClass('d-none');
      for (let i = 0; i < this.listData['default_data'].length; i++) {
        this.expandAll[i] = true;
        this.listData.default_Parms.expand = false;
        $('#expandclose' + i).removeClass('icon-18-collapse').addClass('icon-17-expand');
      }
    }
  }

  /**
   * Expand each list row
   * @param id 
   */
  public expandList(id: number) {
    let value = this.expandAll;
    for (let i = 0; i < this.listData['default_data']; i++) {
      if (i != id)
        $('#expandContainer' + i).removeClass('d-flex').addClass('d-none');
      $('#expandclose' + i).removeClass('icon-18-collapse').addClass('icon-17-expand');
    }
    if ($('#expandContainer' + id).hasClass('d-flex') == true) {
      value[id] = false;
      $('#expandContainer' + id).removeClass('d-flex').addClass('d-none')
      $('#expandclose' + id).removeClass('icon-18-collapse').addClass('icon-17-expand');
    } else {
      $('#expandContainer' + id).removeClass('d-none').addClass('d-flex');
      $('#expandclose' + id).removeClass('icon-17-expand').addClass('icon-18-collapse');
      value[id] = true;
    }
    this.expandAll = value;
  }

  /**
   * Desc : Toggle status changed dynamically 
   */
  public changeToggle(index: number, value: string, module: string, action: string, listData: object,event:Event) {
    // console.log(index, value, module, action, listData, "status");
    event.stopPropagation();
    this.listData.list_body[index]['status'] = value;
    this.statusIndex = index;
    this.confirmationContent = {
      title: 'Are you sure want to change status ?',
      button: [
        {
          label: 'No',
          status: false
        },
        {
          label: 'Yes',
          status: true
        }
      ]
    };
    this.confirmation = true;
    this.statusCall = this.changeStatus(module, action, listData);
  }

  /**
   * Desc : Common function for toggle status change
   * @param module 
   * @param action 
   * @param status 
   * @returns 
   */
  public changeStatus(module: string, action: string, status: object) {
    // console.log(this.requestData['value']);
    let requst = {
      "module": module,
      "value": status['action'],
      "action": action
    };
    return requst;
  }

  /**
   * Desc:Close history modal
   */
  public historyClose(val: boolean): void {
    this.historyFlag = val;
  }

  /**
   * Desc : Alert popup 
   * @param val 
   */
  public confirmAction(val: any) {
    this.confirmation = false;
    console.log(val, this.requestData, this.statusCall);
    this.requestData = (this.requestData && JSON.stringify(this.requestData) != JSON.stringify({})) ? this.requestData : this.statusCall;
    // if (this.statusCall || (this.requestData && this.requestData == {})) {
    //   if(this.statusCall){
    //   this.listData.list_body[this.statusIndex]['status'] = this.listData.list_body[this.statusIndex]['status'] == 'N' ? 'Y' : 'N';
    //   this.requestData['value']['status'] = this.listData.list_body[this.statusIndex]['status'];
    // }
    console.log(this.requestData)
    if (val.flag) {
      if (this.statusCall) {
        this.listData.list_body[this.statusIndex]['status'] = this.listData.list_body[this.statusIndex]['status'] == 'N' ? 'Y' : 'N';
        this.requestData['value']['status'] = this.listData.list_body[this.statusIndex]['status'];
      }
      if (val['data']['comment']) {
        this.requestData['value']['comment'] = val['data']['comment'];
      }
      console.log(this.requestData['module'], this.requestData['value'], this.requestData['action']);
      this.appService.httpPost(this.requestData['module'], this.requestData['value'], this.requestData['action'], 'false', true).subscribe((data: any) => {
        console.log(data, "success del")
        this.emitListStatus.emit(data.content);
      });
    }
  }

  /**
   * Desc :Mail Id based user details show to user mail id click action
   * @param data 
   */
  public showPopUp(header: object, data: object, event: Event) {
    event.stopPropagation();
    console.log(header, data, "popup")
    this.popupVal = {
      "module": header['module_name'],
      "action": header['action_name'],
      // "value": data['mailPopup']['value']
    }
    if (header['type'] == 'report') {
      this.popupVal['flag'] = true;
      this.popupVal['value'] = data['reportPopUp']['value'];
      this.appService.httpPost(this.popupVal['module'], this.popupVal['value'], this.popupVal['action'], 'false').subscribe((data) => {
        this.advanceContent = data.content.data;
        this.advanceType = false;
      });
    }
    else {
      this.userInfoPopup = true;
      this.popupVal['value'] = data['mailPopup']['value']
    }
    // console.log(this.popupVal);
  }
  /**
* Desc : Mail popup & Advance form confirm / close action 
*/
  public popUpInfo(data: object): void {
    // console.log(data, 'emit')
    this.userInfoPopup = false;
    this.popupVal['flag'] = false;
    if (data && data != undefined) {
      this.appService.httpPost(data['moduleName'], data['value'], data['actionName']).subscribe((data: any) => {
        console.log(data)
        this.emitListStatus.emit(data.content);
      })
    }
  }
  /**
 *openCategory
 */
  public openCategory(index: number): void {
    $('.cls-close' + index).removeClass('d-none');
    $('.cls-more' + index).addClass('d-none');
  }
  /**
   * cls-remaining
   */
  public removeCategory(index: number): void {
    $('.cls-close' + index).addClass('d-none');
    $('.cls-more' + index).removeClass('d-none');
  }
   /**
   * settleReport
   */
  public settleReport(data:any){
    console.log(data);
    this.settleform = false;
    if (data.flagVal === true) {
      data.form["reportCode"] = data.reportCode;
      data.form["type"] = 'Advance';
      this.appService.httpPost('buttonActions', data.form, "settleButtonAction", '', true).subscribe((val:any) => {
        console.log(val)
        this.emitListStatus.emit(val.content);
      });
    }
  }
}
