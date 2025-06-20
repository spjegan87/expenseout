import { Component, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { DatepickerService } from '../../../core-module/services/datepicker.service';
import { AppService } from '../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
import { DatePipe } from '@angular/common';
declare var $: any;
declare var toastr: any;
/**
 * Author : Padma Priya CK, Naveen.s
 * Desc : create policy
 */
@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss']
})
export class CreatePolicyComponent implements OnChanges {

  /**
   * Desc widget
   */
  public widget: any = [];
  /**
   * Desc : expense
   */
  public expense: any = [];
  /**
   * policy exist category
   */
  // public userCriteriaPolicy : any ={};
  /**
   * policy name check array
   */
  public policyProfileArray: any = [];
  /**
   * editPolicyVal
   */
  @Input() public editPolicyVal: object = {};
  /**
   * Desc : constructor
   */
  constructor(private fb: FormBuilder, private _DatepickerService: DatepickerService, private appService: AppService, public datepipe : DatePipe) { }
  /**
   * DEsc : form group
   */
  public policyForm: FormGroup = this.fb.group({
    policyName: new FormControl('', Validators.required),
    startDate: new FormControl('', Validators.required),
    endDate: new FormControl('', Validators.required),
    profileGroupId: new FormControl('', Validators.required),
    currency: new FormControl('', Validators.required),
    overallAmount: new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]),
    currencyAmount: new FormControl(),
    receiptMandatory: new FormControl('Y'),
    chooseCategory: new FormControl(),
    mileageDetails: this.fb.array([
      this.fb.group({
        mileage: new FormControl('KM'),
        vehicleType: new FormControl('', Validators.required),
        maxMileage: new FormControl('', Validators.pattern(/^[0-9]+$/)),
        currency: new FormControl('', Validators.required),
        mileageCost: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]+\.?[0-9]*$/)])
      })
    ])
  });
  /**
   * page1 show hide flag
   */
  public firstPage: boolean = false;
  /**
   * Desc: Output form Val
   */
  @Output() public policyFormClose: EventEmitter<boolean> = new EventEmitter();
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * page2 show hide flag
   */
  public secondPage: boolean = false;
  /**
   * Desc : type
   */
  @Input() public type: string;
  /**
   * page3 show hide flag
   */
  public thirdPage: boolean = false;
  /**
   * Dropdown data
   */
  public dropdownArray: any = {};
  /**
   * user criteria
   */
  public userCriteria: any = {};
  /**
   * Desc : profile group
   */
  public profileGroupList: any = [];
  /**
   * choosedCriteria
   */
  public choosedCriteria: any = [];
  /**
   * Desc: submitted
   */
  public submitted: boolean = false;
  /**
 * alertShow
 */
  // public alertShow: boolean = false;
  /**
   * open over ride variable
   */
  public overrideAmount: boolean = false;
  /**
   *  override input value
   */
  public overrideAlertVal: any = {};
  /**
   * open add rule variable
   */
  public addRule: boolean = false;
  /**
  *  override input value
  */
  public addRuleAlertVal: any = {};
  /**
  * rule user val
  */
  public addRuleUserDate: any = {};
  /**
  * add rule showing
  */
  public addRuleShowing: boolean = false;
  /**
 * alertContent
 */
  public alertContent: any = {};
  /**
   * the flag
   */
  public status: boolean = false;
  /**
   * city val
   */
  public overrideCityVal: any = {};
  /**
   * Desc : type
   */
  @Input() public actionType: string;
  /**
   * To send list create / update response status to settings component
   */
  @Output() public emitListStatus = new EventEmitter();
  /**
    * onchanges
    */
  public ngOnChanges(): void {
    //console.log(this.type);
    // console.log(this.editPolicyVal,this.editPolicyVal['policy'],this.editPolicyVal == undefined,this.editPolicyVal != undefined, "edit");
    // //console.log(this.empDetResponse);
    // console.log(this.editPolicyVal,this.editPolicyVal.policy == undefined,this.editPolicyVal.policy != undefined)
    this.widget = [
      {
        no: 1,
        name: 'Select Criterias',
        status: 'N',
        initial_no: 1
      },
      {
        no: 2,
        name: 'Criteria’s Mapped',
        status: 'N',
        initial_no: 2
      },
      {
        no: 3,
        name: 'Select Mileage',
        status: 'N',
        initial_no: 3
      }
    ];
    //console.log(this.policyForm);
    this.firstPage = true;
    this.appService.httpPost('profileGroupMaster', {}, 'getProfileGroups', 'false').subscribe((data) => {
      this.profileGroupList = data.content;
      console.log(this.profileGroupList);
    });
    console.log(this.editPolicyVal,'lokiiiiii');
    
    console.log(this.editPolicyVal, this.editPolicyVal != undefined)
    //  this.editPolicyVal['policy'] != undefined ? this.editService() : undefined;
    this.editService();
    this.appService.httpPost('formCategoryJson', {}, 'fetchRecords', 'false').subscribe((data) => {
      this.expense = data.content.fieldsJson;
      //console.log(this.expense,"ass");
      this.select2();
      // this.ngOnChanges();
    });
    let formData: any = {
      'id': ''
    }
    console.log(this.actionType);
    
    if (this.actionType === 'edit') {
      formData['id'] = this.editPolicyVal['policy'].policyId;
    }
    //console.log(formData);
    this.appService.httpPost('policyViolation', formData, 'getExistsNameProfileGroup', 'false').subscribe((data: any) => {
      //console.log(data);
      this.policyProfileArray['policy'] = data.content.existsName;
      this.policyProfileArray['profile'] = data.content.unMappedProfile
    });
    this.appService.httpPost('policyViolation', formData, 'getAddRuleButton', 'false').subscribe((data: any) => {
      this.addRuleShowing = data.content.addRuleButton;
      console.log(this.addRuleShowing,'btn config');
    });
    this.userCurrency = config.USER_CURRENCY;
    (this.policyForm as FormGroup).controls['currency'].setValue(this.userCurrency);
    (((this.policyForm as FormGroup).controls['mileageDetails'] as FormArray).controls[0] as FormGroup).controls['currency'].setValue(this.userCurrency);
    if (this.actionType === 'edit' || this.actionType === 'clone' || this.editPolicyVal['policy'] != undefined) {
      this.widget.map((val: any) => {
        val.status = 'Y';
      });
    }
    let choosed: any = [];
    $('.cls-multiple').on('select2:unselect', (dataVal: any) => {
      let dataTrimmed: string = dataVal.params.data.text.replace(/\s+/g, '');
      // console.log(dataTrimmed,this.choosedCriteria,dataVal.params.data.text);
      (this.policyForm as FormGroup).removeControl(dataTrimmed);
      var index = this.choosedCriteria.indexOf(dataTrimmed);
      if (index !== -1) {
        this.choosedCriteria.splice(index, 1);
      }
      if (this.actionType !== 'create' || this.editPolicyVal['policy'] == undefined) {
        if (this.editPolicyVal['policy'] != undefined) {
        // if (this.editPolicyVal['policy']['categoryDetails'].length >= 1) {
          this.editPolicyVal['policy']['categoryDetails'].map((data: any, index: number) => {
            if (dataTrimmed === data.name) {
              //console.log(data.name,dataTrimmed)
              this.editPolicyVal['policy']['categoryDetails'].splice(index, 1);
            }
            //console.log(this.editPolicyVal['categoryDetails']);
          })
        }
      }
      choosed = this.choosedCriteria;
      // console.log(this.choosedCriteria,choosed,"cvvvvv");
    })
    $('.cls-select').on('select2:select', (dataVal: any) => {
      //console.log(dataVal,"ads");
      if (dataVal.target.id === 'cls-chooseExp') {
        // //console.log(id);
        let trimedVal: string = dataVal.params.data.text.replace(/\s+/g, '');
        if (this.editPolicyVal['policy'] != undefined) {
          // if (this.type !== 'create' || this.editPolicyVal['policy'] != undefined) {
          if (this.editPolicyVal['policy']['categoryDetails'].length >= 1) {
            //console.log("12");
            this.editPolicyVal['policy']['categoryDetails'].map((data: any) => {
              //console.log(data,index);
              choosed.push(data.name);
            })
          }
        }
        choosed.push(trimedVal);
        choosed = choosed.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
        this.choosedCriteria = choosed;
        this.choosedCriteria = this.choosedCriteria.filter(function (item, index, inputArray) {
          return inputArray.indexOf(item) == index;
        });
        // console.log(trimedVal,choosed,this.choosedCriteria);
        (this.policyForm as FormGroup).addControl(
          [trimedVal] as any,
          this.fb.group([])
        );
        ((this.policyForm as FormGroup).controls[trimedVal] as FormGroup).addControl('amount', new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]));
        ((this.policyForm as FormGroup).controls[trimedVal] as FormGroup).addControl('currencyAmount', new FormControl(''));
        ((this.policyForm as FormGroup).controls[trimedVal] as FormGroup).addControl('receipt', new FormControl('Y', [Validators.required]));
        if (trimedVal === 'Hotel') {
          ((this.policyForm as FormGroup).controls[trimedVal] as FormGroup).addControl('hotelPerDayViolation', new FormControl('N'));
        }
        // console.log(this.policyForm);
        // console.log(choosed,this.choosedCriteria);
        return this.choosedCriteria;
      }
    })
    //console.log(choosed);
  }
  /**
   * Edit
   */
  public editService(): void {
    console.log('true');
    console.log(this.editPolicyVal);
    // console.log(this.editPolicyVal,(Object.keys(this.editPolicyVal['policy']).length >= 1),'edit data');
    if (this.editPolicyVal['policy'] && Object.keys(this.editPolicyVal['policy']).length >= 1) {
      console.log("1");
      const data: any = this.editPolicyVal['policy'];
      for (let key of Object.keys(data)) {
        //console.log(key,data[key]);
        // console.log(key,key === 'profileGroupId',key == 'profileGroupId',"key");
        if (key === 'profileGroupId') {
          console.log(data.profileGroupName, data.overallAmount, "2");
          this.policyForm.controls.profileGroupId.setValue(data.profileGroupId);
          this.policyForm.controls.overallAmount.setValue(data.overallAmount);
        }
        else if (key === 'categoryDetails') {
          //console.log(this.editPolicyVal.categoryDetails.length,key,this.editPolicyVal);
          if (this.editPolicyVal['policy'] && this.editPolicyVal['policy'].categoryDetails.length >= 1) {
            //console.log("12");
            this.editPolicyVal['policy'].categoryDetails.map((data: any) => {
              let trimmedVal = data.name;
              (this.policyForm as FormGroup).addControl(
                [trimmedVal] as any,
                this.fb.group([])
              );
              //console.log(this.policyForm);
              ((this.policyForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('amount', new FormControl(data.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]));
              ((this.policyForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('currencyAmount', new FormControl(data.amount));
              ((this.policyForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('receipt', new FormControl(data.receipt, [Validators.required]));
              // ((this.policyForm as FormGroup).controls[trimmedVal] as FormGroup).controls('amount').setValue(data.amount);
              // ((this.policyForm as FormGroup).controls[trimmedVal] as FormGroup).controls('receipt').setValue(data.receipt);
              //console.log(data);
              if (trimmedVal === 'Hotel') {
                ((this.policyForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('hotelPerDayViolation', new FormControl(data.hotelPerDayViolation));
              }
              this.choosedCriteria.push(data.name);
              // let objVal = {
              //   category : data.name,
              //   editVal : this.overrideCityVal[data.name] = data.cityGroup
              // }
              this.overrideCityVal[data.name] = data.cityGroup
              this.addRuleUserDate[data.name] = data.addRule
              // this.overrideAlertVal = objVal;
              //console.log(this.overrideAlertVal,this.overrideCityVal,'oou')
            });
            //console.log(this.choosedCriteria,"dsds");
            setTimeout(() => {
              // $('.cls-multiple').val(this.choosedCriteria).select2();
              this.policyForm.controls['chooseCategory'].setValue(this.choosedCriteria);
              //console.log(this.policyForm.controls['chooseCategory'],"asasa");
              // console.log(this.choosedCriteria);
            }, 10);
          } else {
            setTimeout(() => {
              $('.cls-multiple').select2({
                multiple: true,
                placeholder: "All"
              });
              $('.cls-multiple').val('All').trigger('change');
            }, 10)
          }
          //console.log(this.policyForm); 
        }
        else if (key === 'mileageDetails') {
          //console.log(key,"key");
          if (data[key].length >= 1) {
            data[key].map((dataVal: any, i: number) => {
              //console.log(dataVal,i);
              if (i !== 0) {
                this.policyForm.get('mileageDetails')['controls'].push(this.setMileage());
              }
              for (let keyValue of Object.keys(dataVal)) {
                //console.log(keyValue,dataVal,i);
                if ((((this.policyForm as FormGroup).controls['mileageDetails'] as FormArray).controls[i] as FormGroup).controls[keyValue]) {
                  (((this.policyForm as FormGroup).controls['mileageDetails'] as FormArray).controls[i] as FormGroup).controls[keyValue].setValue(dataVal[keyValue]);
                }
              }
            })
          }
        } else {
          if (this.policyForm.controls[key]) {
            this.policyForm.controls[key].setValue(data[key]);
          }
        }
      }
      (this.policyForm as FormGroup).controls['startDate'].setValue(this.datepipe.transform(this.editPolicyVal['policy']['startDate'], 'dd, MMM y'));
      (this.policyForm as FormGroup).controls['endDate'].setValue(this.datepipe.transform(this.editPolicyVal['policy']['endDate'], 'dd, MMM y'));
    }
    if(this.actionType === 'clone'){
      this.policyForm.controls['policyName'].reset();
      this.policyForm.controls['profileGroupId'].reset();
      this.editPolicyVal['policy'].policyId = '';
    }
  }

  /**
   * set category currency amount
   */
  public setCategoryAmount(type: string) {
    if (type === 'overall') {
      let amt = this.policyForm.controls.overallAmount.value;
      //console.log(amt ,'amt');
      setTimeout(() => {
        this.policyForm.controls.currencyAmount.setValue(amt);
      }, 10);
    }
    else if (type === 'category') {
      this.choosedCriteria.map((data: any) => {
        let amt = ((this.policyForm as FormGroup).controls[data] as FormGroup).controls.amount.value;
        ((this.policyForm as FormGroup).controls[data] as FormGroup).controls.currencyAmount.setValue(amt);
      });
    }
    //   else if(type === 'milage'){
    //     let amt = (((this.policyForm as FormGroup).controls['mileageDetails'] as FormArray).controls[0] as FormGroup).controls.mileageCurrencyAmount.value;
    //     (((this.policyForm as FormGroup).controls['mileageDetails'] as FormArray).controls[0] as FormGroup).controls.mileageCurrencyAmount.setValue(amt);
    //   }
    //   //console.log('amt');
  }
  /**
   * Redirect
   */
  public redirectList(): void {
    this.policyFormClose.emit(false);
  }
  /**
   * Desc : select2 initialize
   */
  public select2(): void {
    // $('.cls-multiple').text('Select Categories');
    var formatState = (state) => {
      //console.log(state);
      let choosedVal: any = [];
      //console.log("asasasa",$('.select2-selection__rendered .select2-selection__choice').length,this.choosedCriteria);
      $(".cls-catid .select2-selection__rendered .select2-selection__choice").each((_id, elem) => {
        //console.log(elem,id);
        let dataTrimmed: string = elem.title.replace(/\s+/g, '');
        choosedVal.push(dataTrimmed);
        //console.log(choosedVal);
        // return choosedVal;

      });

      //console.log(choosedVal,this.choosedCriteria);
      this.choosedCriteria = choosedVal;
      if (!state.id) {
        return state.text;
      }
      var $state = $('<span >' + state.element.innerHTML + '</span>');
      return $state;
    }
    //console.log("sasas")
    $('.cls-multiple').select2({
      placeholder: "All",
      templateResult: formatState
    });
  }
  /**
   * actionControl
   */
  public actionControl(type: string, index: number): void {
    //console.log(type);
    if (type === 'add') {
      this.policyForm.get('mileageDetails')['controls'].push(this.setMileage());
      //console.log(this.policyForm);
    } else {
      ((this.policyForm as FormGroup).get('mileageDetails') as FormArray).removeAt(index);
      //console.log("remove");
    }
  }
  /**
   * setMileage
   */
  public setMileage(): FormGroup {
    return this.fb.group({
      mileage: new FormControl('KM', Validators.required),
      vehicleType: new FormControl('', Validators.required),
      maxMileage: new FormControl('', Validators.pattern(/^[0-9]+$/)),
      currency: new FormControl(this.userCurrency, Validators.required),
      mileageCost: new FormControl('', [Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/)]),
      // mileageCurrencyAmount: new FormControl('')
    });
  }
  // Search Dropdown Function
  public searchDropdown(id: any): void {
    //console.log(id);
    setTimeout(() => {
      $('#' + id).focus();
    }, 100);
  }
  // search filter function
  public filterFunction(aa: any, bb: any) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(aa);
    filter = input.value.toUpperCase();
    ul = document.getElementById(bb);
    li = ul.getElementsByTagName('li');
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName('a')[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = '';
      } else {
        li[i].style.display = 'none';
      }
    }
  }
  // search filter set value function
  public setFilterValue(formcontrolName: string, value: string) {
    this.policyForm.controls[formcontrolName].setValue(value);
    //console.log(this.policyForm.value[formcontrolName],value);
  }
  /**
   * Desc : chooseDate
   */
  public chooseDate(id: string): void {
    let minDate: string =new Date().toString(); 
    if(id == 'endDate' && this.policyForm?.value['startDate'] !== undefined){minDate = this.datepipe.transform(this.policyForm.value['startDate'], 'y-MM-dd')};
    this._DatepickerService.setCalendar(id, this.policyForm, id, 0, minDate);
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
   * page change function
   */
  public pageChange(page: string): void {
    if (page === 'first') {
      let proceed: boolean = true;
      this.submitted = false;
      if (this.validation.policyName.valid && this.validation.startDate.valid && this.validation.endDate.valid && this.validation.profileGroupId.valid) {
        //console.log(this.policyForm,this.policyProfileArray['policy'],this.policyProfileArray['profile']);
        if (this.policyProfileArray['policy']?.includes(this.policyForm.controls.policyName.value) && !this.policyProfileArray['profile']?.includes(this.policyForm.controls.profileGroupId.value)) {
          toastr.error("policy name and Profile group is already mapped");
          proceed = false;
        }
        else if (!this.policyProfileArray['profile']?.includes(this.policyForm.controls.profileGroupId.value)) {
          toastr.error("profile group is already mapped");
          proceed = false;
        }
        else if (this.policyProfileArray['policy']?.includes(this.policyForm.controls.policyName.value)) {
          toastr.error("policy name is already mapped");
          proceed = false;
        }
        else if (proceed === true) {
          this.firstPage = false;
          this.secondPage = true;
          this.widget.map((val: any) => {
            //console.log(val,'val')
            if (val.no === 1) {
              val.status = 'Y';
            }
          });
          if (this.choosedCriteria.length === 0) {
            setTimeout(() => {
              $('.select2-search__field').val('All').css({ 'padding-left': '10px', 'width': '100px' });
            }, 100)
          }
          // } 
          // else{
          //   //console.log("show already policy exist");
          // }
          setTimeout(() => {
            $('.cls-multiple').select2({
              multiple: true,
              placeholder: "All"
            });
          }, 10)
        }
      } else {
        this.submitted = true;
        // console.log(this.policyForm);
        // console.log(this.policyForm,"policy");
        toastr.error("Enter all mandatory fields");
      }
      // });
      //console.log(this.policyForm);
    }
    else if (page === 'second') {
      this.submitted = false;
      let proceed: boolean = true;
      if (this.validation.currency.valid && this.validation.overallAmount.valid) {
        if (this.choosedCriteria.length > 0) {
          this.choosedCriteria.map((data: any) => {
            //console.log(data,((this.policyForm as FormGroup).controls[data] as FormGroup).controls.amount.status)
            if (((this.policyForm as FormGroup).controls[data] as FormGroup).controls.amount.status === 'INVALID') {
              proceed = false;
            }
          });
        }
      }
      else {
        proceed = false;
      }
      if (proceed === true) {
        this.secondPage = false;
        this.thirdPage = true;
        this.widget.map((val: any) => {
          if (val.no === 2) {
            val.status = 'Y';
          }
        });
      }
      else {
        toastr.error("Enter all mandatory fields");
        this.submitted = true;
        // console.log(this.policyForm,"policy");
      }
      // console.log(this.policyForm.controls.chooseCategory.value);
    }
    else if (page === 'third') {
      this.submitted = false;
      //console.log(this.policyForm,this.policyForm.status);
      if (this.policyForm.status === 'VALID') {
        //console.log(this.policyForm.status,'kiu');
        this.createPolicy('policyViolation', 'insertPolicyDetails');
      } else {
        //console.log("error")
        // console.log(this.policyForm,"policy");
        toastr.error("Enter all mandatory fields");
        this.submitted = true;
      }
    }
  }
  /**
   * updatePolicy 
   */
  public updatePolicy(): void {
    if (this.policyForm.status === 'VALID') {
      this.createPolicy('policyViolation', 'updatePolicyDetails');
    } else {
      // console.log(this.policyForm,"policy");
      this.submitted = true;
      // toastr.error("Enter all mandatory fields ");
    }
  }
  /**
   ** Create policy
   */
  public createPolicy(module: string, action: string): void {
    //console.log(this.policyForm);
    let policyFormVal: any;
    let categoryDetails: any = [];
    policyFormVal = this.policyForm.value;
    console.log(policyFormVal);
    //console.log(policyFormVal);
    for (const [key, _value] of Object.entries(policyFormVal)) {
      //console.log(key,value,"object");
      if (this.choosedCriteria.includes(`${key}`)) {
        let keyValue = `${key}`;
        categoryDetails.push(policyFormVal[keyValue])
        // categoryDetails['name'] = keyValue;
        delete policyFormVal[keyValue];
      }
    }
    // console.log(this.overrideCityVal,categoryDetails);
    categoryDetails.map((data: any, i: number) => {
      //console.log(data,i);
      categoryDetails[i]['name'] = this.choosedCriteria[i];
      for (const [key, value] of Object.entries(this.overrideCityVal)) {
        // console.log(key,value,"object");
        if (data.name === key && value) {
          categoryDetails[i]['cityGroup'] = value;
        }
      }
      for (const [key, value] of Object.entries(this.addRuleUserDate)) {
        if (data.name === key && value) {
          categoryDetails[i]['addRule'] = value;
        }
      }
    });
    // this.addRuleUserDate

    //console.log(this.choosedCriteria,categoryDetails,this.overrideCityVal);
    policyFormVal['mileageDetails'] = [];
    // //console.log(this.policyForm.controls['mileageDetails'].controls.length);
    ((this.policyForm as FormGroup).controls['mileageDetails'] as FormArray).controls.map((data: any) => {
      policyFormVal['mileageDetails'].push(data.value);
    })
    // var profileGroupVal =[];
    // $('#profileGroup').select2('data').map((index: any)=>{
    //   profileGroupVal.push(index.id);
    //      //console.log(index,profileGroupVal)
    // })
    policyFormVal['chooseCategory'] = this.choosedCriteria;
    policyFormVal['categoryDetails'] = categoryDetails;
    console.log(policyFormVal);
    
    if (this.actionType === 'edit' || this.editPolicyVal['policy'] != undefined) {
      policyFormVal['policyId'] = this.editPolicyVal['policy'].policyId;
    }
    policyFormVal['endDate'] = this.datepipe.transform(policyFormVal['endDate'], 'y-MM-dd');
    policyFormVal['startDate'] = this.datepipe.transform(policyFormVal['startDate'], 'y-MM-dd');
    console.log(policyFormVal);

    this.appService.httpPost(module, policyFormVal, action, '', true).subscribe((data:any) => {
      this.emitListStatus.emit(data.content);
      this.policyFormClose.emit(false);
    });
  }
  /**
   * previous page change function
   */
  public previousPage(page: string) {
    if (page === 'first') {
      // this.firstPage = false;
    }
    else if (page === 'second') {
      this.firstPage = true;
      this.secondPage = false;
    }
    else if (page === 'third') {
      this.secondPage = true;
      this.thirdPage = false;
    }
  }
  /**
   * validation
   */
  get validation() {
    return this.policyForm.controls;
  }
  /**
   * form array validation
   */
  get mileageValidation() {
    return (this.policyForm.get('mileageDetails') as FormArray).controls;
  }
  /**
   * open override
   */
  public openOverride(data: any) {
    this.overrideAmount = true;
    let objVal = {
      category: data,
      editVal: this.overrideCityVal
    }
    this.overrideAlertVal = objVal;
    //console.log(this.overrideAlertVal);
  }
  /**
     * override output value 
     */
  public overrideVal(data: any) {
    console.log(data, 'choosed');
    if (data.length > 0) {
      this.overrideCityVal[this.overrideAlertVal.category] = data;
      // console.log(this.overrideCityVal);
      this.overrideAmount = false;
    }
    else if (data.length === 0) {
      this.overrideCityVal[this.overrideAlertVal.category] = [];
      this.overrideAmount = false;
    }
    else {
      this.overrideAmount = false;
    }
  }
  /**
   * open add rule
   *  
   */
  public openAddRule(data: any) {
    this.addRule = true;
    let objVal = {
      category: data,
      editVal: this.addRuleUserDate
    }
    this.addRuleAlertVal = objVal;
  }
  /**
   * override output value 
   */
  public addRuleVal(data: any) {
    console.log(data, 'selected');
    if (data.status) {
      this.addRuleUserDate[this.addRuleAlertVal.category] = data;
      console.log(this.addRuleUserDate, 'addRule');
      this.addRule = false;
      // this.editService();
    }
    else {
      this.addRule = false;
    }
  }
  /**
   * receipt mandatiory status change
   */
  public changeStatus(data: any, type: string) {
    // console.log(data,type);
    switch (type) {
      case 'overall':
        if (this.policyForm.controls['receiptMandatory'].value === 'Y' || this.policyForm.controls['receiptMandatory'].value === true) {
          setTimeout(() => {
            this.policyForm.controls['receiptMandatory'].setValue('N');
            this.policyForm.value['receiptMandatory'] === 'N'
            //console.log(this.policyForm.controls['receiptMandatory']);
          }, 10)
        }
        else {
          setTimeout(() => {
            this.policyForm.controls['receiptMandatory'].setValue('Y');
          }, 10);
        }
        break;
      case 'Hotel':
        if (this.policyForm.controls[data].value['hotelPerDayViolation'] === 'Y' || this.policyForm.controls[data].value['hotelPerDayViolation'] === true) {
          setTimeout(() => {
            ((this.policyForm as FormGroup).controls[data] as FormArray).controls['hotelPerDayViolation'].setValue('N');
          }, 10);
        }
        else {
          setTimeout(() => {
            ((this.policyForm as FormGroup).controls[data] as FormArray).controls['hotelPerDayViolation'].setValue('Y');
          }, 10);
        }
        break;
      default:
        if (this.policyForm.controls[data].value['receipt'] === 'Y' || this.policyForm.controls[data].value['receipt'] === true) {
          setTimeout(() => {
            ((this.policyForm as FormGroup).controls[data] as FormArray).controls['receipt'].setValue('N');
          }, 10);
        }
        else {
          setTimeout(() => {
            ((this.policyForm as FormGroup).controls[data] as FormArray).controls['receipt'].setValue('Y');
          }, 10);
        }
        break;
    }
    // if(type ==='overall'){
    //   if(this.policyForm.controls['receiptMandatory'].value === 'Y' || this.policyForm.controls['receiptMandatory'].value === true){
    //     setTimeout(()=>{
    //       this.policyForm.controls['receiptMandatory'].setValue('N');
    //       this.policyForm.value['receiptMandatory'] === 'N'
    //       //console.log(this.policyForm.controls['receiptMandatory']);
    //     },10)
    //   }
    //   else{
    //     setTimeout(()=>{
    //     this.policyForm.controls['receiptMandatory'].setValue('Y');
    //     },10);
    //   }
    // }
    // else if(type ==='Hotel'){
    //   if(this.policyForm.controls[data].value['check'] === 'Y' || this.policyForm.controls[data].value['check'] === true){
    //     setTimeout(()=>{
    //     ((this.policyForm as FormGroup).controls[data] as FormArray).controls['check'].setValue('N');
    //     },10);
    //   }
    //   else{
    //     setTimeout(()=>{
    //     ((this.policyForm as FormGroup).controls[data] as FormArray).controls['check'].setValue('Y');
    //     },10);
    //   }
    // } 
    // else{
    //   //console.log( this.policyForm);
    //   if(this.policyForm.controls[data].value['receipt'] === 'Y' || this.policyForm.controls[data].value['receipt'] === true){
    //     setTimeout(()=>{
    //     ((this.policyForm as FormGroup).controls[data] as FormArray).controls['receipt'].setValue('N');
    //     },10);
    //   }
    //   else{
    //     setTimeout(()=>{
    //     ((this.policyForm as FormGroup).controls[data] as FormArray).controls['receipt'].setValue('Y');
    //     },10);
    //   }
    // }
  }
  /**
   * check profile group name
   */
  public checkProfileName(type: string) {
    //console.log(this.policyForm.controls.policyName.value,this.policyForm.controls.profileGroupId.value);
    if (type === 'policy') {
      //console.log(this.policyProfileArray['policy']);
      if (this.policyProfileArray['policy'].includes(this.policyForm.controls.policyName.value)) {
        toastr.error("policy name is already used");
      }
    }
    else {
      // console.log(this.policyProfileArray['profile']);
      if (!this.policyProfileArray['profile'].includes(this.policyForm.controls.profileGroupId.value)) {
        toastr.error("profile group is already mapped");
      }
    }
  }
}
