import { Component, OnInit,Input,Output,EventEmitter } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
declare var $ : any;
/**
 * Author: naveen
 * Desc: advance adjustment component
 */
@Component({
  selector: 'app-advance-adjustment',
  templateUrl: './advance-adjustment.component.html',
  styleUrls: ['./advance-adjustment.component.scss']
})
export class AdvanceAdjustmentComponent implements OnInit {
/**
 * close button flag
 */
public toClose :boolean = false;
/**
 * icon on off
 */
public iconOn : string = 'N';
/**
 * total amount
 */
public totalAmount : number = 0;
/**
 * report count
 */
public sampleCount : number = 0;
/**
 * Desc : output to close modal
 */
@Output() public closePopup : EventEmitter<boolean> = new EventEmitter();
/**
 * Input response data
 */
@Input() public tableData : any =[];
@Input() public ReportData : any = [];
  constructor(private appService: AppService) { }
  /**
   * ngOnInit
   */
  public ngOnInit() : void {
    $('body').css("overflow", "hidden");
    this.tableData.content.data.map((results:any)=>{
      // if(results[4].Amount != null){
        this.totalAmount = results[5].Amount;
      // }
      //  if(results[4].count != null){
        this.sampleCount = results[5].count;
      //  } 
    }); 
    this.checkboxValidate(this.sampleCount);
  }
/**
 * Close modal
 */
public closeModal(val:boolean) : void {
  this.toClose = true;
  $('body').css("overflow", "auto");
  // setTimeout(()=>{
    this.closePopup.emit(val);
  // },400);
}
/**
 * create advance
 */
public createAdvance(val:any,reportId:any){
  // console.log(val,reportId)
  let tempArray = [];
  this.tableData.content.data.map((results:any)=>{
    if(results[0].status === 'Y'){
      tempArray.push(results[0].value.advanceId);
    }
  }); 
  // console.log(tempArray);
  const formData = {
    "report_id": reportId,
    "advanceId":tempArray,
    "edit":true
  }
  // if(tempArray.length){
    this.appService.httpPost('advanceAdjustment', formData, 'advanceAdjustment','false').subscribe(() => {
      this.closeModal(val);
    });
  // }
}
/**
 * add Amount 
 */
public addAmount(val:any,index:number,dd:number){
  if(this.tableData.content.data[index][dd].status === 'N'){
    this.tableData.content.data[index][dd].status = 'Y';
    this.totalAmount = this.totalAmount + parseInt(val.Amount);
  }
  else{
    this.tableData.content.data[index][dd].status = 'N';
    this.totalAmount = this.totalAmount - parseInt(val.Amount);
  } 
  this.checkboxValidate(0);
}
/**
 * check checkbox
 */
public checkboxValidate(value:number): void{
  if(value === 0){
    this.sampleCount = value;
    this.tableData.content.data.map((results:any)=>{
      if(results[0].status === 'Y'){
        this.sampleCount = this.sampleCount + 1;
      }
    });
    if(this.sampleCount === this.tableData.content.data.length){
      this.iconOn = 'Y';
    }else if (this.sampleCount !== this.tableData.content.data.length){
      this.iconOn = 'N';
    }
  } else if(value !== 0) {
    if(value !== null ){
      if(this.sampleCount === this.tableData.content.data.length){
        this.iconOn = 'Y';
      }else if (this.sampleCount !== this.tableData.content.data.length){
        this.iconOn = 'N';
      }
    } else  if(value === null ){
        this.checkboxValidate(1);
        this.sampleCount = 0;
        this.totalAmount = 0;
    }

  }

}
/**
 * select all 
 */
public selectAll() : void {
  this.totalAmount = 0;
    if(this.iconOn == 'Y'){
      this.tableData.content.data.map((val:any)=>{
        val[0].status = 'N';
      })
      this.totalAmount = 0;
      this.iconOn = 'N';
    }
    else{
      this.tableData.content.data.map((val:any)=>{
        val[0].status = 'Y';
        this.totalAmount = this.totalAmount + parseInt(val[0].value.Amount );
      })
      this.iconOn = 'Y';
    }
    this.checkboxValidate(0);
}
}
