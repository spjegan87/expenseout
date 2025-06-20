import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';
import { config } from 'src/app/core-module/config/app';
import { AppService } from 'src/app/core-module/services/app.service';
declare var feather: any;

@Component({
  selector: 'app-list-index',
  templateUrl: './list-index.component.html',
  styleUrls: ['./list-index.component.scss']
})
/**
 * Name : Meenakshi Sundaram R
 * Date : 25-06-2021
 * Desc : List Index Component
 */
export class ListIndexComponent implements OnChanges {
  /**
   * List data set initially current page no 
   */
  public currentPage: number = 1;
  /**
   * List Pagination  boolean
   */
  public pagination: boolean = true;
  /**
   * Side tab Data
   */
  @Input() public tabData: Array<any> = [];
  /**
   * Get Edit response data from list component (Settings,master data module)
   */
  public editResponseData: object = {};
  /**
   * Category wise back action boolean get from tab component
   */
  @Input() public backAction: boolean = false;
  request: object = {};
  uploadFlag: boolean;

  constructor(private appService: AppService, private deviceService: DeviceDetectorService) { }
  /** 
   * List table Category data
   */
  public categoryData: Array<any> = [];
  /**
   * List data
   */
  @Input() public listData: any = {};
  /**
   * Get List data
   */
  public list: any = {};
  /**
   * Get Selected Tab Index
   */
  @Input() public tabIndex: number = 0;
  /**
   * Show Per page item in listdata
   */
  public perPageItem: number = 0;
  /**
   * Get list module
   */
  @Input() public listModule: object = {};
  /**
   * Loader
   */
  public loader: boolean = false;

  @Input() public tabValue: string = '';
  /**
   * Create popup show / hide while create action boolean variable (Settings module)
   */
  public createNew: boolean = false;
  /**
   * Desc:Get master data modulename
   */
  @Input() public masterModule: string = '';
  /**
   * Edit popup show / hide while edit action boolean variable (Settings module)
   */
  public editStatus: boolean = false;
  /**
   * Get List status from paent component to update list from create / edit action
   */
  @Input() public listUpdate: any;
  /**
   * Send category userbased details to Tab component
   */
  @Output() public emitCategory = new EventEmitter();
  /**
   * Get userbased status in tab component
   */
  @Input() public userBased: boolean = false;
  /** 
* Tab data count reload
*  */
  @Output() public tabStatusEvent = new EventEmitter();
  /**
   * Send form status to Tab component
   */
  @Output() public advanceRequestForm = new EventEmitter();
  /**
   * Category based user status
   */
  public userStatus: boolean = false;
  /**
   * Desc : Employee wise user based list action top nav bar count update
   */
  @Output() public userBasedCount = new EventEmitter();
  /**
   * Desc : Category wise back action event send to tab component
   */
  @Output() public backEvent = new EventEmitter();
  /**
   * User list request send to tab component
   */
  @Output() public userBasedListRequest = new EventEmitter();
  /**
   * Chekc mobile / tab / desktop view
   */
  public deviceInfo: any;
  /**
   * Mobile / Tab view boolean variable
   */
  public deviceFlag: boolean = false;
  /**
   * Upload details send to bulk-upload component
   */
  @Input() public upload: object = {};
  /**
   * Desc : Get Filter data value from User management module
   */
  @Input() public filterValue: object = {};
  /**
   * Desc : Get Filter module & action  
   */
  @Input() public filterData: object = {};
  /**
   * type
   */
  public type : any = '';
  /**
   * ngOnChanges
   */
  ngOnChanges() {
    this.loadData(this.listData);
    this.deviceInformation();
    // console.log(this.tabResponse, this.tabData, this.tabIndex, this.listData,"tab");
    // console.log(this.editStatus, config.USER_ID, this.createNew, this.tabValue, this.tabData, this.masterModule, this.listModule, this.listUpdate, "check");
    // console.log(this.listData,this.userBased,this.userStatus,"check");
    console.log(this.filterData, this.filterValue,  this.listData,"up");
    // console.log(this.filterData && this.filterValue && this.filterValue != undefined);
    // (this.filterData && this.filterValue && this.filterValue != undefined) ? this.getFilterAction() : undefined;
  }

