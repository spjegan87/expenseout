import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
import { Router } from '@angular/router';
import { urlConfig } from '../../../core-module/config/url';
declare var $ : any;
declare var toastr : any;
@Component({
  selector: 'app-advance-approval',
  templateUrl: './advance-approval.component.html',
  styleUrls: ['./advance-approval.component.scss']
})
export class AdvanceApprovalComponent implements OnInit {
  /**
   * user criteria
   */
  public userCriteria : any = {};
  /**
   * final data 
   */
  public finalData : any = {};
   /**
   * empDetResponse
   */
  @Input() public empDetResponse : any ={};
  /**
   * Desc: constructor
   */
  constructor(private appService: AppService, private router: Router) { }
  /**
   * Desc: dropdownvalue
   */
  @Input() public dropdownArray : any =[]; 
  /**
   * formType
   */
  @Input() public formType: string = '';
  /**
   * advance approval value
   */
  @Output() public advanceFormVal : EventEmitter<any> = new EventEmitter();
  /**
   * loop for input
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
    //console.log(this.userCriteria)
    //console.log(this.dropdownArray,this.empDetResponse);
    // let userCriteriaVal : any =['advance0','advance1','advance2'];
    // userCriteriaVal.map((data: any)=>{
      //console.log(data);
      // this.userCriteria[data] =[];
      setTimeout(()=>{
        $('.cls-approval-select').select2({
          placeholder: "Select Email"
        })
      },10)
    // });
    if(this.empDetResponse){
      for (let key of Object.keys(this.empDetResponse)) {
        //console.log(key,this.empDetResponse[key]);
        if(key === 'advanceApprover'){
          // for (let criteria of Object.keys(this.empDetResponse[key])) {
          //   console.log(criteria,this.empDetResponse[key]);
            if(this.empDetResponse[key].length >= 1){
              this.userCriteria[key] =[];
              this.empDetResponse[key].map((criteriaVal : any)=>{
                //console.log(key,key,criteriaVal);
                this.userCriteria[key].push(criteriaVal); 
              })
              this.userCriteria[key].map((data:any,i:number)=>{
                //console.log(data,'#'+ key + i)  
                setTimeout(()=>{
                  $('#advance'+ i).select2({
                    multiple : true,
                    placeholder: "All"
                  });
                  $('#advance'+ i).val(data).select2();
                },1);
              });
            }
          // }
        }
      }
      //console.log(this.userCriteria);
    }
  }
  /**
   * nextpage
   */
  public advanceApproval(type:string){
    let proceed : boolean = true;
    if(type === 'new'){
      let userCriteriaVal : any =['advance0','advance1','advance2','advance3','advance4','advance5'];
      userCriteriaVal.map((val: any,i:number)=>{
        this.userCriteria[i] =[];
        $('#'+val).select2('data').map((index: any)=>{
          this.userCriteria[i].push(index.text);
        })
      }) ;
      //console.log(this.userCriteria);
      if(this.userCriteria[1].length === 0 && this.userCriteria[2].length != 0){
        proceed = false;
       }
       if(proceed === true){
        if(this.userCriteria[0].length != 0){
          this.advanceFormVal.emit(this.userCriteria);
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
      let userCriteriaVal : any =['advance0','advance1','advance2','advance3','advance4','advance5'];
      userCriteriaVal.map((val: any,i:number)=>{
        this.finalData[i] =[];
        $('#'+val).select2('data').map((index: any)=>{
          this.finalData[i].push(index.text);
        })
      }) ;
      //console.log(this.finalData,this.empDetResponse);
      this.empDetResponse['advanceApprover'] = this.finalData;
      //console.log(this.empDetResponse,'final');
      if(this.finalData[1].length === 0 && this.finalData[2].length != 0){
        proceed = false;
       }
       if(proceed === true){
        if(this.finalData[0].length != 0){
          this.appService.httpPost('approvalDetails', this.empDetResponse , 'updateApprovalDetails').subscribe(() => {
            //console.log(data, 'jkjkjcurency');
          });
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
