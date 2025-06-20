import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../../core-module/config/url';
declare var $ : any;
declare var toastr : any;
@Component({
  selector: 'app-expense-approval',
  templateUrl: './expense-approval.component.html',
  styleUrls: ['./expense-approval.component.scss']
})
export class ExpenseApprovalComponent implements OnInit {
  /**
   * Approver value
   */
  public userApprover : any = {};
  /**
   * final Approver value
   */
  public finalApprover : any = {};
  /**
   * final exceptional value
   */
  public finalExceptional : any = {};
  /**
   * exceptional value
   */
  public userExceptional : any = {};
  /**
   * Desc: constructor
   */
  constructor(private router: Router,private appService: AppService) { }
  /**
   * Desc: dropdownvalue
   */
  @Input() public dropdownArray : any =[]; 
  /**
   * formType
   */
  @Input() public formType: string = '';
  /**
   * expense approval value
   */
  @Output() public expenseFormVal : EventEmitter<any> = new EventEmitter();
  /**
   * empDetResponse
   */
  @Input() public empDetResponse : any ={};
  /**
   * loop for approver
   */
  public counter = Array;
  /**
   * history type
   */
  public profileType: any = {};
  /**
   * Desc: oninit
   */
  ngOnInit() {
    this.profileType = JSON.parse(localStorage.getItem('userDetails'));
    // console.log(this.empDetResponse,this.dropdownArray,this.profileType);
    // let userCriteriaVal : any =['approver0','approver1','approver2','exceptional0','exceptional1','exceptional2'];
    // userCriteriaVal.map((data: any)=>{
      // this.userCriteria[data] =[];
      setTimeout(()=>{
        $('.cls-approval-select').select2({
          multiple : true,
          placeholder: "Select Email"
        })
      },10)
    // });
    if(this.empDetResponse){
      for (let key of Object.keys(this.empDetResponse)) {
        //  console.log(key,this.empDetResponse[key]);
        if(key === 'exceptionApprover'){
          // for (let criteria of Object.keys(this.empDetResponse[key])) {
          //   console.log(criteria,this.empDetResponse[key]);
            if(this.empDetResponse[key].length >= 1){
              this.userExceptional[key] =[];
              this.empDetResponse[key].map((criteriaVal : any)=>{
                // console.log(key,key,criteriaVal);
                this.userExceptional[key].push(criteriaVal); 
              })
              this.userExceptional[key].map((data:any,i:number)=>{
                setTimeout(()=>{
                  $('#exceptional'+ i).select2({
                    multiple : true,
                    placeholder: "All"
                  });
                  //console.log(data,'#'+ key + key)  
                  $('#exceptional'+ i).val(data).select2();
                },1);
              })
            }
            //console.log(this.userExceptional[key]);
          // }
        }
        else if(key === 'expenseApprover'){
          // for (let criteria of Object.keys(this.empDetResponse[key])) {
            // console.log(this.empDetResponse[key]);
            if(this.empDetResponse[key].length >= 1){
              this.userApprover[key] =[];
              this.empDetResponse[key].map((criteriaVal : any)=>{
                // console.log(key,key,criteriaVal);
                this.userApprover[key].push(criteriaVal); 
              })
              this.userApprover[key].map((data:any,i:number)=>{
                setTimeout(()=>{
                  $('#approver'+ i).select2({
                    multiple : true,
                    placeholder: "All"
                  });
                  //console.log(data,'#'+ key + key)  
                  $('#approver'+ i).val(data).select2();
                },1);
              });
            }
            //console.log(this.userApprover[key]);
          // }
        }
      }
      //console.log(this.userApprover);
    }
  }
  /**
   * nextpage
   */
  public expenseApproval(type:string){
    let proceed : boolean = true;
    if(type === 'new'){
      let approverVal : any =['approver0','approver1','approver2','approver3','approver4','approver5'];
      approverVal.map((val: any,i:number)=>{
        this.userApprover[i] =[];
        $('#'+val).select2('data').map((index: any)=>{
          this.userApprover[i].push(index.text);
        })
      });
      //console.log(this.userApprover);
      let exceptionalVal : any =['exceptional0','exceptional1','exceptional2','exceptional3','exceptional4','exceptional5'];
      exceptionalVal.map((val: any,i:number)=>{
        this.userExceptional[i] =[];
        $('#'+val).select2('data').map((index: any)=>{
          this.userExceptional[i].push(index.text);
        })
      });
      let objVal ={
        "exceptionApprover":this.userExceptional,
        "expenseApprover":this.userApprover
      }
      if(this.userApprover[1].length === 0 && this.userApprover[2].length != 0){
        proceed = false;
       }
      else if(this.userExceptional[1].length === 0 && this.userExceptional[2].length != 0){
        proceed = false;
      }
       if(proceed === true){
        if(this.userApprover[0].length != 0 && this.userExceptional[0] != 0){
          this.expenseFormVal.emit(objVal);
        }
        else{
          toastr.error('Enter mandatory fields');
        }
      }
      else{
        toastr.error('please select level 2 approver');
      }
    }
    else if(type === 'update'){
      // console.log(this.finalApprover)
      let approverVal : any =['approver0','approver1','approver2','approver3','approver4','approver5'];
      approverVal.map((val: any,i:number)=>{
        this.finalApprover[i] =[];
        $('#'+val).select2('data').map((index: any)=>{
          this.finalApprover[i].push(index.text);
        })
      });
      let exceptionalVal : any =['exceptional0','exceptional1','exceptional2','exceptional3','exceptional4','exceptional5'];
      exceptionalVal.map((val: any,i:number)=>{
        this.finalExceptional[i] =[];
        $('#'+val).select2('data').map((index: any)=>{
          this.finalExceptional[i].push(index.text);
        })
      });
      this.empDetResponse['expenseApprover'] = this.finalApprover;
      this.empDetResponse['exceptionApprover'] = this.finalExceptional; 
      //console.log(this.empDetResponse);
      if(this.finalApprover[1].length === 0 && this.finalApprover[2].length != 0){
        proceed = false;
       }
      else if(this.finalExceptional[1].length === 0 && this.finalExceptional[2].length != 0){
        proceed = false;
      }
      if(proceed === true){
        if(this.finalApprover[0].length != 0 && this.finalExceptional[0].length != 0){
          this.appService.httpPost('approvalDetails', this.empDetResponse , 'updateApprovalDetails').subscribe(() => { });
        }
        else{
          toastr.error('Enter mandatory fields');
        }
      }
      else{
        toastr.error('please select level 2 approver');
      }
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
