import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { DatepickerService } from '../../../core-module/services/datepicker.service';
import { AppService } from '../../../core-module/services/app.service';
declare var $ : any;
/**
 * Author: naveen
 * Powered by : Infiniti software solutions
 * Desc: manual reimbursement
 */
@Component({
  selector: 'app-manual-reimbursement',
  templateUrl: './manual-reimbursement.component.html',
  styleUrls: ['./manual-reimbursement.component.scss']
})
export class ManualReimbursementComponent implements OnInit {
/**
 * close button flag
 */
public toClose :boolean = false;
/**
 * historyInput
 */
@Input() public manualInput : any =[];
 /**
   * validation flag
   */
  public submitted : boolean = false;
    /**
   * confirmationContent
   */
  public confirmationContent : any ={};
    /**
   * confirmation
   */ 
  public confirmation : boolean = false;
/**
 * Desc : output to close modal
 */
@Output() public manualFormVal : EventEmitter<any> = new EventEmitter();
/**
 * field
 */
public field : any = [
  {
    'id' : 'cash',
    'value' : 'cash'
  },
  {
    'id' : 'online transfer',
    'value' : 'online transfer'
  }
]
  /**
   * DEsc : form group
  */
  public manualForm  : FormGroup = new FormGroup({
    radioAction: new FormControl('',Validators.required),
    receivedOn:new FormControl('',Validators.required),
    modeOfPayment :new FormControl(''),
    voucherNumber:new FormControl(''),
    remarks:new FormControl(''),
  });
  constructor(private _DatepickerService: DatepickerService,private appService: AppService) { }

  ngOnInit() {
    $('body').css("overflow", "hidden");
  }
    /**
   * Desc : chooseDate
   */
  public chooseDate(id:string) : void{
    this._DatepickerService.setCalendar(id,this.manualForm,id);
  }
/**
 * confirm action
 */
public confirmManual() : void {
  if(this.manualForm.controls.radioAction.value === 'no'){
    // this.manualForm.conrols.receivedOn.removeControl;
    this.manualForm.controls.receivedOn.clearValidators(); 
    this.manualForm.controls.receivedOn.updateValueAndValidity();
  }
  if(this.manualForm.valid){
    this.toClose = true;
    $('body').css("overflow", "auto");
    $('.cls-history-container').addClass('d-none')
    this.confirmation = true;
    this.confirmationContent=  {
      title : "Are you sure want to settle?",
      button: [
      {
        label : 'No',
        status: false
      }, {
        label : 'Yes',
        status: true
      }
    ]
    };
  }
  this.submitted = true;
  
}
  /**
   * confirmAction
   */
  public confirmAction(val: any): void {
    this.toClose = true;
    $('body').css("overflow", "auto");
    // setTimeout(()=>{
      if(this.manualForm.controls.radioAction.value === 'yes'){
        const form  ={
          "claimAmount" : this.manualInput,
          "radioAction" : this.manualForm.controls.radioAction.value,
          "receivedOn" : this.manualForm.controls.receivedOn.value,
          "modeOfPayment" : this.manualForm.controls.modeOfPayment.value,
          "remarks" : this.manualForm.controls.remarks.value,
          "voucherNumber" : this.manualForm.controls.voucherNumber.value,
        }
        this.manualFormVal.emit({form,flagVal : val.flag});
      }
      else{
        const form  ={
          "claimAmount" : this.manualInput,
          "radioAction" : this.manualForm.controls.radioAction.value
        }
        this.manualFormVal.emit({form,flagVal : val.flag});
      }
    // },600);
}
// Search Dropdown Function
  public searchDropdown(id:any){
    //console.log('fn-'+id+'-input');
    setTimeout(() => {
      $( "#"+id ).focus(); 
    }, 100); 
  }
  // search filter function
  public filterFunction(aa: any,bb:any) {
    // var aa : any  = 'fn-'+id+'-input';
    // var bb : any = 'fn-'+id+'-ul';
    this.appService.commonSearchFilter(aa,bb);
   }
  // search filter set value function
  public setFilterValue(formcontrolName:string, value:string){
    // //console.log(this.categoryForm)
    this.manualForm.controls[formcontrolName].setValue(value);
    if(value === 'select'){
			// console.log(value);
			this.manualForm.controls[formcontrolName].reset();
		}
  }
}
