import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
import { DatepickerService } from '../../../core-module/services/datepicker.service';
import { DatePipe } from '@angular/common';
declare var $: any;
declare var toastr: any;
declare function showLoader(): any
declare function hideLoader(): any
/**
 * Author : Logesh
 * Desc : create budget
 */
@Component({
  selector: 'app-create-budget',
  templateUrl: './create-budget.component.html',
  styleUrls: ['./create-budget.component.scss']
})
export class CreateBudgetComponent implements OnChanges {
  /* 
  * Desc: Budget details from httppost
  */
  public budgetDetails: any = [];
  /* 
  *Desc: Dropdown list values
   */
  public dropdownVal1: any = [];
  /* 
  *Desc: Dropdown list values
   */
  public dropdownVal2: any = [];
  /* 
  *Desc: Dropdown list values
   */
  public dropdownArray: any = [];
  /* 
  *Desc: storing dropdown Value
   */
  public selectedDropdownVal: any = [];
  /* 
  * Desc: multiSelectArray
   */
  public multiSelectArray: any = {};
  /* 
  *Desc: Mail id for notificaitom
   */
  public toMailArray: any = [];

  /* 
  *Desc: show or hide the division based on selection
   */
  public divisionFlag: any = ['profileGroup'];
  /* 
  *Desc: all the seledted dropdown value
   */
  public selectedCriteria: any = {};
  /**
   * editBudgetVal
   */
  @Input() public editBudgetVal: object = {};
  /**
  * Desc : constructor
  */
  constructor(private fb: FormBuilder, private _DatepickerService: DatepickerService, private appService: AppService, public datepipe : DatePipe) { }
  /**
  * Desc : form group
  */
  public budgetForm: FormGroup = this.fb.group({
    budgetName: new FormControl('', Validators.required),
    budgetPeriod: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    autoRenewal: new FormControl('N'),
    settleRestrict: new FormControl('N'),
    currency: new FormControl('', Validators.required),
    budgetAmount: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
    budgetAlertPercent: new FormControl('0', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),

    profileGroup: new FormControl('', Validators.required)
  });
  /**
   * Desc: Output form Val
   */
  @Output() public budgetFormClose: EventEmitter<boolean> = new EventEmitter();
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * edit and viewswitch
   */
  public showEdit: boolean = false;
  /**
   * end date and auto renewal show hide flag
   */
  public endDateFlag: boolean = true;
  /**
   * Desc : type
   */
  @Input() public type: string;
  /**
   * page3 show hide flag
   */
  public thirdPage: boolean = false;
  /**
   * Desc: submitted
   */
  public submitted: boolean = false;
  /**
  * the flag
  */
  public status: boolean = false;
  /**
   * To send list create / update response status to settings component
   */
  @Output() public emitListStatus = new EventEmitter();
  public ngOnChanges(): void {
    this.multiSelectArray =
    {
      'budgetPeriod': {
        1: "Monthly",
        3: "Quarterly",
        6: "Half Yearly",
        12: "Yearly"
      },
      'divisions': [
        // { 'text': 'Profile Group', 'id': 'profileGroup' },
        // { 'text': 'Users', 'id': 'allUsers' },
        // { 'text': 'Designation Code', 'id': 'designationCode' },
        // { 'text': 'Department Code', 'id': 'departmentCode' },
        // { 'text': 'Branch Code', 'id': 'branchCode' },
        // { 'text': 'Grade Code', 'id': 'gradeCode' },
        // { 'text': 'Profit Center Code', 'id': 'profitCenterCode' },
        // { 'text': 'Cost Center Code', 'id': 'costCenterCode' }
      ]
    };
    /* 
    * Desc: get dropdown values for all the codes 
     */
    this.appService.httpPost('userSettings', {}, 'getDropDownList', 'false').subscribe((data) => {
      this.dropdownVal1 = data.content;
    });
    /* 
    *Desc:get all user of the corporate and profile gropus 
     */
    this.appService.httpPost('userSettings', {}, 'getExtraDropDownList', 'false').subscribe((data) => {
      this.dropdownVal2 = data.content;
      showLoader();
      this.dropdownArray = { ...this.dropdownVal1, ...this.dropdownVal2 }
      /* 
      * Desc: adding divisions for available based on corporates
       */
      if (this.dropdownArray.profileGroup != undefined) {
        this.multiSelectArray['divisions'].push({ 'text': 'Profile Group', 'id': 'profileGroup' });
      }
      if (this.dropdownArray.allUsers != undefined) {
        this.multiSelectArray['divisions'].push({ 'text': 'Users', 'id': 'allUsers' });
      }
      if (this.dropdownArray.designationCode != undefined) {
        this.multiSelectArray['divisions'].push({ 'text': 'Designation Code', 'id': 'designationCode' });
      }
      if (this.dropdownArray.departmentCode != undefined) {
        this.multiSelectArray['divisions'].push({ 'text': 'Department Code', 'id': 'departmentCode' });
      }
      if (this.dropdownArray.branchCode != undefined) {
        this.multiSelectArray['divisions'].push({ 'text': 'Branch Code', 'id': 'branchCode' });
      }
      if (this.dropdownArray.gradeCode != undefined) {
        this.multiSelectArray['divisions'].push({ 'text': 'Grade Code', 'id': 'gradeCode' });
      }
      if (this.dropdownArray.profitCenterCode != undefined) {
        this.multiSelectArray['divisions'].push({ 'text': 'Profit Center Code', 'id': 'profitCenterCode' });
      }
      if (this.dropdownArray.costCenterCode != undefined) {
        this.multiSelectArray['divisions'].push({ 'text': 'Cost Center Code', 'id': 'costCenterCode' });
      }
      $('#mailTrigger').select2({
        multiple: true,
        placeholder: "select"
      })
      // $('#divisions').select2({
      //   multiple: true,
      //   placeholder: "select"
      // })
      this.editData();
      hideLoader()
    });

    this.userCurrency = config.USER_CURRENCY;
    (this.budgetForm as FormGroup).controls['currency'].setValue(this.userCurrency);
    $('.cls-divisions').on('change', () => { this.criteriaSwitch() });
    $('#startDate').on('change', () => {
      if(this.budgetForm.controls['startDate'].value == ""){this.budgetForm.controls['endDate'].setValue("");}
    });

    this.budgetForm.controls['endDate'].disable();

  }
  /**
   * Desc : chooseDate
   */
  public chooseDate(id: string): void {
    var date = new Date();
    if(id=='startDate'){
      date.setDate(date.getDate() + 1);
      this._DatepickerService.setCalendar(id, this.budgetForm, id, 0, date.toString());
    }else{
      if(this.budgetForm.controls['startDate'].valid){
        date = new Date(this.budgetForm.controls['startDate'].value)
        date.setDate(date.getDate() + 1);
        this._DatepickerService.setCalendar(id, this.budgetForm, id, 0, date.toString());
      }else{
        toastr.error("Select start date first");
      }
    }

  }
  /* 
  *Desc: flow for budget edit 
   */
  public editData(): void {
    if (this.editBudgetVal['expired'] == 'true' && this.editBudgetVal['type'] != 'clone') {
      this.showEdit = true;
    }
    if (this.editBudgetVal['budget'] != undefined) {
      showLoader();
      console.log(this.editBudgetVal, 'edit', this.selectedDropdownVal, 'stop');
      // console.log(this.divisionFlag,"all cri")
      this.budgetForm.controls['budgetName'].setValue(this.editBudgetVal['budget']['budget_name']);
      this.budgetForm.controls['budgetPeriod'].setValue(this.editBudgetVal['budget']['budget_period']);
      this.budgetForm.controls['autoRenewal'].setValue(this.editBudgetVal['budget']['budget_auto_renewal']);
      this.budgetForm.controls['settleRestrict'].setValue(this.editBudgetVal['budget']['settle_restrict']);
      this.budgetForm.controls['budgetAmount'].setValue(this.editBudgetVal['budget']['budget_amount']);
      this.budgetForm.controls['startDate'].setValue(this.datepipe.transform(this.editBudgetVal['budget']['start_date'], 'dd, MMM y'));
      if(this.editBudgetVal['budget']['end_date'] != "0000-00-00 00:00:00"){
        this.budgetForm.controls['endDate'].setValue(this.editBudgetVal['budget']['end_date']);
      }
      this.budgetForm.controls['budgetAlertPercent'].setValue(this.editBudgetVal['budget']['budget_alert_percentage']);
      
      
      this.budgetForm.controls['profileGroup'].setValue(this.editBudgetVal['budget']['budget_for']['profileGroup'][0]);

      if(this.editBudgetVal['budget']['end_date']!= "0000-00-00 00:00:00"){
        this.budgetForm.controls['endDate'].enable();
        this.budgetForm.controls['budgetPeriod'].disable();
        this.endDateFlag=false;
      }

      // this.divisionFlag = [];
      // this.selectedDropdownVal = [];

      for (let key of Object.keys(this.editBudgetVal['budget'])) {
        // if (key == 'budget_for') {
        //   for (let division of Object.keys(this.editBudgetVal['budget']['budget_for'])) {
        //     if (this.editBudgetVal['budget']['budget_for'][division].length > 0) {
        //       this.divisionFlag.push(division);
        //       this.selectedDropdownVal[division] = [];
        //     }
        //     setTimeout(() => {
        //       $('#' + division).select2({
        //         multiple: true,
        //         placeholder: "All"
        //       })
        //       $('#' + division).val(this.editBudgetVal['budget']['budget_for'][division]).select2();
        //     }, 1)
        //   }
        // }
        let mailArray = []
        if (key === 'mail_trigger_for') {
          for (let mailId of Object.values(this.editBudgetVal['budget']['mail_trigger_for'])) {
            mailArray.push(mailId);
          }
          setTimeout(() => {
            $('#mailTrigger').select2({
              multiple: true,
              placeholder: "All"
            });
            $('#mailTrigger').val(mailArray).select2();
          }, 1);
        }
      }
      setTimeout(()=>{
        $('#divisions').val(this.divisionFlag).select2();
      },1)
      hideLoader();

    }
    if(this.showEdit){
      this.budgetForm.controls['profileGroup'].disable();
      this.budgetForm.controls['startDate'].disable();
      this.budgetForm.controls['endDate'].disable();
      this.budgetForm.controls['budgetPeriod'].disable();

      // setTimeout(()=>{
        // $('#budgetFormContainer').find(':input').prop('disabled', true);
        // $('#budgetFormContainer').find(':button').prop('disabled', false);
        // },10)
    }
  }


