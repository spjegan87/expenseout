import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
import { DatePipe } from '@angular/common';
import { DatepickerService } from '../../../core-module/services/datepicker.service';
declare var $: any;
declare var toastr: any;
declare function showLoader(): any
declare function hideLoader(): any
@Component({
  selector: 'app-create-advance-policy',
  templateUrl: './create-advance-policy.component.html',
  styleUrls: ['./create-advance-policy.component.scss']
})
export class CreateAdvancePolicyComponent implements OnChanges {
  /**
   * Desc : profile group
   */
  public profileGroupList: any = [];
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * editResponse
   */
  @Input() public editResponse: object = {};
  /**
   * Desc: submitted
   */
  public submitted: boolean = false;
  /**
   * currenct variable
   */
  public currency: any = [];
  /**
   * exchangeRate
   */
  public exchangeRateVal: any = {};
  constructor(private fb: FormBuilder, public datepipe: DatePipe, private _DatepickerService: DatepickerService, private appService: AppService) { }
  /**
  * Desc : form group
  */
  public advancePolicyForm: FormGroup = this.fb.group({
    policyName: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    advanceLimit: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
    profileGroupId: new FormControl('', Validators.required),
    currencyAmount: new FormControl(),
    exchangeRate :new FormControl() 
  });
  /**
   * Desc: Output form Val
   */
  @Output() public advancePolicyFormClose: EventEmitter<boolean> = new EventEmitter();
  /**
   * To send list create / update response status to settings component
   */
  @Output() public emitListStatus = new EventEmitter();
  /**
   * policy name check array
   */
  public policyProfileArray: any = [];
  /**
   * Desc : type
   */
  @Input() public actionType: string;
  /**
   * ng onchanges
   */
  public async ngOnChanges() {
    this.userCurrency = config.USER_CURRENCY;
    console.log(this.editResponse,this.actionType);
    
    (this.advancePolicyForm as FormGroup).controls['currency'].setValue(this.userCurrency);
   /* 
    * Desc: get dropdown values for profile group
    */
   this.appService.httpPost('profileGroupMaster', {}, 'getProfileGroups', 'false').subscribe((data) => {
    this.profileGroupList = data.content;
    console.log(this.profileGroupList);
   });
   let formData: any = {
    'id': ''
    }
    if (this.actionType === 'edit') {
      formData['id'] = this.editResponse['policy'].policyId;
      formData['groupName'] = this.editResponse['policy'].profileGroupName;
    }
  this.appService.httpPost('advanceLimitPolicy', formData, 'getExistsNameProfileGroup', 'false').subscribe((data: any) => {
    console.log(data);
    this.policyProfileArray['policy'] = data.content.existsName;
    this.policyProfileArray['profile'] = data.content.unMappedProfile
   });
    if (window.localStorage.getItem("currency") == undefined || window.localStorage.getItem("currency") == null) {
      let data = await this.appService.httpPost('currencyList', {}, 'getList', 'false').toPromise();
      this.currency = data.content.currencyList;
      let encryptData = this.appService.dataEncryption(JSON.stringify(this.currency));
      window.localStorage.setItem("currency", encryptData);
    }
    else {
      let decrypt = window.localStorage.getItem("currency");
      this.currency = JSON.parse(this.appService.dataDecrypt(decrypt));
    }
    this.currencyService();
    this.editService();
  }
  /**
   * Edit
   */
  public editService(): void {
    console.log(this.editResponse['policy']);
    this.advancePolicyForm.patchValue(this.editResponse['policy']);
    this.advancePolicyForm.controls.startDate.setValue(this.datepipe.transform(this.editResponse['policy'].startDate,'dd, MMM y'));
    this.advancePolicyForm.controls.endDate.setValue(this.datepipe.transform(this.editResponse['policy'].endDate,'dd, MMM y'));
    if(this.actionType === 'clone'){
      this.advancePolicyForm.controls['policyName'].reset();
      this.advancePolicyForm.controls['profileGroupId'].reset();
      this.editResponse['policy'].policyId = '';
    }
  }
  /**
   * Desc : chooseDate
   */
  public chooseDate(id: string): void {
    var date = new Date();
    if(id=='startDate'){
      date.setDate(date.getDate());
      this._DatepickerService.setCalendar(id, this.advancePolicyForm, id, 0, date.toString());
    }else{
      if(this.advancePolicyForm.controls['startDate'].valid){
        date = new Date(this.advancePolicyForm.controls['startDate'].value)
        date.setDate(date.getDate() + 1);
        this._DatepickerService.setCalendar(id, this.advancePolicyForm, id, 0, date.toString());
      }else{
        toastr.error("Select start date first");
      }
    }
  }
  /**
   * validation
   */
  get validation() {
    return this.advancePolicyForm.controls;
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
    this.advancePolicyFormClose.emit(false);
  }
  /**
   * create advance policy
   */
  public advancePolicyCreate(type:string){
    this.submitted = false;
    console.log(this.advancePolicyForm.value,this.policyProfileArray);
    if (this.advancePolicyForm.valid){
      if (this.policyProfileArray['policy']?.includes(this.advancePolicyForm.controls.policyName.value) && !this.policyProfileArray['profile']?.includes(this.advancePolicyForm.controls.profileGroupId.value)) {
        toastr.error("policy name and Profile group is already mapped");
      }
      else if (!this.policyProfileArray['profile']?.includes(this.advancePolicyForm.controls.profileGroupId.value)) {
        toastr.error("profile group is already mapped");
      }
      else if (this.policyProfileArray['policy']?.includes(this.advancePolicyForm.controls.policyName.value)) {
        toastr.error("policy name is already mapped");
      }
      else{
        let groupData: any = this.advancePolicyForm.value;
        let actionName = '';
        let moduleName = 'advanceLimitPolicy';
        if (type === 'create'|| type === 'clone') {
          actionName = 'insertAdvancePolicyDetails';
        } else if (type === 'update') {
          actionName = 'updateAdvancePolicyDetails';
          groupData['policyId'] = this.editResponse['policy']['policyId'];
        }
        groupData['startDate'] = this.datepipe.transform(groupData['startDate'], 'y-MM-dd');
        groupData['endDate'] = this.datepipe.transform(groupData['endDate'], 'y-MM-dd');
        console.log(moduleName, groupData, actionName, 'final');
        this.appService.httpPost(moduleName, groupData, actionName, 'false', true).subscribe((data) => {
          this.emitListStatus.emit(data.content);
        }); 
      }
    }
    else {
      this.submitted = true;
      toastr.error("Enter all mandatory fields");
    }
  }
  /**
   * amountCalculate
   */
	public amountCalculate(): void {
		const amount = parseFloat(((this.advancePolicyForm as FormGroup).controls['currencyAmount'].value  * this.advancePolicyForm.controls['exchangeRate'].value).toFixed(2));
		this.advancePolicyForm.controls['currencyAmount'].setValue(amount);
    this.currencyService();
	}
  // Search Dropdown Function
  public searchDropdown(id: any) {
    setTimeout(() => {
      $("#" + id).focus();
    }, 100);
  }
  // search filter function
  public filterFunction(aa: any, bb: any) {
    this.appService.commonSearchFilter(aa,bb);
  }
  // search filter set value function
  public setFilterValue(formcontrolName: string, value: string) {
    this.advancePolicyForm.controls[formcontrolName].setValue(value);
    if(value === 'select'){
      // console.log(value);
      this.advancePolicyForm.controls[formcontrolName].reset();
    }
    if (formcontrolName === 'currency') {
      this.currencyService();
    }
  }
  /**
   * Desc: currencyCall
   */
  public currencyService(): void {
    let val = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    const dataReq: any = {
      "userCurrency": this.userCurrency,
      "convertCurrency": (this.advancePolicyForm as FormGroup).controls['currency'].value,
      "date": val
    }
    this.appService.httpPost('currencyConversion', dataReq, 'convert', 'true').subscribe((data) => {
      this.exchangeRateVal = JSON.parse(JSON.stringify(data.content));
      console.log(data);
      
      (this.advancePolicyForm as FormGroup).controls['exchangeRate'].setValue(this.exchangeRateVal.exchangeRate);
      // this.exchangeAmount = this.exchangeRateVal.exchangeRate;
      let amount: any = (this.advancePolicyForm as FormGroup).controls['advanceLimit'].value;
      const currencyAmount = amount * (this.exchangeRateVal.exchangeRate);
      if (amount === '') {
        amount = 1;
      }
      if (amount !== '') {
        (this.advancePolicyForm as FormGroup).controls['currencyAmount'].setValue(currencyAmount);
      } else {
        (this.advancePolicyForm as FormGroup).controls['exchangeRate'].setValue(this.exchangeRateVal.exchangeRate);
      }
    });
  }
  /**
   * check profile group name
   */
  public checkProfileName(type: string) {
    //console.log(this.policyForm.controls.policyName.value,this.policyForm.controls.profileGroupId.value);
    if (type === 'policy') {
      //console.log(this.policyProfileArray['policy']);
      if (this.policyProfileArray['policy'].includes(this.advancePolicyForm.controls.policyName.value)) {
        toastr.error("policy name is already used");
      }
    }
    else {
      // console.log(this.policyProfileArray['profile']);
      if (!this.policyProfileArray['profile'].includes(this.advancePolicyForm.controls.profileGroupId.value)) {
        toastr.error("profile group is already mapped");
      }
    }
  }
}
