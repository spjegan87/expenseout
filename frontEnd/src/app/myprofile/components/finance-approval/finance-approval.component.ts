import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl,FormBuilder, Validators} from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../../core-module/config/url';
declare var $ : any;
declare var toastr : any;
@Component({
  selector: 'app-finance-approval',
  templateUrl: './finance-approval.component.html',
  styleUrls: ['./finance-approval.component.scss']
})
export class FinanceApprovalComponent implements OnInit {
  /**
   * user criteria
   */
  public userCriteria : any = {};
  /**
   * final finance value
   */
  public finalFinance : any = {};
  /**
   * Desc: constructor
   */
  constructor(private appService: AppService,private router: Router,private fb : FormBuilder) { }
  /**
   * Desc: dropdownvalue
   */
  @Input() public dropdownArray : any =[]; 
  /**
   * empDetResponse
   */
  @Input() public empDetResponse : any ={};
  /**
   * formType
   */
  @Input() public formType: string = '';
  /**
   * Desc: submitted
   */
  public submitted : boolean = false;
  /**
   * finance approval value
   */
  @Output() public financeFormVal : EventEmitter<any> = new EventEmitter();
  /**
   * DEsc : form group
   */
  public financeForm  : FormGroup = this.fb.group({
    finance: new FormControl('',Validators.required)
  });
  /**
   * history type
   */
    public profileType: any = {};
  /**
   * Desc: oninit
   */
  ngOnInit() {
    this.profileType = JSON.parse(localStorage.getItem('userDetails'));
    // let userCriteriaVal : any =['finance0'];
    // userCriteriaVal.map((data: any)=>{
    //   // this.userCriteria[data] =[];
    //   setTimeout(()=>{
    //     $('#'+data).select2({
    //       placeholder: "Select Email"
    //     })
    //   },10)
    // });
    if(this.empDetResponse){
      for (let key of Object.keys(this.empDetResponse)) {
        //console.log(key,this.empDetResponse[key]);
        if(key === 'financeApprover'){
          // for (let criteria of Object.keys(this.empDetResponse[key])) {
          //   console.log(criteria,this.empDetResponse[key]);
            if(this.empDetResponse[key].length >= 1){
              // this.userCriteria[key] =[];
              this.empDetResponse[key].map((criteriaVal : any)=>{
                // console.log(criteriaVal);
                // this.userCriteria[key].push(criteriaVal); 
                this.financeForm.controls.finance.setValue(criteriaVal);
              })
              // this.userCriteria[key].map((data:any,i:number)=>{
                //console.log(data,'#'+ key + i)  
                // setTimeout(()=>{
                //   $('#finance' + i).select2({
                //     multiple : true,
                //     placeholder: "All"
                //   });
                //   $('#finance' + i).val(data).select2();
                // },1);
              // });
            }
          // }
        }
      }
      //console.log(this.userCriteria);
    }
  }
  public ngOnChanges(){
    //  console.log(this.empDetResponse);
  }
  // Search Dropdown Function
  public searchDropdown(id:any){
    setTimeout(() => {
      $( "#"+id ).focus(); 
    }, 100); 
  }
    // search filter function
  public filterFunction(aa:any,bb:any) {
    this.appService.commonSearchFilter(aa,bb);
  }
  // search filter set value function
  public setFilterValue(formcontrolName:string, value:string){
      this.financeForm.controls[formcontrolName].setValue(value);
      if(value === 'select'){
        // console.log(value);
        this.financeForm.controls[formcontrolName].reset();
      }
  }
   /**
   * validation
   */
  get validation(){
    return this.financeForm.controls;
  }
  /**
   * nextpage
   */
  public financeApproval(type:string){
    if(this.financeForm.valid){
      if(type === 'new'){
        // let userCriteriaVal : any =['finance0'];
        // userCriteriaVal.map((val: any,i:number)=>{
        //   this.userCriteria[i] =[];
        //   $('#'+val).select2('data').map((index: any)=>{
        //     this.userCriteria[i].push(index.text);
        //   })
        // });
        this.userCriteria = this.financeForm.controls.finance.value;
        // console.log(this.userCriteria);
        this.financeFormVal.emit(this.userCriteria);
      }
      else if(type === 'update'){
        // let userCriteriaVal : any =['finance0'];
        // userCriteriaVal.map((val: any,i:number)=>{
        //   this.finalFinance[i] =[];
        //   $('#'+val).select2('data').map((index: any)=>{
        //     this.finalFinance[i].push(index.text);
        //   })
        // });
        this.empDetResponse['financeApprover'] = this.financeForm.controls.finance.value;
        // console.log(this.empDetResponse);
        this.appService.httpPost('approvalDetails', this.empDetResponse , 'updateApprovalDetails').subscribe(() => {});
      }
    }
    else{
      toastr.error('Enter mandatory fields');
      this.submitted = true;
    }
  }
  /**
	 * backtoList
	 */
	public backtoList() : void {
		this.router.navigate( [
			'./' +
			urlConfig.ROUTES.home +
			'/' +
			urlConfig.ROUTES.manageprofile
		  ])	
	}
}
