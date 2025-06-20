import { AfterViewInit, Component, OnInit } from '@angular/core';
import { urlConfig } from '../../../core-module/config/url';
import { Router } from '@angular/router';
import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
declare var $: any;
declare var feather: any;
declare function showLoader(): any;
declare function hideLoader(): any;
/**
 * Author: Padma Priya CK.
 * Module : master data
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-masterindex',
  templateUrl: './masterindex.component.html',
  styleUrls: ['./masterindex.component.scss']
})
export class MasterindexComponent implements OnInit, AfterViewInit {
  /**
   * Desc breadcrumb
   */
  public breadcrumb: any = [];
  /**
   * alert to create new
   */
  public createNew: boolean = false;
  /**
   * Desc: masterDataVal
   */
  public masterDataVal: any = [];
  /**
   * Desc: fullResponse
   */
  public fullResponse: any = [];
  /**
   * Desc: sortData
   */
  public sortData: any = [];
  /**
   * Desc: active tab
   */
  public tabActive: string = '';
  /**
   * Sample json for tab
   */
  public tabData: Array<any> = [];
  /**
  * confirmation
  */
  public confirmation: boolean = false;
  /**
  * confirmationContent
  */
  public confirmationContent: any = {};
  /**
   * type create 
   */
  public typeCreate: any = {};
  /**
   * upload
   */
  public uploadDetails: object = {};
  /**
   * upload flag
   */
  public uploadFlag: boolean = false;
  /**
   * Desc  status
   */
  public statusList: any = {};
  /**
   * active index
   */
  public activeIndex: number;
  /**
 * List data
 */
  public listData: any = {};
  /**
  * Clicked index in tab data
  */
  public clickedIndex: number = 0;
  /**
  * Tab type
  */
  public tabType: string = 'multiple';
  /**
   * List module & action send to list index component for pagination
   */
  public listModule: object = {};
  /**
   * Get Tab value
   */
  public tabValue: string = '';
  /**
   * Master data module name 
   */
  public masterModule: string = 'profileMasterData';
  /**
   * Send list module & action to list componet to create / edit list data 
   */
   public ListActionUpdate: object = {};
   /**
    *  Loader
    */
   public loader : boolean = false;

  constructor(private router: Router, private appService: AppService) { }
  public ngAfterViewInit(): void {
    feather.replace();
  }
  public async ngOnInit() {
    this.uploadDetails = {
      'uploadFlag': true,
      'actionName': 'uploadMasterData',
      'moduleName': 'masterDataBulkUpload',
      'masterType': '',
      'download': {
        'action': 'downloadSampleMasterDataFile',
        'module': 'masterDataBulkUpload'
      },
      'csrf': true
    }
    this.breadcrumb = [
      {
        name: 'Manage Profile',
        home: urlConfig.ROUTES.home,
        routerLink: urlConfig.ROUTES.manageprofile,
        active: 'N'
      },
      {
        name: 'Master Data',
        routerLink: '',
        active: 'Y'
      }
    ];
    // this.tabData = [
    //   {
    //     "name": "Designation",
    //     "moduleName":"profileMasterData",
    //     "actionName": "manageDesignationList",
    //     "id": "designation",
    //     "newcreate": "createDesignation",
    //     "title": "Add Designation Details",
    //     "datVal": [{
    //       "data": [],
    //       "headers": []
    //     }
    //     ]
    //   },
    //   {
    //     "name": "Department",
    //     "moduleName":"profileMasterData",
    //     "actionName": "manageDepartmentList",
    //     "id": "department",
    //     "newcreate": "createDepartment",
    //     "updateaction": "updateDepartment",
    //     "title": "Add Department Details",
    //     "datVal": [{
    //       "data": [],
    //       "headers": []
    //     }]
    //   },
    //   {
    //     "name": "Grade",
    //     "moduleName":"profileMasterData",
    //     "actionName": "manageGradeList",
    //     "id": "grade",
    //     "newcreate": "createGrade",
    //     "updateaction": "updateGrade",
    //     "title": "Add Grade Details",
    //     "datVal": [{
    //       "data": [],
    //       "headers": []
    //     }]
    //   },
    //   {
    //     "name": "Profit Center",
    //     "moduleName":"profileMasterData",
    //     "actionName": "manageProfitCenterList",
    //     "id": "profitCenter",
    //     "newcreate": "createProfitCenter",
    //     "updateaction": "updateProfitCenter",
    //     "title": "Add Profit Center Details",
    //     "datVal": [{
    //       "data": [],
    //       "headers": []
    //     }]
    //   },
    //   {
    //     "name": "Cost Center",
    //     "moduleName":"profileMasterData",
    //     "actionName": "manageCostCenterList",
    //     "id": "costCenter",
    //     "newcreate": "createCostCenter",
    //     "updateaction": "updateCostCenter",
    //     "title": "Add Cost Center Details",
    //     "datVal": [{
    //       "data": [],
    //       "headers": []
    //     }]
    //   },
    //   {
    //     "name": "Branch",
    //     "moduleName":"profileMasterData",
    //     "actionName": "manageBranchList",
    //     "id": "branch",
    //     "newcreate": "createBranch",
    //     "updateaction": "updateBranch",
    //     "title": "Add Branch Details",
    //     "datVal": [{
    //       "data": [],
    //       "headers": []
    //     }]
    //   }
    // ];
    let data = await this.appService.httpPost('CommonSetting', { "tab": "masterData" }, "getsideTabStructure").toPromise();
    this.tabData = data.content[0];
    this.listModule = this.tabData.length > 0 ? this.tabData.filter(data => data.format == 'action')[0] : undefined;
    console.log(this.listModule);
    this.tabData = this.tabData.filter(data => data.format != 'action');
    console.log(this.tabData, "data")
    this.tabValue = this.tabData[0].id;
    let val = {
      "index": 0,
      "value": this.tabData[0]
    };
    this.tabEvent(val);
  }
  /**
* Desc : Side tab status active when click get index from side tab component & list data loading tab based
* @param data 
*/
  public tabEvent(data: object) {
    console.log(data,data['value']);
    this.clickedIndex = data['index'];
    // this.listModule = {
    //   "moduleName": "profileMasterData",
    //   "actionName": "listDetails"
    // }
    // if (data['value'] && data['value'] != undefined) {
    if (JSON.stringify(data['value']) != JSON.stringify({}) && data['value'] != undefined) {
      this.ListActionUpdate = data['value'];
      this.tabValue = data['value']['id'];
      console.log(this.tabValue, "2");
      this.loader = true;
      this.appService.httpPost(this.listModule['moduleName'], { 'corporateId': config.CORPORATE_ID, 'tab': this.tabValue }, this.listModule['actionName']).subscribe((data: any) => {
         this.loader = false;
        this.listData = data.content;
      })
    }
  }
  /**
   * bulkUpload
   */
  public bulkUpload(id: string): void {
    this.uploadDetails['masterType'] = id;
    this.uploadFlag = !this.uploadFlag;
  }
  /**
 * closeUpload
 */
  public closeUpload(flag: boolean): void {
    this.uploadFlag = flag;
    //console.log("sadas",flag);
    // if(flag === true){
    //   this.masterDataCall('');
    // }
  }
  /**
 * sorting
 */
  // public sorting(i: number): void {
  //   let keyIndex: any;
  //   //console.log($('#sortBy'+i).val());
  //   this.masterDataVal.data[0] = [];
  //   this.tabData[i]['dataVal']['data'] = [];
  //   this.sortData = [];
  //   if ($('#sortBy' + i).val() !== 'Sort By') {
  //     this.sortData = JSON.parse(JSON.stringify(this.fullResponse[i].data[0]));
  //     //console.log($('#sortBy'+i).val(),this.masterDataVal,this.sortData);
  //     this.tabData[i].dataVal.headers.map((data: any, index: number) => {
  //       if (($('#sortBy' + i).val().toLowerCase()) === (data.toLowerCase())) {
  //         keyIndex = index;
  //       }
  //     })
  //     //console.log(keyIndex,"sdsd");
  //     if ($('#sortBy' + i).val() !== 'Status') {
  //       //console.log("if",this.sortData);
  //       this.sortData = this.sortData.sort((a, b) => {
  //         if (a[keyIndex].value.toLowerCase() < b[keyIndex].value.toLowerCase()) return -1;
  //         if (a[keyIndex].value.toLowerCase() > b[keyIndex].value.toLowerCase()) return 1;
  //         return true;
  //       });
  //     } else {
  //       //console.log("sasasas");
  //       this.sortData = this.sortData.sort((a, b) => {
  //         //console.log(a[keyIndex].value.Status,b[keyIndex].value.Status)
  //         if (a[keyIndex].value.Status.toLowerCase() < b[keyIndex].value.Status.toLowerCase()) return -1;
  //         if (a[keyIndex].value.Status.toLowerCase() > b[keyIndex].value.Status.toLowerCase()) return 1;
  //         return true;
  //       });
  //     }
  //     //console.log(this.sortData,"thissortData");
  //     setTimeout(() => {
  //       this.masterDataVal.data[0] = this.sortData;
  //       this.tabData[i]['dataVal']['data'] = this.sortData;
  //     }, 100)
  //     //console.log(this.masterDataVal.data[0],this.sortData.length,"sortData");
  //   } else {
  //     //console.log(this.fullResponse[i].data[0].length,"length");
  //     this.masterDataVal.data[0] = this.fullResponse[i].data[0];
  //     this.tabData[i]['dataVal']['data'] = this.fullResponse[i].data[0];
  //   }
  //   //console.log( this.tabActive);
  //   if ($.fn.DataTable.isDataTable('#' + this.tabActive)) {
  //     $('#' + this.tabActive).DataTable().destroy();
  //   }
  //   setTimeout(() => {
  //     $('#' + this.tabActive).DataTable({
  //       'order': [],
  //       "bSort": false,
  //       // "scrollX": true,
  //       'language': {
  //         'searchPlaceholder': 'Search Records'
  //       }
  //     });
  //   }, 100);
  // }
  // /**
  //  * Desc: masterData
  //  */
  // public masterDataCall(action: string, i: number = 0): void {
  //   // console.log(action)
  //   this.tabActive = action;
  //   this.activeIndex = i;
  //   // console.log(this.tabData,action,this.activeIndex);
  //   // this.masterDataVal.datai0] = [];
  //   this.tabData[i]['dataVal']['data'] = [];
  //   this.fullResponse[i] = [];
  //   if ($.fn.DataTable.isDataTable('#' + action)) {
  //     //console.log("123");
  //     $('#' + action).DataTable().destroy();
  //   }
  //   //console.log(this.masterDataVal,"dsds");
  //   this.appService.httpPost('profileMasterData', { "corporateId": config.CORPORATE_ID }, action, 'false').subscribe((data) => {
  //     this.masterDataVal = data.content;
  //     // console.log(data.content,"priya");
  //     this.tabData[i]['dataVal']['data'] = data.content['data'];
  //     this.tabData[i]['dataVal']['headers'] = data.content['headers'];
  //     this.fullResponse[i] = JSON.parse(JSON.stringify(data.content));
  //     hideLoader();
  //     //console.log('#'+action);
  //     setTimeout(() => {
  //       // let table : any;
  //       if ($.fn.dataTable.isDataTable('#' + action)) {
  //         $('#' + action).DataTable();
  //       }
  //       else {
  //         $('#' + action).DataTable({
  //           "order": [],
  //           "bSort": false,
  //           // "scrollX": true,
  //           "language": {
  //             "searchPlaceholder": "Search Records"
  //           }
  //         });
  //       }
  //       //console.log(table)
  //     }, 1);
  //   });
  // }
  /**
   * changeStatus
   */
  public changeStatus(val: string, id: string, action: string, listaction: string, index: number): void {
    // if(e.target.checked){
    this.statusList = {
      'value': val,
      'id': id,
      'action': action,
      'listaction': listaction,
      'index': index
    };
    // console.log(this.statusList,index)
    // }
    this.confirmation = true;
    this.confirmationContent = {
      title: "Are you sure want to change status?",
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
  }
  /**
   * confirmAction
   */
  public confirmAction(val: any): void {
    let formData = {
      "data_id": this.statusList['value']['data_id'],
      "corporateId": config.CORPORATE_ID,
      "userId": config.USER_ID
    }
    formData[this.statusList['id'] + 'Name'] = this.statusList['value']['Name'];
    formData[this.statusList['id'] + 'Code'] = this.statusList['value']['Code'];
    if (this.statusList['value']['Status'] === 'Y') {
      formData['status'] = 'N';
    } else {
      formData['status'] = 'Y';
    }
    //console.log(formData)
    this.confirmation = false;
    this.confirmationContent = {};
    if (val.flag === true) {
      // showLoader();
      console.log(formData, this.statusList['action'])
      this.appService.httpPost('profileMasterData', formData, this.statusList['action'], 'false').subscribe(() => {
        //  this.masterDataCall(this.statusList['listaction'],this.statusList['index']);
      });
    }
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
   * addNew
   */
  // public addNew(action: string, name: string, masterList: string, label: string, i: number): void {
  //   // console.log(action,name,masterList,label,i)
  //   this.createNew = true;
  //   this.typeCreate = {
  //     'actionName': action,
  //     'type': name,
  //     'masterCallList': masterList,
  //     'actionType': 'new',
  //     'label': label,
  //     'index': i,
  //     'csrf': true
  //   };
  //   console.log(this.typeCreate)
  // }
  // /**
  //  * viewReport
  //  */
  // public viewReport(action: string, name: string, masterList: string, label: string, data: any, actionType: string, i: number): void {
  //   // if (actionType === 'editMaster') {
  //   console.log(action, name, masterList, label, data, actionType, i);
  //   this.createNew = true;
  //   this.typeCreate = {
  //     'actionName': action,
  //     'type': name,
  //     'masterCallList': masterList,
  //     'actionType': 'edit',
  //     'label': label,
  //     'updateData': data,
  //     'index': i
  //   };
  //   console.log(this.typeCreate, "edit")
  //   // }
  // }
  /**
   * closeForm
   */
  public closeForm(val: any): void {
    // console.log(this.typeCreate);
    this.createNew = false;
    if (val.flag === true) {
      //  this.masterDataCall(this.typeCreate['masterCallList'],this.activeIndex);
    }
  }
  /**
  * triggerAction
  */
  public triggerAction(name: string): void {
    this.appService.triggerAction(name);
  }
}
