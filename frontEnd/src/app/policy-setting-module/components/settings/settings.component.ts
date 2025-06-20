import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
import { Router } from '@angular/router';
import { urlConfig } from '../../../core-module/config/url';
import { ListIndexComponent } from 'src/app/common-list/list-index/list-index.component';
declare var feather: any;
declare var $: any;
/**
 * Author : PadmaPriya CK 
 * Desc :  settings
 */
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, AfterViewInit {
  /**
   * Desc : settingsresponse
   */
  public listResponseCategory: any = {};
  /**
   * Desc : settingsresponse
   */
  public listResponsePolicy: any = {};
  /**
   * Desc: editcategoryVal
   */
  public editcategoryVal: any = {};
  /**
   * Desc: editcategoryVal
   */
  public editPolicyVal: any = {};
  /**
   * confirmation
   */
  public confirmation: boolean = false;
  /**
   * confirmationContent
   */
  public confirmationContent: any = {};
  /**
   * Desc  status
   */
  public statusList: any = {};
  /**
   * Desc: fullResponse
   */
  public fullResponse: any = [];
  /**
   * Desc: sortData
   */
  public sortData: any = [];
  /**
   * Policy group ,allowance
   */
  public settingsList: any = {
    profilegroup: false,
    budget:false,
    allowance: false,
    city: false
  };
  public tabValue: string = '';
  /**
   * create new data 
   */
  public createNew: boolean = false;
  /**
   * Send list module & action to list componet to create / edit list data 
   */
  public ListActionUpdate: object = {};
  /**
   * constructor
   */
  constructor(private appService: AppService, private router: Router) { }
  /**
   * Desc: setting create policy
   */
  public createPolicy: boolean = false;
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * Policygroup ,allowance data
   */
  public editResponseData: any = {
    "category": {
      "type": "new",
      "value": {}
    },
    "profileGroup": {
      "type": "new",
      "value": {}
    },
    "policy": {
      "type": "new",
      "value": {}
    },
    "allowance": {
      "type": "new",
      "value": {}
    },
    "city": {
      "type": "new",
      "value": {}
    },
    "budget": {
      "type": "new",
      "value": {}
    }
  }
  public editResponse: object = {};
  /**
   * Side tab data
   */
  public tabData: Array<any> = [];
  /**
   * type
   */
  public type: string = 'create';
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
   * loader for list data
   */
  public loader: boolean = false;
  @ViewChild(ListIndexComponent) public createStatus: any;

  public ngAfterViewInit(): void {
    feather.replace();
  }
  /**
   * desc : ngonit
   */
  public async ngOnInit() {
    this.userCurrency = config.USER_CURRENCY;
    let data = await this.appService.httpPost('CommonSetting', { 'tab': 'Settings' }, 'getsideTabStructure').toPromise();
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
    // this.createStatus.listUpdate = (this.createStatus && this.createStatus != undefined) ? this.tabData[0] :  undefined;
    // this.emitTabResponse.emit(this.tabData);
  }
  /**
* Desc : Side tab status active when click get index from side tab component & list data loading tab based
* @param data 
*/
  public tabEvent(data: object) {
    this.clickedIndex = data['index'];
    // this.listModule = {
    //   "moduleName": "settingsListGroup",
    //   "actionName": "getListDetails"
    // };
    if (JSON.stringify(data['value']) != JSON.stringify({}) && data['value'] != undefined) {
      console.log(data['value'],this.createStatus,"val");
      this.ListActionUpdate = data['value'];
      this.tabValue = data['value']['id'];
      console.log(this.createStatus.listUpdate);
      this.loader = true;
      this.appService.httpPost(this.listModule['moduleName'], { 'corporateId': config.CORPORATE_ID, 'tab': this.tabValue }, this.listModule['actionName']).subscribe((data: any) => {
        this.loader = false;
        this.listData = data.content;
      });
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
   * addNew
   */
  public addNew(name: string, tableId: string, module: string, action: string): void {
    console.log(name, tableId, module, action, this.tabData);
    //console.log(name);
    // this.editcategoryVal = {};
    // this.editPolicyVal = {};
    // switch (name) {
    //   case 'category':
    //     this.createNew = true;
    //     break;
    //   case 'policy':
    //     this.createPolicy = true;
    //     this.type = 'create';
    //     $('#' + tableId).DataTable().destroy();
    //     break;
    //   case 'profileGroupId':
    //     //console.log("Sds")
    //     this.settingsList.profilegroup = true;
    //     this.editResponse['profileGroup']['type'] = 'new';
    //     //console.log(this.settingsList);
    //     $('#' + tableId).DataTable().destroy();
    //     break;
    //   case 'allowance':
    //     this.settingsList.allowance = true;
    //     this.editResponse['allowance']['type'] = 'new';
    //     $('#' + tableId).DataTable().destroy();
    //     break;
    //   case 'city':
    //     this.settingsList.city = true;
    //     this.editResponse['city']['type'] = 'new';
    //     $('#' + tableId).DataTable().destroy();
    //     break;
    //   default:
    //     //console.log("default");
    //     break;
    // }
    // this.createNew = {
    //   status : true,
    //   id:name
    // }
    (this.createStatus && this.createStatus != undefined) ? this.createStatus.createNew = true : this.createStatus.createNew = false;

  }
  /**
   * changeStatus
   */
  public changeStatus(val: any, action: string, i: number): void {
    // if(e.target.checked){
    this.statusList = {
      value: val,
      actionName: action,
      tableId: this.tabData[i].tableId,
      moduleName: this.tabData[i].moduleName,
      csrf: this.tabData[i]?.csrf
    };
    //console.log(this.statusList);
    // }
    this.confirmation = true;
    this.confirmationContent = {
      title: 'Are you sure want to change status?',
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
   * expand
   */
  public changeDetail(id: string): void {
    $('#hide' + id).toggleClass('cls-hide');
    $('.row' + id).toggleClass('shown');
  }
  /**
   * closePolicyForm
   */
  public closePolicyForm(val: boolean): void {
    this.createPolicy = val;
  }
  /**
   * confirmAction
   */
  public confirmAction(val: any): void {
    let formData: any = {};
    //console.log(this.statusList,"statu");
    if (this.statusList.actionName === 'updateCategoryStatus' || this.statusList.actionName === 'deleteCategoryDetails') {
      formData = {
        categoryId: this.statusList.value.category_id
      };
    }
    switch (this.statusList.actionName) {
      case 'updatePolicyStatus':
        formData = {
          policyId: this.statusList.value.policyId
        };
        break;
      case 'changeProfileGroupStatus':
        formData = {
          profileGroupId: this.statusList.value.profileGroupId
        };
        break;
      case 'changeAllowanceStatus':
        formData = {
          allowanceMasterId: this.statusList.value.allowanceMasterId
        };
        break;
      case 'changeCityGroupStatus':
        formData = {
          cityGroupId: this.statusList.value.cityGroupId
        };
        break;
      case 'deleteCityGroup':
        formData = {
          cityGroupId: this.statusList.value.cityGroupId
        };
        break;
      default:
        break;
    }
    formData['corporateId'] = this.statusList.value['corporateId'];
    // tslint:disable-next-line:max-line-length
    if (this.statusList.actionName === 'updateCategoryStatus' || this.statusList.actionName === 'changeCityGroupStatus' || this.statusList.actionName === 'changeAllowanceStatus' || this.statusList.actionName === 'updatePolicyStatus' || this.statusList.actionName === 'changeProfileGroupStatus') {
      if (this.statusList.value.Status === '1') {
        formData.status = 'N';
      } else {
        formData.status = 'Y';
      }
    }
    //console.log(formData);
    this.confirmation = false;
    this.confirmationContent = {};
    if (val.flag === true) {
      this.appService.httpPost(this.statusList.moduleName, formData, this.statusList.actionName, 'false', this.statusList?.csrf).subscribe(() => {
        // this.appService.httpPost('profileMasterData', { "corporateId": config.CORPORATE_ID }, action, 'false').subscribe((data) => {
        //   this.masterDataVal = data.content;

        //console.log(this.statusList.tableId,data);
        // if(this.statusList.tableId ===  'policysettings'){
        //   this.listService(this.statusList.tableId,1);
        // } else{
        //   this.listService(this.statusList.tableId,0);
        // }
        // switch (this.statusList.tableId) {
        //   case 'policysettings':
        //     this.listService(this.statusList.tableId, 2);
        //     break;
        //   case 'catsettings':
        //     this.listService(this.statusList.tableId, 0);
        //     break;
        //   case 'profileGroupTable':
        //     this.listService(this.statusList.tableId, 1);
        //     break;
        //   case 'allowanceTable':
        //     this.listService(this.statusList.tableId, 3);
        //     break;
        //   case 'cityTable':
        //     this.listService(this.statusList.tableId, 4);
        //     break;
        //   default:
        //     break;
        // }
      });
    }
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
