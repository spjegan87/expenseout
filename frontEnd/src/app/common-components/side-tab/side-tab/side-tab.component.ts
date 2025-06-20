import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-side-tab',
  templateUrl: './side-tab.component.html',
  styleUrls: ['./side-tab.component.scss']
})
export class SideTabComponent implements OnChanges {

  constructor() { }
  /**
   * Get Side Tab data
   */
  @Input() public tabData: Array<any> = [];
  /**
   * Send active clicked index 
   */
  @Output() public emitTab = new EventEmitter();
  /**
   * To tab active when click next button
   */
  @Input() public tabValue: number = 0;
  /**
   * Get Profile Type
   */
  @Input() public profileType: string = "";
  /**
   * Clicked index
   */
  public clickedIndex: number = 0;
  /**
   * Tab change status
   */
  public status: boolean = false;
  /**
   * Get tab type based on multiple list show
   */
  @Input() public type: string = '';

  /**
   * Onchanges
   */

  ngOnChanges() {
    console.log(this.profileType,this.type,this.tabData,"type")
    this.status = true;
    this.emitTab.emit(0);  //First tab active initially

    //Tab active next button click while other tabs disable class add
    this.masterDataCall(this.tabValue);  //Click next button to tab active
    this.clickedIndex == 0 ? $("#menu" + (this.clickedIndex + 1)).removeClass('enable') : $("#menu" + (this.clickedIndex - 1)).addClass('enable');
  }

  /**
   * Do check
   */
  ngDoCheck() {
    if (this.status) {
      this.status = false;
      this.masterDataCall(this.tabValue);
    }
  }

  /**
   * Desc : Send clicked index
   * @param index 
   */
  public masterDataCall(index: number, data: object = {}): void {
    // console.log(index,value,"click")
    this.clickedIndex = index;
    let request = {
      "index": this.clickedIndex,
      "value": data
    };
    // this.emitTab.emit(request);   //Emits index to parent
    // console.log(data,request);                                                                                                                                                                                                                                                                                                                                                                                                 
    (this.type == 'multiple') ? this.emitTab.emit(request) : this.emitTab.emit(this.clickedIndex);   //Emits index to parent


    // let tabActive = action;
    // let activeIndex:number = i;
    // console.log(this.tabData,action,this.activeIndex);
    // this.masterDataVal.datai0] = [];
    // this.tabData[i]['dataVal']['data'] = [];
    // let fullResponse = i;
    // if ($.fn.DataTable.isDataTable('#'+action)) {
    //   //console.log("123");
    //     $('#'+action).DataTable().destroy();
    //     console.log(tabActive,activeIndex,fullResponse)
    // }    
    //console.log(this.masterDataVal,"dsds");
    // this.appService.httpPost('profileMasterData', { "corporateId":config.CORPORATE_ID}, action,'false').subscribe((data) => {
    //   this.masterDataVal = data.content;
    //   // console.log(data.content,"priya");
    //   this.tabData[i]['dataVal']['data'] = data.content['data'];
    //   this.tabData[i]['dataVal']['headers'] = data.content['headers'];
    //   this.fullResponse[i] = JSON.parse(JSON.stringify(data.content));
    //   hideLoader();
    //   //console.log('#'+action);
    //   setTimeout(() => {
    //   // let table : any;
    //     if ( $.fn.dataTable.isDataTable('#'+action) ) {
    //      $('#'+action).DataTable();
    //   }
    //   else {
    //        $('#'+action).DataTable( {
    //         "order": [],
    //         "bSort" : false,
    //         // "scrollX": true,
    //         "language":{
    //         "searchPlaceholder" : "Search Records"
    //       }
    //       } );
    //   }
    //   //console.log(table)
    // },1);
    // });
  }
}
