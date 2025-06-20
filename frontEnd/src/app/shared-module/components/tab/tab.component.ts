import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../../core-module/config/url';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DatePipe } from '@angular/common';
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
export class TabComponent implements OnInit {
  public module_name: string = "";
  constructor(private appService: AppService, private router: Router, private cd: ChangeDetectorRef, private deviceService: DeviceDetectorService, public datepipe: DatePipe) { }
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
  public listData: any = [];
  /**
   * loader
   */
  public loader: boolean = true;
  /**
   * popupVal
   */
  public popupVal: any = {
    'flag': false,
    'module': '',
    'value': {}
  };
  /**
   * submitAdvance
   */
  public submitAdvance: any = {
    'flag': false,
    'module': '',
    'value': {}
  };
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
   * Edit advance form
   */
  // @Output() public advanceFormVal : EventEmitter<any> = new EventEmitter();
  public advanceFormVal: any = [];
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
   * Ng Oninit
   */
  public ngOnInit(): void {

  }
  public ngOnChanges() {
    //get input data from filter (parent)
    this.deviceInformation();
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
    switch (this.moduleName) {
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
      case 'adminReportExpense':
        this.currentPath = 'approver';
        break;
      default:
        break;
    }

    this.module = (this.filterDetails.length > 0) ? this.filterDetails.filter(data => data.format == 'action')[0] : undefined;
    this.filterDetails = this.filterDetails.filter(data => data.format != 'action');
    if (this.module != undefined && this.module['module_name'] == 'adminReportExpense') {
      this.filter['dateInterval'] = {
        'from': this.datepipe.transform(new Date(), 'yyyy-MM-dd'),
        'to': this.datepipe.transform(new Date(), 'yyyy-MM-dd')
      }
    }
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
        this.tabResponse('tab1', 0);
      }
    }
    if (history.state.tabName) {
      // console.log("1");
      this.activeTab = history.state.tabName - 1;
      // this.tabResponse('tab' + history.state.tabName, history.state.tabName - 1);
    }
  }

  public getResponse(module: string) {
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
   * advanceRequest
   */
  public advanceRequest(_val: any): void {
    this.showFormFlag = false;
    this.activeTab = 1;
    this.tabResponse('tab1', 1, 'latest');
  }
  /**
   * popUpInfo
   */
  public popUpInfo(_val: any): void {
    this.popupVal = {
      'flag': false,
      'module': '',
      'value': {}
    }
  }
  /**
   * showPopUp
   */
  public showPopUp(val: any, event: Event) {
    event.stopPropagation();
    this.popupVal = {
      'flag': true,
      'module': val['module'],
      'value': val
    }
    if (val?.action === 'previewAdvanceContent') {
      this.popupVal.value['type'] = 'advanceView';
    }
  }
  /**
   * clickusertype
   */
  public clickusertype(index: number, value: string, id: any): void {
    if (index == 0) {
      this.backToBack = false;
    }
    this.RadioButton.map((element: any) => { element.status = 'N'; });
    this.RadioButton[index].status = 'Y';
    this.tabResponse(value, id);
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
    this.filter = val;
    let index: number;
    if (this.currentPath === 'advance') {
      index = this.activeTab;
    }
    else {
      index = this.activeTab + 1;
    }
    this.tabResponse('tab' + index, this.activeTab);
  }
  /**
   * service for tab data
   */
  public tabResponse(val: string, id: any, latest: string = ''): void {
    // console.log(val, id, latest, "in")
    hideLoader();
    let userBasedVal: boolean = false;
    this.RadioButton[0].status == 'Y' ? userBasedVal = false : userBasedVal = true;
    this.loader = true;
    // tslint:disable-next-line: max-line-length

    if (this.module != undefined) {
      this.appService.httpPost(this.module['module_name'], { 'userBased': userBasedVal, 'filters': this.filter, 'tab': val }, this.module['action_name'], 'false').subscribe((data) => {
        this.tabData = data.content;
        // console.log(data)
        this.fullResponse = JSON.parse(JSON.stringify(data.content));
        //        if ($.fn.DataTable.isDataTable('#' + this.moduleName + id)) {
        //   // $('#' + this.moduleName + id).DataTable().destroy();
        // }
        setTimeout(() => {
          this.loader = false;
          //          if ($.fn.DataTable.isDataTable('#' + this.moduleName + id)) {
          //   $('#' + this.moduleName + id).DataTable().destroy();
          // }
          setTimeout(() => {
            $('#' + this.moduleName + id).DataTable({
              'order': [],
              "bSort": false,
              // "scrollX": true,
              "oSearch": { "bSmart": false },
              'language': {
                'searchPlaceholder': 'Search Records'
              }
              // 'rowReorder': {
              //   'selector': 'td:nth-child(2)'
              // },
              // 'responsive': true
            });
            if (latest !== '') {
              $('.cls-row1').addClass('cls-latest');
              setTimeout(() => {
                $('tr').removeClass('cls-latest');
              }, 10500);
            }
            if (this.reportId !== '' && this.reportId !== undefined) {
              $('td:contains("' + this.reportId + '")').parent().addClass('cls-latest');
            }
            setTimeout(() => {
              $('tr').removeClass('cls-latest');
            }, 10500);
          }, 10);
        }, 1500);
      });
    }
  }
  /**
   * toggle tab
   */
  public toggletab(id: any, val: string): void {
    this.showFormFlag = false;
    this.activeTab = id;
    if (val !== 'CreateAdvance') {
      this.tabResponse(val, id);
    }
  }
  /**
   * viewReport
   */
  public viewReport(val: any, action: string = '', rowIndex: number, tabIndex: number, actionName: string = '', moduleName: string = '', event: Event): void {
    event.stopPropagation();
    if (action === 'view') {
      if (typeof val === 'object') {
        this.router.navigate([
          './' +
          urlConfig.ROUTES.home +
          '/' +
          urlConfig.ROUTES.createExpense
        ],
          {
            state: {
              reportid: val,
              path: this.currentPath,
              tabName: tabIndex
            }
          });
      } else if (typeof val === 'string') {
        this.backToBack = !this.backToBack;

        this.appService.httpPost(this.moduleName, { 'userId': val, 'tab': 'tab' + tabIndex }, this.actionName).subscribe((data) => {
          this.tabData = data.content;
          // if ($.fn.DataTable.isDataTable('#' + this.moduleName + tabIndex)) {
          //   $('#' + this.moduleName + tabIndex).DataTable().destroy();
          // }
          setTimeout(() => {
            $('#' + this.moduleName + tabIndex).DataTable({
              'order': [],
              "bSort": false,
              // "scrollX": true,
              "oSearch": { "bSmart": false },
              'language': {
                'searchPlaceholder': 'Search Records'
              }
            });
          }, 10);
        });
      }
    } else if (action === 'delete') {
      this.listbuttonActionVal = {
        'action': actionName,
        'module': moduleName,
        'request': val
      }
      this.confirmationContent = {
        title: 'Are you sure want to delete?',
        button: [
          {
            label: 'No',
            status: false
          }, {
            label: 'Yes',
            status: true
          }
        ]
      };
      this.confirmation = true;
    }
    else if (action === 'advance') {
      this.listbuttonActionVal = {
        'action': actionName,
        'module': moduleName,
        'request': val
      }
      this.confirmationContent = {
        button: [
          {
            label: 'No',
            status: false
          }, {
            label: 'Yes',
            status: true
          }
        ]
      };
      switch (actionName) {
        case 'editAdvance':
          this.appService.httpPost('advanceReport', val, 'editAdvance', 'false').subscribe((data) => {
            // console.log(data, "1");
            $('td').css('height', 'unset');
            data.content.report['path'] = this.currentPath;
            data.content.report['tabIndex'] = tabIndex;
            this.showForm('cls-row' + rowIndex);
            this.advanceFormVal = data.content.report;
            // console.log(data, "2");
            // this.advanceFormVal.emit(data.content.report);
          });
          break;
        case 'submitAdvanceReport':
          this.submitAdvance = {
            flag: true,
            value: {
              "action": "previewAdvanceContent",
              "module": "advanceReport",
              "value": val
            }
          }
          // this.popupVal = {
          //   'flag' : true,
          //   'module' : 'advanceReport',
          //   'value' : val
          // }
          // this.confirmationContent['title']="Are you sure want to send for approval?";
          // this.confirmation = true;
          break;
        case 'approveButtonAction':
          this.confirmationContent['title'] = "Are you sure want to Approve?";
          this.confirmation = true;
          break;
        case 'callBackButtonAction':
          this.confirmationContent['title'] = "Are you sure want to Call back?";
          this.confirmationContent['type'] = 'warning';
          this.confirmationContent['reason'] = true;
          this.confirmation = true;
          break;
        case 'rejectButtonAction':
          this.confirmationContent['title'] = "Are you sure want to Reject?";
          this.confirmationContent['type'] = 'warning';
          this.confirmationContent['reason'] = true;
          this.confirmation = true;
          break;
        case 'sentBackButtonAction':
          this.confirmationContent['title'] = "Are you sure want to Send Back?";
          this.confirmationContent['type'] = 'warning';
          this.confirmationContent['reason'] = true;
          this.confirmation = true;
          break;
        case 'settleButtonAction':
          $('.cls-settlediv').css('top', ($('.cls-row' + rowIndex).offset().top + 40));
          this.settleform = true;
          break;
        case 'fetchReportHistory':
          this.reportHistory.emit(val);
          break;
        default:
          break;
      }
    } else if (action === 'history') {
      const formData: any = {
        'value': val,
        'actionName': actionName,
        'moduleName': moduleName
      }
      this.history(formData);
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
        this.tabResponse('tab2', this.activeTab);
      });
    }
  }
  /**
   * advanceSubmit
   */
  public advanceSubmit(val: any): void {
    this.submitAdvance = {
      'flag': false
    }
    if (val.flag === true) {
      // tslint:disable-next-line:max-line-length
      this.appService.httpPost(this.listbuttonActionVal.module, this.listbuttonActionVal.request, this.listbuttonActionVal.action).subscribe(() => {
        if (this.currentPath === 'advance' || this.currentPath === 'user') {
          this.tabResponse('tab1', this.activeTab);
        } else {
          this.tabResponse('tab2', this.activeTab);
        }
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
          this.tabResponse('tab1', this.activeTab);
        } else {
          this.tabResponse('tab2', this.activeTab);
        }
      });
      // } else if(val.flag === true && currentPath === 'user' && this.listbuttonActionVal.action === 'deleteReport'){

    }
  }
  /**
   * sorting
   */
  public sorting(index: number): any {
    let keyIndex: any;
    if ($('#sortBy').val() !== 'Sort By') {
      this.tabData[index].value.data[0] = [];
      this.filterData = [];
      this.filterData = JSON.parse(JSON.stringify(this.fullResponse[index].value.data[0]));
      this.tabData[index].value.headers.map((data: any, index: number) => {
        if (($('#sortBy').val().toLowerCase()) === (data.toLowerCase())) {
          keyIndex = index;
        }
      })
      this.filterData = this.filterData.sort((a, b) => {
        if ($('#sortBy').val() !== 'Amount' && $('#sortBy').val() !== 'Total Amount') {
          if (a[keyIndex].value < b[keyIndex].value) return -1;
          if (a[keyIndex].value > b[keyIndex].value) return 1;
        } else {
          return (parseInt(a[keyIndex].value)) - parseInt((b[keyIndex].value));
        }
        return true;
      });
      this.tabData[index].value.data[0] = this.filterData;
    } else {
      this.tabData[index].value.data[0] = this.fullResponse[index].value.data[0];
    }
    // if ($.fn.DataTable.isDataTable('#' + this.moduleName + index)) {
    //   $('#' + this.moduleName + index).DataTable().destroy();
    // }
    setTimeout(() => {
      $('#' + this.moduleName + index).DataTable({
        "bSort": false,
        "oSearch": { "bSmart": false },
        // "scrollX": true,
        'language': {
          'searchPlaceholder': 'Search Records'
        }
      });
    }, 10);
    this.cd.detectChanges();
  }
  /**
   * showList
   */
  public showList(id: number, name: string, idSelect: string): void {
    $('#' + idSelect).val();
    // this.tabData[id].value.data[0] =[];
    // this.listData = this.fullResponse[id].value.data[0];
    this.listData = [];
    if ($('#' + idSelect).val() !== 'All') {
      this.fullResponse[id].value.data[0].map((data: any) => {
        data.map((innerdata: any) => {
          if (innerdata.type === 'highlight') {
            if (innerdata[name] === $('#' + idSelect).val()) {
              this.listData.push(data);
            }
          }
        });
      });
      this.tabData[id].value.data[0] = this.listData;
    } else {
      this.tabData[id].value.data[0] = this.fullResponse[id].value.data[0];
    }
    if (this.tabData[id].value.data[0].length === 0) {
      this.tabData[id].value.data = [];
    }
    // if ($.fn.DataTable.isDataTable('#' + this.moduleName + id)) {
    //   $('#' + this.moduleName + id).DataTable().destroy();
    // }
    setTimeout(() => {
      $('#' + this.moduleName + id).DataTable({
        "bSort": false,
        "oSearch": { "bSmart": false },
        // "scrollX": true,
        'language': {
          'searchPlaceholder': 'Search Records'
        }
      });
    }, 10);
  }
  //close advance from
  // public closeadvForm(val: boolean) {
  //   $('.cls-inner-adv').addClass('cls-close-ani');
  //   $('#fn-background').removeClass('cls-resp-background');
  //   setTimeout(() => {
  //     this.closeForm(val);
  //   }, 400);
  // }
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
  /**
   * View Action
   * Au:venkat
   */
  public viewAction(rowIndex: number, tabIndex: number, value: any, event: Event) {
    let view;
    value.forEach((data: any) => {
      if (data.length) {
        view = data.filter((action: any) => action.action == 'view');
      }
    });
    // console.log(view);
    if (view && view.length != 0)
      this.viewReport(view[0].value, 'view', rowIndex, tabIndex, '', '', event);
  }
  public backTo() {
    this.backToBack = !this.backToBack;
    this.clickusertype(1, 'tab1', 0);
  }
}