  /**
   * AfterviewInit
   */
  public ngAfterViewInit(): void {
    feather.replace();
    // console.log(this.filterData && this.filterValue && this.filterValue != undefined);
    // (this.filterData && this.filterValue && this.filterValue != undefined) ? this.getFilterAction() : undefined;
  }
  /**
 * addNew
 */
  public addNew(module: string, action: string, id: string, listUpdateAction: string, label: string, i: number): void {
    this.createNew = true;
    console.log(action, id, listUpdateAction, label, i);
    console.log(this.listUpdate, "ls");
    console.log(this.list, this.tabValue,)
    this.tabValue = id;
    this.editResponseData = {
      'moduleName': module,
      'actionName': action,
      'type': id,
      'listUpdateAction': listUpdateAction,
      'actionType': 'new',
      'label': label,
      'index': i,
      'csrf': true
    };
  }
  public getEditResponse(data: object) {
    console.log(data);
    this.editStatus = data['status'];
    this.editResponseData = data['data'];
    this.editResponseData['type'] = data['type'];
    if (this.masterModule == 'profileMasterData') {
      // this.tabValue = data['type'];
      this.editStatus = data['status'];
      this.editResponseData['actionType'] = 'edit';
      this.editResponseData['moduleName'] = this.listUpdate['moduleName'];
      this.editResponseData['actionName'] = 'update' + this.listUpdate['name'];
      this.editResponseData['listUpdateAction'] = this.listUpdate['actionName'];
    };
    console.log(this.editResponseData);

    // this.createNew = false;
  }
  /**
   * Desc : Item to be selected in select box
   * @param item 
   */
  public selectedItem(item: number) {
    console.log(item, "it");
    this.perPageItem = item;
    let passData: any = this.list;
    // console.log(passData);  
    passData['default_Parms']['itemsPerPage'] = item;
    this.loadPage();
  }

  /**
   * Desc : Get current page value
   * @param page 
   */
  public getCurrentPage(page: number) {
    page = + page;
    let passData: any = this.list;
    passData['currentPage'] = page;
    passData['default_Parms']['page'] = page;
    this.selectedItem(passData['default_Parms']['itemsPerPage']);
  }

  /**
   * Desc : List data & pagination load initially using common service call 
   * @param data 
   */
  public loadData(data: any = this.list) {
    if (JSON.stringify(data) != JSON.stringify({}) && data != undefined) {
      // this.list = JSON.parse(JSON.stringify(data));
      let pagination = data['default_Parms']['itemsPerPage'] == 0 ? false : true;
      data?.list_body?.map((element: any, i: number) => Object.assign(element, element.id = i));
      this.list = this.appService.listService(JSON.parse(JSON.stringify(data)), pagination);
      console.log(this.list);
    }
  }
  /**
   * Load page list data get from backend to use service call
   */
  public loadPage() {
    // console.log(this.request, this.backAction, "req")
    let offset =0;
    // console.log((this.list['totalListItems'] ) / this.perPageItem,'pipe');
    if(((this.list['totalListItems']) / this.perPageItem) < this.list['totalListItems'] && ((this.list['currentPage'] - 1) * this.perPageItem)<=(this.list['totalListItems'])){
      offset=((this.list['currentPage'] - 1) * this.perPageItem)
    }
    let request = {
      "limit": this.perPageItem,
      "offset": offset,
      "noofPages": this.list['noofPages'],
      "currentPage": this.list['currentPage'],
      "corporateId": config.CORPORATE_ID,
      "filters":this.filterValue
    }
    if (this.list['category']) {
      request['userBased'] = this.userStatus;
    }
    if (this.backAction) {
      request['userId'] = this.request['value']['userId'],
        request['type'] = this.request['value']['type'],
        delete request['userBased'];
    }
    else {
      delete request['userBased'];
      delete request['userId'];
      delete request['type']
    }

    request['tab'] = (this.listUpdate['id']) ? this.listUpdate['id'] : "";
    console.log('loki');

    // request['id'] = (this.listModule && this.listModule != undefined && this.listModule['tabId']) ? this.listModule['tabId'] : "";
    console.log(request, this.list, this.userStatus, "status");
    this.loader = true;
      this.appService.httpPost(this.listModule['moduleName'], request, this.listModule['actionName']).subscribe((data: any) => {
      console.log(data);
      this.loader = false;
      this.loadData(data.content);
    })
  }
  public backtoList(val: boolean) {
    console.log(val);
    this.editStatus = val;
    this.createNew = val;
    this.editResponseData = {};
  }