  /**
   * validation
   */
  get validation() {
    return this.budgetForm.controls;
  }
  /**
 * string validation
 */
  public stringValidation(event: any) {
    //console.log(event);
    const strOnly = /^[A-Za-z0-9 ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!strOnly.test(inputChar)) {
      event.preventDefault();
    }
  }
  /**
   * Redirect
   */
  public redirectList(): void {
    this.budgetFormClose.emit(false);
  }
  /* 
  * Desc : duplicate budget name checker
   */
  public checkExisting(type: string): void {
    /* 
    * Desc: get existing budget names from database
     */
    let formInput: any = {};
    if (this.editBudgetVal['budget'] == undefined || this.editBudgetVal['type'] == 'clone') {
      formInput = {};
    } else {
      formInput = {
        'budgetId': this.editBudgetVal['budget']['budget_id'],
        'budgetName': this.editBudgetVal['budget']['budget_name'],
      }
    }
    this.appService.httpPost('budgetSettings', formInput, 'getBudgetInsertDetails', 'false').subscribe((data) => {
      this.budgetDetails = data.content;
      if (type === 'budgetName') {
        if (this.budgetDetails['existsName']?.includes(this.budgetForm.controls.budgetName.value)) {
          toastr.error("Budget name is already used");
        }
      }
      if (type === 'profileGroup') {
        if (this.budgetDetails['existsProfileGroup']?.includes($("#profileGroup").val())) {
          toastr.error("Already used profile Group");
        }
      }
    });
  }
  /**
   *  status change for settle restrict and auto renewal
   */
  public changeStatus(type: string) {
    switch (type) {
      case 'autoRenewal':
        if (this.budgetForm.controls['autoRenewal'].value === 'Y' || this.budgetForm.controls['autoRenewal'].value === true) {
          setTimeout(() => {
            this.budgetForm.controls['autoRenewal'].setValue('N');
            this.budgetForm.value['autoRenewal'] === 'N'
          }, 10)
        }
        else {
          setTimeout(() => {
            this.budgetForm.controls['autoRenewal'].setValue('Y');
          }, 10);
        }
        break;
      case 'settleRestrict':
        if (this.budgetForm.controls['settleRestrict'].value === 'Y' || this.budgetForm.controls['settleRestrict'].value === true) {
          setTimeout(() => {
            this.budgetForm.controls['settleRestrict'].setValue('N');
            this.budgetForm.value['settleRestrict'] === 'N'
          }, 10)
        }
        else {
          setTimeout(() => {
            this.budgetForm.controls['settleRestrict'].setValue('Y');
          }, 10);
        }
        break;

      case 'dateOrPeriod':
        if (this.budgetForm.controls['budgetPeriod'].enabled) {
          setTimeout(() => {
            this.budgetForm.controls['budgetPeriod'].setValue(0);
            this.budgetForm.controls['budgetPeriod'].disable();
            this.budgetForm.controls['endDate'].enable();
            this.endDateFlag=false;
          }, 10)
        }
        else {
          setTimeout(() => {
            this.budgetForm.controls['endDate'].setValue("");
            this.budgetForm.controls['endDate'].disable();
            this.budgetForm.controls['budgetPeriod'].enable();
            this.budgetForm.controls['budgetPeriod'].setValue(1);
            
            this.budgetForm.controls['autoRenewal'].setValue('N');
            this.endDateFlag=true;
          }, 10);
        }
        break;
    }
  }
  /* 
  *Desc : Page change
   */
  public criteriaSwitch(): void {
    this.toMailArray = [];
    // this.divisionFlag = [];
    // $("#divisions").select2('data').map((index: any) => {
    //   this.divisionFlag.push(index.id);
    // })

    $("#mailTrigger").select2('data').map((index: any) => {
      this.toMailArray.push(index.id);
    })
    // this.divisionFlag.map((data: any) => {
    //   setTimeout(() => {
    //     $('#' + data).select2({
    //       multiple: true,
    //       placeholder: "Select"
    //     })
    //   }, 10)
    // });
  }
  /**
   * selectAll
   */
  public divisionSelectAll(): void {
    let divisionValues = [];
    if ($('#ip-divisions').prop('checked')) {
      this.multiSelectArray['divisions'].map((data: any) => {
        divisionValues.push(data.id);
      })
      $('#divisions').val(divisionValues).select2();
    }
    else {
      $("#divisions").select2('destroy').val("").select2();
    }
    this.criteriaSwitch();
  }
  /**
   * selectAll
   */
  public selectAll(id: string): void {
    this.selectedDropdownVal[id] = [];
    if ($('#ip-' + id).prop('checked')) {
      this.dropdownArray[id].map((data: any) => {
        this.selectedDropdownVal[id].push(data.id);
      })
      // console.log(this.selectedDropdownVal, 'ddv')
      $('#' + id).val(this.selectedDropdownVal[id]).select2();
    }
    else {
      $("#"+ id).select2('destroy').val("").select2();
    }
  }
  /**
   * budget
   */
  public budgetCreate(type: string): void {
    // showLoader();
    setTimeout(() => {
      this.createCall(type);
    }, 200);
  }
  /**
   * to call budget create
   */
  public createCall(type: string) {
    console.log(this.budgetForm,'all vals');
    let proceed: boolean = true;
    this.submitted = false;
    if (this.validation.budgetName.valid
      && (this.validation.budgetPeriod.valid || this.validation.budgetPeriod.disabled)
      && this.validation.autoRenewal.valid
      && this.validation.settleRestrict.valid
      && (this.validation.startDate.valid || this.validation.startDate.disabled)
      && (this.validation.endDate.valid || this.validation.endDate.disabled)
      && this.validation.budgetAmount.valid
      && this.validation.currency.valid) {
      if (this.budgetDetails['existsName']?.includes(this.validation.budgetName.value)) {
        toastr.error("Budget name is already exist");
        proceed = false;
      }
      else if (this.budgetDetails['existsProfileGroup']?.includes($("#profileGroup").val())) {
        toastr.error("Already used profile group");
        proceed = false;
      }
      else if (this.validation.budgetPeriod.invalid && this.validation.endDate.invalid ) {
        toastr.error("Please select budget period or end date!");
        proceed = false;
      }
      else if (this.validation.budgetAmount.invalid) {
        toastr.error("Please enter budget amount");
        proceed = false;
      }
      else if (this.validation.settleRestrict.invalid) {
        toastr.error("settle restrict");
        proceed = false;
      }
      else if (this.validation.startDate.invalid) {
        toastr.error("start date is not selected");
        proceed = false;
      }
      // else if (this.validation.budgetAlertPercent.value >= 100 || this.validation.budgetAlertPercent.value <= 0) {
      //   toastr.error("Budget alert percentage should be 1 to 99 percent");
      //   proceed = false;
      // }
      // else if ($("#divisions").select2('data') == "") {
      //   toastr.error("Select divisions for budget");
      //   proceed = false;
      // }
      else if ($("#profileGroup").val() == "") {
        toastr.error("Select Profile Group for budget");
        proceed = false;
      }
      // else if ($("#mailTrigger").select2('data') == "") {
      //   toastr.error("Select mail address for budget notificaiton");
      //   proceed = false;
      // }
      else if (this.validation.autoRenewal.invalid) {
        toastr.error("auto renewal");
        proceed = false;
      }
      else if (proceed === true) {

        // selecting only profile group in the divisions automatically
        // $('#divisions').val(this.divisionFlag).select2();
        this.criteriaSwitch()

        this.multiSelectArray['divisions'].map((division: any) => {
          this.selectedCriteria[division.id] = [];
        })
        let userCriteriaVal: any = [];
        this.divisionFlag.map((criteria: any) => {
          userCriteriaVal.push(criteria);
        })
        this.selectedCriteria['profileGroup']=[(this.budgetForm.controls['profileGroup'].value)];
        // userCriteriaVal.map((indexName: any) => {
        //   $('#' + indexName).select2('data').map((index: any) => {
        //     this.selectedCriteria[indexName].push(index.id);
        //   })
        // })
        if (this.budgetForm.controls['budgetName'].value === '' || this.budgetForm.controls['budgetAmount'].value === '' || this.budgetForm.controls['budgetAlertPercent'].value === '') {
          toastr.error('Enter mandatory fields');
        } else {
          let groupData: any = {
            'budgetName': this.budgetForm.controls['budgetName'].value,
            'budget_period': this.budgetForm.controls['budgetPeriod'].value,
            'budget_auto_renewal': this.budgetForm.controls['autoRenewal'].value,
            'start_date': this.datepipe.transform(this.budgetForm.controls['startDate'].value, 'y-MM-dd'),
            'end_date': this.datepipe.transform(this.budgetForm.controls['endDate'].value, 'y-MM-dd'),
            'settle_restrict': this.budgetForm.controls['settleRestrict'].value,
            'budget_for': this.selectedCriteria,
            'budget_currency_code': this.budgetForm.controls['currency'].value,
            'budget_amount': this.budgetForm.controls['budgetAmount'].value,
            'budget_currency_amount': this.budgetForm.controls['budgetAmount'].value,
            'budget_alert_percentage': this.budgetForm.controls['budgetAlertPercent'].value,
            'mail_trigger_for': this.toMailArray,
            'status': '1'
          }
          let actionName = '';
          let moduleName = 'budgetSettings';
          if (type === 'create') {
            actionName = 'insertBudgetData';
          } else if (type === 'update') {
            actionName = 'updateBudgetData';
            groupData['budgetId'] = this.editBudgetVal['budget']['budget_id'];
          }
          console.log(groupData, 'final');
          this.appService.httpPost(moduleName, groupData, actionName, 'false', true).subscribe((data) => {
            this.emitListStatus.emit(data.content);
          });
        }

      }
    } else {
      this.submitted = true;
      toastr.error("Enter all mandatory fields");
    }


  }
}





