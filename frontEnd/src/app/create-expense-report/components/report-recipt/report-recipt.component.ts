import { Component, OnInit,Input, Output,EventEmitter } from '@angular/core';
declare var $ : any;
/**
 * Author: naveen
 * Powered by : Infiniti software solutions
 * Desc: report receipt
 */
@Component({
  selector: 'app-report-recipt',
  templateUrl: './report-recipt.component.html',
  styleUrls: ['./report-recipt.component.scss']
})
export class ReportReciptComponent implements OnInit {
/**
 * close button flag
 */
public toClose :boolean = false;
/**
 * image array
 */
public reciptData : any = [];
/**
 * category type from reort page
 */
public categoryVal : any;
/**
 * category id from reort page
 */
public categoryId : any;
/**
 * unselect checked status N stored array
 */
public unSelectRecipt : any = [];
/**
 * get image path
 */
@Input() public reportReciptList :any = [];
/**
 * output data 
 */
@Output() public closePopup: EventEmitter<any> = new EventEmitter();
/**
 * recipt type
 */
public reciptType : string;
/**
 * ngOnInit
 */
  public ngOnInit() : void {
    $('body').css("overflow", "hidden");
    this.categoryVal = this.reportReciptList.catVal;
    this.categoryId = this.reportReciptList.id;
    this.reciptType = this.reportReciptList.type
  }
  /**
   * select checkbox function
   */
  public selectCheckBox(index:number){
    if(this.reportReciptList.data.unExpensedReceipts[index].checked === 'N'){
      this.reportReciptList.data.unExpensedReceipts[index].checked  = 'Y';
    }
    else{
      this.reportReciptList.data.unExpensedReceipts[index].checked  = 'N';
    } 
  }
  /**
   * select SavedCheckBox function
   */
  public selectSavedCheckBox(index:number){
    if(this.reportReciptList.data.mappedReceipts[index].checked === 'N'){
      this.reportReciptList.data.mappedReceipts[index].checked  = 'Y';
    }
    else{
      this.reportReciptList.data.mappedReceipts[index].checked  = 'N';
    } 
  }
  /**
   * Close modal
   */
  public closeModal(val:boolean) : void {
    $('body').css("overflow", "auto");
    this.toClose = true;
    // setTimeout(()=>{
      this.closePopup.emit(val);
    // },750);
  }
  /**
   * confirm recipt
   */
  public createRecipt(action:string){
    if(action === 'unsaved'){
      this.reportReciptList.data.unExpensedReceipts.map((data,index)=>{
        if(data.checked === 'Y'){
          let objVal = {
            receiptId: this.reportReciptList.data.unExpensedReceipts[index].receipt_id,
            path: this.reportReciptList.data.unExpensedReceipts[index].receipt_path,
            name: this.reportReciptList.data.unExpensedReceipts[index].receipt_name,
            type: this.reportReciptList.data.unExpensedReceipts[index].receipt_type,
          };
          this.reciptData.push(objVal);
        }
        else if(data.checked === 'N'){
          let objVal = {
            receiptId: this.reportReciptList.data.unExpensedReceipts[index].receipt_id,
            path: this.reportReciptList.data.unExpensedReceipts[index].receipt_path,
            name: this.reportReciptList.data.unExpensedReceipts[index].receipt_name,
            type: this.reportReciptList.data.unExpensedReceipts[index].receipt_type,
          };
          this.unSelectRecipt.push(objVal);
        }
        // console.log(data.checked);
      });
      // setTimeout(()=>{
        this.closePopup.emit({form :this.reciptData, unselectArr :this.unSelectRecipt, catVal : this.categoryVal,id : this.categoryId, type: 'unsaved'});
        this.reciptData = [];
      // },750);
    }
    else if(action === 'saved'){
      this.reportReciptList.data.mappedReceipts.map((data)=>{
        if(data.checked === 'Y'){
          this.reciptData.push(data);
        }
      });
      // setTimeout(()=>{
        this.closePopup.emit({form :this.reciptData, type: 'saved'});
      // },750);
    }
  }
}