  /**
   * Desc : To search list data
   * @param searchList 
   */
  public searchData(searchList: any) {
    this.list['list_body'] = (searchList.status) ? this.listData['list_body'] : searchList.value;
    this.loadData();
    // console.log(this.list);
  }

  /**
   * Desc : Sort List data
   * @param sortValue 
   */
  public sortData(sortValue: any) {
    this.list['list_body'] = sortValue;
    this.loadData();
  }
  /**
   * Get list action status in create / edit list data
   */
  public getlistActionStatus(_data: any) {
    console.log(_data);
    console.log(this.listUpdate, "ls");
    let formData: any;
    if (this.listUpdate && this.listUpdate != undefined) {
      // formRequest = (this.listUpdate && this.listUpdate['id']) ? 'tab' : 'corporateId';
      // formData = (this.listUpdate && this.listUpdate['id']) ? this.listUpdate['id'] : config.CORPORATE_ID;
      formData = {'tab':this.listUpdate['id'],'corporateId':config.CORPORATE_ID}
      console.log(formData)
      // if (data['status'] == 'success') {
        this.createNew = false;
        this.editStatus = false;
        // this.tabStatusEvent.emit(data);
        this.loader = true;
        console.log(this.listUpdate['moduleName'], formData , this.listUpdate['actionName']);
        this.appService.httpPost(this.listUpdate['moduleName'], formData , this.listUpdate['actionName']).subscribe((data: any) => {
          console.log(data);
          
          this.loader = false;
          this.editResponseData = {};
          this.type = '';
          this.loadData(data.content);
        })
      // }
    }
  }
  public getFormValue(data: any) {
    console.log(data)
  }
  public advanceRequest(data: object) {
    // console.log(data, "adv")
    this.advanceRequestForm.emit(data);
  }
  /**
 * selectCategory
 */
  public selectCategory(category: object) {
    console.log(category, category['userBased'], category && JSON.stringify(category) != JSON.stringify({}) && category['userBased']);
    this.emitCategory.emit(category['userBased']);
    this.userStatus = category['userBased'];
  }
  public getUserBasedListAction(requestData: object) {
    console.log(this.backAction);
    this.request = requestData;
    // this.backAction = true;
    // this.userBasedCount.emit({"status":true});
    // this.loader = true;
    // this.appService.httpPost(requestData['module'], requestData['value'], requestData['action']).subscribe((data: any) => {
    //   console.log(data, "emit1");
    //   this.loader = false;
    this.userBasedListRequest.emit(requestData);
    //  this.loadData(data.content);
    // });
  }
  public loadTabEvent(data: any) {
    console.log(data)
  }
  public getBackAction(status: boolean) {
    console.log(status, "1");
    this.backEvent.emit(status['status']);
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
   * Desc : User management bulkUpload
   */
  public userbulkUpload(): void {
    this.uploadFlag = !this.uploadFlag;
  }
  /**
   * Desc:Master data bulk upload
   * @param id 
   */
  public masterDatabulkUpload(id: string): void {
    const data :any = {
      'download' : {
        'module' : 'masterDataBulkUpload',
        'action' : 'downloadSampleMasterDataFile',
      },
      'moduleName' : 'masterDataBulkUpload',
      'actionName' : 'uploadMasterData',
      'inputName' : 'masterData',
      'tabName' : id
    }
    this.upload = data;
    this.uploadFlag = !this.uploadFlag;
  }
  /**
   * bulk upload
   */
  public bulkUpload(id: string) {
    (this.masterModule == 'profileMasterData') ? this.masterDatabulkUpload(id) : this.userbulkUpload();
  }
  /**
  * closeUpload
  */
  public closeUpload(_flag: boolean): void {
    this.uploadFlag = false;
    if(_flag === true){
      this.loadPage();
    }
  }
  /**
   * Desc : Filter action 
   */
  public getFilterAction() {
    // this.appService.httpPost(this.filterData['module_name'], { 'filters': this.filterValue }, this.filterData['action_name']).subscribe((data: any) => {
    //   console.log(data, "filter");
    // });
  }
  /**
   * 
   */
  public getActionType(data:any){
    console.log(data);
    this.type = data;
  }
}
