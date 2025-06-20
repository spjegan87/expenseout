import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
// import { AppService } from '../../../core-module/services/app.service';
declare var $: any;
/**
 * Author : PadmaPriya CK 
 * Desc :  settings
 */
@Component({
  selector: 'app-advancealert',
  templateUrl: './advancealert.component.html',
  styleUrls: ['./advancealert.component.scss']
})
export class AdvancealertComponent implements OnChanges {
  /**
 * get image path
 */
  @Input() public userInput: object = {};
  /**
   * advanceId
   */
  @Input() public advanceId: string = "";
  /**
   * output data
   */
  @Output() public choosedVal: EventEmitter<boolean> = new EventEmitter();
  /**
   * Advance content
   */
  public advanceContent: any;
  /**
   * amountadvance
   */
  // public amountadvance : number ;
  /**
  * Desc: on closing alert add class close design 
  */
  public toClose: boolean = false;
  /**
   * button flag
   */
  public confirmFlag: boolean = false;
  /**
   * Get Advance type to hide confirmation button
   */
  @Input() public type: boolean = false;
  /**
   * Desc : Get Approval Status boolean action from tab component
   */
  @Input() public approvalStatus: boolean = false;
  constructor() { }

  public ngOnChanges(): void {
    $('body').css("overflow", "hidden");
  }
  public closeModal(val: boolean): void {
    // console.log($('#reason').val());
    // if(this.userInput.reason){
    let dataVal: any;
    if (val && !this.approvalStatus) {
      $('#fn-background').removeClass('cls-background');
      $('body').css("overflow", "auto");
      dataVal = {
        flag: val,
        "moduleName": "advanceReport",
        "value": {
          "reportCode": this.advanceId
        },
        "actionName": "submitAdvanceReport"
      }
      setTimeout(() => {
        this.choosedVal.emit(dataVal);
      }, 400);
    }
    else if (val && this.approvalStatus) {
      $('#fn-background').removeClass('cls-background');
      $('body').css("overflow", "auto");
      dataVal = {
        flag: val,
        "moduleName": "advanceReport",
        "value": {
          // "reportCode": this.advanceId
        },
        "actionName": "submitAdvanceReport"
      }
      setTimeout(() => {
        this.choosedVal.emit(dataVal);
      }, 400);
    }
    else {
      this.toClose = true;
      // $('.cls-popup').addClass('close-ani');
      $('#fn-background').removeClass('cls-background');
      $('body').css("overflow", "auto");
      setTimeout(() => {
        this.choosedVal.emit(dataVal);
      }, 400);
    }
  }

}
