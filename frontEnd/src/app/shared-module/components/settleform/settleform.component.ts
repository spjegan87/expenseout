import { Component,Output,EventEmitter,Input, OnChanges } from '@angular/core';
import { DatepickerService } from '../../../core-module/services/datepicker.service';
import { FormGroup, FormControl,Validators} from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
declare var $: any;
declare var moment: any;
/**
 * Author : Padma Priya CK
 * Desc :  settle form
 */
@Component({
  selector: 'app-settleform',
  templateUrl: './settleform.component.html',
  styleUrls: ['./settleform.component.scss']
})
export class SettleformComponent implements OnChanges {

  constructor(private _DatepickerService: DatepickerService,private appService: AppService) { }
  /**
   * confirmation
   */ 
  public confirmation : boolean = false;
  /**
   * confirmationContent
   */
  public confirmationContent : any ={};
  /**
   * Desc : edit
   */
  public edit : boolean = false;
  /**
   * Desc : amount
   */
  @Input() public amount : any;
  /**
   * validation flag
   */
  public submitted : boolean = false;
  /**
   * mode of payment 
   */
  // public Payment :any[];
  /**
   * settle form dynamic fields
   */
  public fieldJson : any = [];
  /**
   * DEsc : form group
   */
  public settleForm  : FormGroup = new FormGroup({
    // modeOfPayment: new FormControl('Cash',Validators.required),
    // paymentDate:new FormControl('',Validators.required),
    claimAmount :new FormControl('',[Validators.required,Validators.pattern(/^[1-9][0-9]*$/)])
  });
  /**
   * Desc : form value
   **/ 
  @Output() public settleFormVal : EventEmitter<any> = new EventEmitter();
  public ngOnChanges() : void {
    // console.log(this.amount);
    this.appService.httpPost('customFieldData', {"type":"finance"}, 'fetchCustomField','false').subscribe((data) => {
      this.fieldJson= data.content.customData;
      this.fieldJson.map((data: any)=>{
        if(data.required === true){
          this.settleForm.addControl(data.id,new FormControl('',Validators.required));
        } else{
        this.settleForm.addControl(data.id,new FormControl(''));
        }
        if(data.date === true){
          this.settleForm.controls[data.id].setValue(moment(new Date).format('DD-MMM-YYYY'));
          // this.settleForm.controls[data.id].setValue(moment(new Date).format('DD, MMM YYYY'));
        } else if(data.default){
          this.settleForm.controls[data.id].setValue(data.default);
        }
      })
		});
    // console.log(this.fieldJson,"fieldJson");
    this.settleForm.controls['claimAmount'].setValue(this.amount.reimbursableAmount);
  }
  /**
   * Desc : chooseDate
   */
  public chooseDate(id:string) : void{
    this._DatepickerService.setCalendar(id,this.settleForm,id,0,'',new Date().toString());
  }
  /**
   * Desc : editAmount
   */
  // public editAmount() : void {
  //   this.edit = true;
  // }
  /**
   * settleAmount
   */
  public settleAmount() : void {
    // console.log(this.settleForm.value.claimAmount <= this.amount.reimbursableAmount,"ff");
    if(this.settleForm.value.claimAmount <= this.amount.reimbursableAmount){
      if(this.settleForm.valid){
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
    }
    // else{
    //   this.errorShow  = true;
    //   // this.settleForm.controls['claimAmount']['status'] = 'INVALID';
    // }
    this.submitted = true;
    //console.log(this.settleForm)
  }
  /**
   * confirmAction
   */
  public confirmAction(val: any,actionVal:string = ''): void {
    if(this.appService.checkScript(this.settleForm.value) === true){
      if(actionVal === 'mobile'){
        $('.cls-mbl-settleform').addClass('cls-close-ani');
        setTimeout(() => {
          $('.cls-mbl-settleform').removeClass('cls-close-ani');
          this.settleFormVal.emit({form :this.settleForm.value,flagVal : val.flag, reportCode:this.amount.reportCode});
        }, 400);
      }
      else{
        this.settleFormVal.emit({form :this.settleForm.value,flagVal : val.flag, reportCode:this.amount.reportCode});
      }
    }   
    // this.alertFlag.emit(flag);
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
    this.settleForm.controls[formcontrolName].setValue(value);
    if(value === 'select'){
			// console.log(value);
			this.settleForm.controls[formcontrolName].reset();
		}
  }
  get validation(){
    return this.settleForm.controls;
  }
}
