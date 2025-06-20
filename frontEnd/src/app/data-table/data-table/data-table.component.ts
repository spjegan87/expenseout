import { Component, Input, AfterViewInit } from '@angular/core';
import { AppService } from '../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../core-module/config/url'
declare var feather: any;
// declare function renderTable(tableId: string, headerLength: number): any;
declare var $ : any;
/**
 * Modified By: Padma Priya CK.
 * Module : Data table
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements AfterViewInit {
  /*
  * Recieve moduleName
  */
  @Input() public moduleName: string = '';
  /**
   * popupVal
   */
  public popupVal : any = {
    'flag' : false,
    'module' :'',
    'value' :{}
  };
  /*
  * Recieve actionName to render table
  */
  @Input() public actionName: string = '';
  /**
   * Title for table
   */
  @Input() public title: string = '';
  /**
   * upload
   */
  @Input() public upload: any ={} ;
  /**
   * upload flag
   */
  public uploadFlag: boolean = false;
  /*
  * Recieve dataset to render table
  */
  @Input() public filterData: any;
  /**
   * sortData
   */
  public sortData :any =[];
    /**
   * sortData
   */
  public fullResponse :any =[];
  /**
   * confirmation
   */
  public confirmation: boolean = false;
  /**
   * confirmationContent
   */
  public confirmationContent: any = {};
  /**
   * Desc: delete val
   */
  public requestData : any ={};
  /**
   * Emit form actions [ View | Edit | Delete ] 
   */
  // @Output() public actions: EventEmitter<object> = new EventEmitter<object>();
  public tableData: any = {};

  public pageLoaded: boolean = false;

  constructor(private appService: AppService, private router: Router) { }

  public ngAfterViewInit() : void {
    feather.replace();
    this.listService();
  }
  ngOnInit(){
    this.listService();
  }
  public ngOnChanges() : void {
    this.pageLoaded = false;
    this.listService();
  }
  /**
   * bulkUpload
   */
  public bulkUpload() : void {
    this.uploadFlag = !this.uploadFlag;
  }
  /**
 * popUpInfo
 */
public popUpInfo(_val: any) : void {
  this.popupVal = {
    'flag' : false,
    'module' : '',
    'value' :{}
  }
}
/**
 * showPopUp
 */
public showPopUp(val : any) : void {
  this.popupVal = {
    'flag' : true,
    'module' : val['module'],
    'value' : val
  }
}
  /**
   * closeUpload
   */
  public closeUpload(flag: boolean) : void {
    this.uploadFlag = false;
    if(flag === true){
      this.listService();
    }
  }
  /**
   * sorting
   */
  public sorting() : void {
    let keyIndex : any ;
    if($('#sortBy').val() !== 'Sort By'){
      this.tableData.data = [];
      this.sortData =[];
      this.sortData = JSON.parse(JSON.stringify(this.fullResponse.data));
      this.tableData.headers.map((data: any,index : number)=>{
      if(($('#sortBy').val().toLowerCase()) === (data.toLowerCase())){
          keyIndex = index;
        }
      })
      if($('#sortBy').val() !== 'Status'){
        this.sortData = this.sortData.sort((a, b) => {
          if (a[keyIndex].value.toLowerCase() < b[keyIndex].value.toLowerCase()) return -1;
          if (a[keyIndex].value.toLowerCase() > b[keyIndex].value.toLowerCase()) return 1;
        return true;
      });
      } else{
        this.sortData = this.sortData.sort((a, b) => {
            if (a[keyIndex].value.status.toLowerCase() < b[keyIndex].value.status.toLowerCase()) return -1;
            if (a[keyIndex].value.status.toLowerCase() > b[keyIndex].value.status.toLowerCase()) return 1;
          return true;
        });
      }
      this.tableData.data = this.sortData;
    } else{
      this.tableData.data= this.fullResponse.data;
    }
    if ($.fn.DataTable.isDataTable('#data-table')) {
      $('#data-table').DataTable().destroy();
     }
     setTimeout(() => {
      $('#data-table').DataTable({
        'order': [],
        "bSort" : false,
        "oSearch": {"bSmart": false},
        'language':{
          'searchPlaceholder' : 'Search Records'
        }
      });
  });
  }
  /**
   * function call for service
   */
  public listService() : void {
    if ($.fn.DataTable.isDataTable('#data-table')) {
      
      // $('#data-table').DataTable();
      $.fn.dataTableExt.sErrMode = 'throw';
      // $('#data-table').DataTable().destroy();
     }
    this.appService.httpPost(this.moduleName, {filters : this.filterData}, this.actionName,'false').subscribe((data) => {
      // console.log(data);
      this.tableData = data.content;
      this.fullResponse = JSON.parse(JSON.stringify(data.content));
      this.pageLoaded = true;
        setTimeout(() => {
          $('#data-table').DataTable({
            'order': [],
            "bSort" : false,
            "oSearch": {"bSmart": false},
            paging: false,
            searching: false,
            retrieve:true,
            destroy: true,
            // "scrollX": true,
            'language':{
              'searchPlaceholder' : 'Search Records'
            }
          });
          // setTimeout(() => {
            $('input').attr("onpaste","return false");
          // }, 10);
      });
    });
  }
  /**
   * confirmAction
   */
  public confirmAction( val : any) : void {
    this.confirmation = false;
    this.confirmationContent = {};    
    if(val.flag === true){
      if(this.requestData['action'] === 'updateUserStatus'){
        if(this.requestData['value']['status'] === 'Y'){
        this.requestData['value']['status'] = 'N';
        } else {
          this.requestData['value']['status'] = 'Y';
        }
      }
      this.appService.httpPost(this.moduleName, this.requestData['value'], this.requestData['action'],'false',true).subscribe(() => {
        this.listService();
      });     
    }
  }
  /**
   * expand
   */
  public changeDetail(id : string) : void {
    $('#hide'+id).toggleClass('cls-hide');
    $('.row'+id).toggleClass('shown');
  }
  
  /**
   * actionPerform
   */
  public actionPerform(val : any = {},action:string ='') : void {
    this.requestData['value'] = val;
    this.requestData['action'] = action;
    switch(action) {
      case 'editUserDetails':
        this.router.navigate( [
          './' +
          urlConfig.ROUTES.home +
          '/' +
          urlConfig.ROUTES.myProfile
        ],
          {
            state : { 
              type:"edituserprofile",
              userId :val['userId']
              }
          });
      break;
      case 'deleteUserDetails':
        this.confirmationContent = {
          title :'Are you sure want to delete ?',
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
      break;
      case 'updateUserStatus':
        this.confirmationContent = {
          title :'Are you sure want to change status ?',
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
      break;
    }    
  }
}