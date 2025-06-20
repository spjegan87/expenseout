import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
// import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
declare var $: any;
declare var toastr: any;
/**
 * Author : Naveen.s
 * Desc : override city
 */
@Component({
  selector: 'app-add-rule',
  templateUrl: './add-rule.component.html',
  styleUrls: ['./add-rule.component.scss']
})
export class AddRuleComponent implements OnInit {
  /**
   * Desc: on closing alert add class close design 
   */
  public toClose: boolean = false;
  /**
   * get value
   */
  @Input() public userInputAddRule: any = {};
  /**
   * Desc: submitted
   */
  public submitted: boolean = false;
  /**
 * output data
 */
  @Output() public selectedVal: EventEmitter<any> = new EventEmitter();
  /**
   * currenct variable
   */
  public currency: any = [];
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * user criteria
   */
  public userCriteria: any = [];
  /**
  * Desc: dropdownvalue
  */
  @Input() public dropdownArray: any = [];
  /**
  * choosedCriteria
  */
  public choosedCriteria: any = [];
  /**
   * formgroup
   */
  // public addRuleForm: FormGroup = new FormGroup({});
  /**
   * constructure
   */
  // constructor() { }
  // constructor(private appService: AppService) { }
  /**
   * oninit
   */
  ngOnInit() {
    $('body').css("overflow", "hidden");
    console.log(this.userInputAddRule, 'input');
    $('#autoApprove').prop('checked',((this.userInputAddRule.editVal[this.userInputAddRule.category]?.approval.status)=='checked')?true:false);
    $('#autoReject').prop('checked',((this.userInputAddRule.editVal[this.userInputAddRule.category]?.rejection.status)=='autoReject')?true:false);
    $('#autoBlock').prop('checked',((this.userInputAddRule.editVal[this.userInputAddRule.category]?.rejection.status)=='autoBlock')?true:false);
    this.userCurrency = config.USER_CURRENCY;
    
    // this.appService.httpPost('CityGroup', {}, 'getAutoApproveRejectDetails','false').subscribe((data) => {
    //   	this.dropdownArray = data.content;
    //   	console.log(this.dropdownArray,'myInput');
    //   });
    // setTimeout(()=>{
    //   $('#addRule,#approveRule,addRuleAuto').select2({
    //     placeholder: "Select"
    //   })
    // },10)
    // this.appService.httpPost('CityGroup', {}, 'getAutoApproveRejectDetails','false').subscribe((data) => {
    // 	this.dropdownArray = data.content;
    // 	console.log(this.dropdownArray,'myInput');
    // });
    // if(this.userInputAddRule.editVal[this.userInputAddRule.category]){
    //   this.userInputAddRule.editVal[this.userInputAddRule.category].map((data:any)=>{
    //     let trimedVal : string = data.cityGroupName.replace(/\s+/g, '');
    //     // $('#cityGroup').select2('data').map(()=>{
    //     //   this.choosedCriteria.push(trimedVal);
    //     // })
    //     this.choosedCriteria.push({name:trimedVal,id:data.groupId});
    //     //console.log(this.choosedCriteria);
    //     let tempArr = []
    //     this.choosedCriteria.map((value:any)=>{
    //       (this.addRuleForm as FormGroup).addControl(
    //         [ value.name] as any,
    //         this.fb.group([])
    //       );
    //       tempArr.push(value.id);
    //       ((this.addRuleForm as FormGroup).controls[value.name] as FormGroup).addControl('amount',new FormControl(data.cityAmount,[ Validators.required, Validators.pattern(/^[1-9][0-9]*$/) ]));
    //       ((this.addRuleForm as FormGroup).controls[value.name] as FormGroup).addControl('currency',new FormControl(data.cityCurrency, [ Validators.required ]));
    //       //console.log(value);
    //       // setTimeout(()=>{
    //       //   $('#cityGroup').select2({
    //       //     placeholder: "Select",
    //       //     multiple : true
    //       //   });
    //       //   $('#cityGroup').val(value.id).select2();
    //       // },1);
    //     });
    //     //console.log(tempArr);
    //     setTimeout(()=>{
    //       $('#addRule,#approveRule,addRuleAuto').select2({
    //         placeholder: "Select",
    //         multiple : true
    //       });
    //       $('#addRule,#approveRule,addRuleAuto').val(tempArr).select2();
    //     },1);
    //   });
    // }
  }
  /**
 * onchanges
 */
  public ngOnChanges(): void {
    // let choosed : any =[] ;
    // $('.cls-select').on('select2:unselect', (dataVal : any)=>{
    //   let dataTrimmed : string = dataVal.params.data.text.replace(/\s+/g, '');
    //   //console.log(this.choosedCriteria,dataTrimmed);
    //   (this.addRuleForm as FormGroup).removeControl(dataTrimmed);
    //   //console.log(this.addRuleForm)
    //   this.choosedCriteria.map((value:any,i:number)=>{
    //     //console.log(value.name,dataTrimmed);
    //     var index = dataTrimmed;
    //     if (index === value.name) {
    //       this.choosedCriteria.splice(i, 1);
    //     }
    //   });
    //   //console.log(this.choosedCriteria);
    // })
    // $('.cls-select').on('select2:select', (dataVal : any)=>{
    //   //console.log(dataVal,"ads");
    //   if(dataVal.target.id === 'addRule' || dataVal.target.id === 'addRuleAuto' ){
    //     let trimedVal : string = dataVal.params.data.text.replace(/\s+/g, '');
    //     this.choosedCriteria.push({name:trimedVal, id:dataVal.params.data.id});
    //     // this.choosedCriteria = choosed;
    //     this.choosedCriteria = this.choosedCriteria.filter( function( item, index, inputArray ) {
    //       return inputArray.indexOf(item) == index;
    //     });
    //     (this.addRuleForm as FormGroup).addControl(
    //       [ trimedVal] as any,
    //       this.fb.group([])
    //     );
    //     ((this.addRuleForm as FormGroup).controls[trimedVal] as FormGroup).addControl('amount',new FormControl('',[ Validators.required, Validators.pattern(/^[1-9][0-9]*$/) ]));
    //     ((this.addRuleForm as FormGroup).controls[trimedVal] as FormGroup).addControl('currency',new FormControl(this.userCurrency, [ Validators.required ]));
    //     //console.log(this.addRuleForm);
    //     // //console.log(choosed);
    //     return this.choosedCriteria;
    //   }
    // });
  }
  

  /**
  * submit and close
  */
  public buttonAction(val: boolean): void {
    this.submitted = true;
    let autoApprove: string = 'unchecked';
    let autoReject: string = 'unchecked';
    let block: string = 'unchecked';
    console.log(autoApprove, autoReject, block, 'hello there');
    if (val === true) {
      let userSelection = {approval:{},rejection:{}};
      if ($('#autoApprove').is(':checked')) {
        autoApprove = 'checked';
      }
      userSelection['status'] = true;
      userSelection['approval'] = {status:autoApprove};
      userSelection['rejection'] = {status:$("input[type='radio'][name='rejection']:checked").val()};
      this.toClose = true;
      $('#fn-background').removeClass('cls-background');
      $('body').css("overflow", "auto");
      setTimeout(() => {
        this.selectedVal.emit(userSelection);
      }, 400);
    }
    else {
      this.toClose = true;
      $('#fn-background').removeClass('cls-background');
      $('body').css("overflow", "auto");
      setTimeout(() => {
        this.selectedVal.emit(false);
      }, 400);
    }
  }
}
