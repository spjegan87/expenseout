import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppService } from './../../core-module/services/app.service';
import { LocationService } from './../../core-module/services/location.service';
import { DatepickerService } from './../../core-module/services/datepicker.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { config } from './../../core-module/config/app';
import { urlConfig } from './../../core-module/config/url';
import { DomSanitizer } from '@angular/platform-browser';
declare var $: any;
declare var toastr: any;
declare var feather: any;
declare function showLoader(): any;
declare function hideLoader(): any;
/**
 * Author: Padma Priya CK.,Naveen
 * Module : Expense Form
 * Powered by : Infiniti software solutions
 */
@Component({
  selector: 'app-expense-form',
  templateUrl: './expense-form.component.html',
  styleUrls: ['./expense-form.component.scss']
})
export class ExpenseFormComponent implements OnInit, AfterViewInit {
  public url: any = {};
  /**
   * Desc breadcrumb
   */
  // public breadcrumb: any = [];
  /**
   * open create report flag
   */
  public createReport: boolean = false;
  /**
   * Desc : expense
   */
  public expense: any = [];
  /**
   * category list
   */
  public categoryList: any = [];
  /**
   * mileageTrueJson
   */
  public mileageTrueJson: any = [];
  /**
   * mileage
   */
  public mileageDetails: any = [];
  /**
   * select value variable
   */
  public selectVal: any;
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * gendrate controls variable
   */
  public generateControl: any;
  /**
   * report title
   */
  public reportTitle: string;
  /**
   * exchangeRate
   */
  public exchangeRateVal: any = {};
  /**
   * ExistingReport
   */
  public ExistingReport: boolean;
  /**
   * currenct variable
   */
  public currency: any = [];
  /**
   * Desc : existing report array
   */
  public reportExist: any = [];
  /**
   * MileagepolicyViolate
   */
  public mileagePolicyViolate: boolean = false;
  /**
   * get image path
   */
  @Input() public scanUrl: any = {};
  /**
   * Data Format Save
   */
  public categoryResponse: any = [];
  /**
   * data
   */
  @Input() public responseData: any;
  /**
   * Desc: submitted
   */
  public submitted: boolean = false;
  /**
   * Desc: choosedexisting Report val
   */
  public choosedReport: any = {};
  /**
   * policy date
   */
  public policyDate: any;
  public policyAmount: any;
  /**
   * policy flag
   */
  public policyLoader: boolean = false;
  /**
   * policy data variable
   */
  public policyData: any;
  /**
   * policy data Array
   */
  public policyArray: any = [];
  /**
   * policy show variable
   */
  public policyShow: any = false;
  /**
   * Report fields
   */
  public reportFields: any = [];
  /**
   * report name array
   */
  public reportName: any = [];
  /**
   * getValue
   */
  @Output() public getValue: EventEmitter<boolean> = new EventEmitter();
  /**
   * imageResponse
   */
  @Output() public imageResponse: EventEmitter<boolean> = new EventEmitter();
  /**
   * min date
   */
  public minDate: any = '';
  /**
   * max date
   */
  public maxDate: any = '';
  /**
* trip StartDate
*/
  public tripStartDate: any = '';
  /**
   * trip End Date
   */
  public tripEndDate: any = '';
  /**
   * constructor
   */
  constructor(private sanitizer: DomSanitizer, private fb: FormBuilder, public datepipe: DatePipe, private appService: AppService,
    private _DatepickerService: DatepickerService, private autocompleteCity: LocationService, private router: Router
  ) { }
  /**
   * DEsc : form group
   */
  public categoryForm: FormGroup = this.fb.group({
    category: new FormControl('', Validators.required),
    reimbursable: new FormControl('Y', Validators.required),
    expensedate: new FormControl('', Validators.required),
    merchantname: new FormControl(''),
    currency: new FormControl('', Validators.required),
    amount: new FormControl('', Validators.required),
    currencyAmount: new FormControl(),
    exchangeRate: new FormControl(),
    reason: new FormControl('', Validators.required)
  });
  public ngAfterViewInit(): void {
    feather.replace();
    if (this.scanUrl.type === 'application/pdf') {
      $('embed').css('width', '100%');
    } else {
      $('#scanedimg').zoom({ on: 'grab' });
    }
  }
  /**
   * ngoninit
   */
  public async ngOnInit() {
    // showLoader();
    if (window.localStorage.getItem("report") == undefined || window.localStorage.getItem("report") == null) {
      let data = await this.appService.httpPost('customFieldData', { type: 'report' }, 'fetchCustomField', 'false').toPromise();
      this.reportFields = data.content.customData;
      let encryptData = this.appService.dataEncryption(JSON.stringify(this.reportFields));
      window.localStorage.setItem("report", encryptData);
    }
    else {
      let decrypt = window.localStorage.getItem("report");
      this.reportFields = this.appService.dataDecrypt(decrypt);
      this.reportFields = JSON.parse(this.reportFields);
    }

    this.reportFields?.map((data: any) => {
      if (data.required === true) {
        this.categoryForm.addControl(data.id, new FormControl('', [Validators.required]));
      } else {
        this.categoryForm.addControl(data.id, new FormControl(''));
      }
    })
    // });

    this.userCurrency = config.USER_CURRENCY;
    (this.categoryForm as FormGroup).controls['currency'].setValue(this.userCurrency);
    this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.scanUrl.path);
    // setTimeout (() => {
    //   if(this.scanUrl.type === 'application/pdf'){
    //     $('embed').css('width','100%');
    //   } else{
    //     $('#scanedimg').zoom({ on:'grab' });
    //   }
    //   // feather.replace();
    // },10);
    // console.log('Called initial...'); 
    this.categoryCall();
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

    // this.appService.httpPost('currencyList', {}, 'getList', 'false').subscribe((data) => {
    //   this.currency = data.content.currencyList;
    // this.categoryCall();
    // this.selectVal = 0;
    // });

    // console.log('Called...');

    this.selectVal = 0;
    // });
    this.appService.httpPost('expenseActions', {}, 'checkReportExsitsName', 'false').subscribe((data) => {
      this.reportName = data.content;
    });
  }
  /**
   * Desc : chooseDate
   */
  public chooseDate(id: string): void {
    // console.log(id,this.categoryForm,id,0,'','');
    switch (id) {
      case 'expensedate':
        this.minDate = '';
        this.maxDate = '';
        break;
      case 'hotelCheckIn':
        this.minDate = '';
        this.maxDate = (this.categoryForm as FormGroup).controls['hotelCheckOut'].value;
        break;
      case 'hotelCheckOut':
        this.minDate = (this.categoryForm as FormGroup).controls['hotelCheckIn'].value;
        this.maxDate = '';
        break;
      case 'tripStartDate':
        this.minDate = '';
        this.maxDate = (this.categoryForm as FormGroup).controls['tripEndDate'].value;
        break;
      case 'tripEndDate':
        this.minDate = (this.categoryForm as FormGroup).controls['tripStartDate'].value;
        this.maxDate = '';
        break;
      case 'trainOnwardDate':
        this.minDate = '';
        this.maxDate = (this.categoryForm as FormGroup).controls['trainReturnDate'].value;
        break;
      case 'trainReturnDate':
        this.minDate = (this.categoryForm as FormGroup).controls['trainOnwardDate'].value;
        this.maxDate = '';
        break;
      case 'airOnwardDate':
        this.minDate = '';
        this.maxDate = (this.categoryForm as FormGroup).controls['airReturnDate'].value;
        break;
      case 'airReturnDate':
        this.minDate = (this.categoryForm as FormGroup).controls['airOnwardDate'].value;
        this.maxDate = '';
        break;
      case 'busOnwardDate':
        this.minDate = '';
        this.maxDate = (this.categoryForm as FormGroup).controls['busReturnDate'].value;;
        break;
      case 'busReturnDate':
        this.minDate = (this.categoryForm as FormGroup).controls['busOnwardDate'].value;
        this.maxDate = '';
        break;
    }
    this._DatepickerService.setCalendar(id, this.categoryForm, id, 0, this.minDate, this.maxDate);
    // this._DatepickerService.setCalendar(id,this.categoryForm,id,0,'',new Date().toString());

  }
  /**
   * dateChangeCurrency
   */
  public dateChangeCurrency(): void {
    (this.categoryForm as FormGroup).controls['expensedate'].valueChanges.subscribe(_value => {
      //console.log(value);
      this.currencyService();
    });
    //console.log((this.categoryForm as FormGroup).controls['category'].value);
    setTimeout(() => {
      this.mileageService();
    }, 200);
  }
  /**
   * Mileage JSON
   */
  public mileageService(): void {
    if ((this.categoryForm as FormGroup).controls['category'].value === 'Mileage' && ((this.categoryForm as FormGroup).controls['expensedate'].value !== null)) {
      const formData = {
        "Mileage": [{
          "mileageDetailsJsonRequired": "Yes",
          "expenseDate": (this.categoryForm as FormGroup).controls['expensedate'].value,
        }],
        "userId": config.USER_ID
      }
      this.appService.httpPost('policyViolation', formData, 'checkPolicyViolation').subscribe((data) => {
        //console.log(data);
        this.mileageTrueJson = JSON.parse(JSON.stringify(data.content.mileageDetails));
        this.mileageDetails = data.content.mileageDetails;
        let mileUnique: any = [];
        var vehicle = this.mileageDetails.map(function (obj) { return obj.vehicleType; });
        vehicle = vehicle.filter(function (v, i) {
          //console.log(v,i,vehicle.indexOf(v) == i);
          if (vehicle.indexOf(v) == i) {
            mileUnique.push(i);
          }
          return vehicle.indexOf(v) == i;
        });
        let mileValue: any = [];
        //console.log(mileUnique,vehicle,"ages");
        mileUnique.map((dataVal: any) => {
          mileValue.push(this.mileageDetails[dataVal]);
        })
        //console.log(mileValue);
        this.mileageDetails = mileValue;
      });
      (this.categoryForm as FormGroup).addControl('vehicleType', this.fb.control('', [Validators.required]));
    }
  }
  /**
   * Desc: currencyCall
   */
  public currencyService(): void {
    this.onBlurEvent();
    let val;
    if (((this.categoryForm as FormGroup).controls['expensedate'].value) === '') {
      val = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    } else {
      val = (this.categoryForm as FormGroup).controls['expensedate'].value;
    }
    const dataReq: any = {
      "userCurrency": this.userCurrency,
      "convertCurrency": (this.categoryForm as FormGroup).controls['currency'].value,
      "date": val
    }
    this.appService.httpPost('currencyConversion', dataReq, 'convert', 'true').subscribe((data) => {
      this.exchangeRateVal = JSON.parse(JSON.stringify(data.content));
      (this.categoryForm as FormGroup).controls['exchangeRate'].setValue(this.exchangeRateVal.exchangeRate);
      // this.exchangeAmount = this.exchangeRateVal.exchangeRate;
      let amount: any = (this.categoryForm as FormGroup).controls['amount'].value;
      const currencyAmount = amount * (this.exchangeRateVal.exchangeRate);
      if (amount === '') {
        amount = 1;
      }
      if (amount !== '') {
        (this.categoryForm as FormGroup).controls['currencyAmount'].setValue(currencyAmount);
      } else {
        (this.categoryForm as FormGroup).controls['exchangeRate'].setValue(this.exchangeRateVal.exchangeRate);
      }
    });
  }
  /**
   * distanceChoosed
   */
  public distanceChoosed(): void {
    let mileageDistanceUnit = (this.categoryForm as FormGroup).controls['mileageDistanceUnit'].value;
    let mileageDistance = (this.categoryForm as FormGroup).controls['mileageDistance'].value;
    if (mileageDistanceUnit !== '' && mileageDistance !== '') {
      this.mileageTrueJson.map((data: any, index: number) => {
        //console.log(data.mileage);
        if (data.mileage === mileageDistanceUnit) {
          if (data.vehicleType === (this.categoryForm as FormGroup).controls['vehicleType'].value) {
            //console.log("if");
            //console.log(mileageDistance ,this.mileageTrueJson[index].mileageCost,data.mileageCost,data.maxMileage);
            if (mileageDistance <= data.maxMileage) {
              this.mileagePolicyViolate = false;
              (this.categoryForm as FormGroup).controls['amount'].setValue(mileageDistance * this.mileageTrueJson[index].mileageCost);
              this.amountCalculate();
              setTimeout(() => {
                this.onBlurEvent();
              }, 20)
            } else {
              this.mileagePolicyViolate = true;
              toastr.options = {
                timeOut: 1000,
                progressBar: true,
                showMethod: "slideDown",
                hideMethod: "slideUp",
                showDuration: 100,
                hideDuration: 150,
                positionClass: "toast-top-center"
              };
              toastr.error('As per policy maximum mileage is ' + data.maxMileage);
            }
            if ((this.categoryForm as FormGroup).controls['amount'].value === 0) {
              (this.categoryForm as FormGroup).controls['currencyAmount'].setValue(0);
            }
          }
        }
      })
    }
  }
  /**
   * amountCalculate
   */
  public amountCalculate(): void {
    const amount = ((this.categoryForm as FormGroup).controls['amount'].value) * ((this.categoryForm as FormGroup).controls['exchangeRate'].value);
    (this.categoryForm as FormGroup).controls['currencyAmount'].setValue(amount);;
    this.onBlurEvent();
  }
  /**
   * Desc : service call categoy json
   */
  public categoryCall(): void {
    this.appService.httpPost('formCategoryJson', {}, 'fetchRecords', 'false').subscribe((data) => {
      
      this.appService.httpPost('expenseValut', {}, 'getReportDetails', 'false').subscribe((data) => {
        this.reportExist = data;
        // console.log('Report Details',this.reportExist);
        hideLoader();
      });
      this.expense = data.content.fieldsJson;
      this.categoryResponse = data.content.fieldsJson[0].components;
      this.expense[0].components.map((data: any, index: number) => {
        if (data.category === this.responseData.categoryName) {
          if (this.responseData.expenseDate !== 'N/A') {
            var expenseDate = this.datepipe.transform(this.responseData.expenseDate, 'dd, MMM y');
          } else {
            var expenseDate = this.datepipe.transform(new Date(), 'dd, MMM y')
          }
          setTimeout(() => {
            this.changeCategory(index);
            if (this.responseData.categoryName === 'Mileage') {
              const formData = {
                "Mileage": [{
                  "mileageDetailsJsonRequired": "Yes",
                  "expenseDate": this.datepipe.transform(expenseDate, 'yyyy-MM-dd'),
                }],
                "userId": config.USER_ID
              }
              this.appService.httpPost('policyViolation', formData, 'checkPolicyViolation', 'false').subscribe((data) => {
                hideLoader();
                this.mileageTrueJson = JSON.parse(JSON.stringify(data.content.mileageDetails));
                this.mileageDetails = data.content.mileageDetails;
                let mileUnique: any = [];
                var vehicle = this.mileageDetails.map(function (obj) { return obj.vehicleType; });
                vehicle = vehicle.filter(function (v, i) {
                  if (vehicle.indexOf(v) == i) {
                    mileUnique.push(i);
                  }
                  return vehicle.indexOf(v) == i;
                });
                let mileValue: any = [];
                mileUnique.map((dataVal: any) => {
                  mileValue.push(this.mileageDetails[dataVal]);
                })
                this.mileageDetails = mileValue;
              });
            } else {
              hideLoader();
            }
            if (this.responseData['customData']) {
              for (var key1 in this.responseData.customData) {
                if (key1 === 'vehicleType') {
                  (this.categoryForm as FormGroup).addControl('vehicleType', this.fb.control('', [Validators.required]));
                }
                if ((this.categoryForm as FormGroup).controls[key1]) {
                  (this.categoryForm as FormGroup).controls[key1].setValue(this.responseData['customData'][key1]);
                }
              }
            }
          }, 10);
          if (this.responseData.policy) {
            if (this.responseData.policy[0].expenseAmount) {
              this.policyShow = 'Y';
              this.policyData = this.responseData.policy[0];
              (this.categoryForm as FormGroup).controls['reason'].setValue(this.responseData.policy[0].reason);
            }
            if (this.responseData.policy[0].length === 0) {
              this.policyShow = 'N';
            }
          }
          (this.categoryForm as FormGroup).controls['category'].setValue(this.responseData.categoryName);
          if (this.responseData.expenseDate !== 'N/A') {
            (this.categoryForm as FormGroup).controls['expensedate'].setValue(expenseDate);
          }
          if (this.responseData.reimbursable) {
            (this.categoryForm as FormGroup).controls['reimbursable'].setValue(this.responseData.reimbursable);
          }
          if (this.responseData.merchantName !== 'N/A') {
            (this.categoryForm as FormGroup).controls['merchantname'].setValue(this.responseData.merchantName);
          }
          if (this.responseData.currency) {
            (this.categoryForm as FormGroup).controls['currency'].setValue(this.responseData.currency);
          }
          (this.categoryForm as FormGroup).controls['amount'].setValue(this.responseData.totalAmount);
          if (this.responseData.currencyAmount) {
            (this.categoryForm as FormGroup).controls['currencyAmount'].setValue(this.responseData.currencyAmount);
            this.onBlurEvent();
          } else {
            (this.categoryForm as FormGroup).controls['currencyAmount'].setValue(this.responseData.totalAmount);
            this.onBlurEvent();
          }
          const exchangeSetVal = ((this.categoryForm as FormGroup).controls['currencyAmount'].value) / ((this.categoryForm as FormGroup).controls['amount'].value);
          (this.categoryForm as FormGroup).controls['exchangeRate'].setValue(exchangeSetVal);
        }
        else {
          this.selectVal = '';
        }
        if (data.category !== 'Allowance') {
          this.categoryList.push({
            id: index,
            value: data.category
          })
        }
      });
    });
  }
  /**
   * string validation
   */
  public stringValidation(event: any) {
    const strOnly = /^[A-Za-z ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!strOnly.test(inputChar)) {
      event.preventDefault();
    }
  }
  /**
   * citySearch
   */
  public citySearch(id: string): void {
    const searchLength = (this.categoryForm as FormGroup).controls[id].value;
    this.autocompleteCity.autoComplete(id, (this.categoryForm as FormGroup), id, searchLength, 'placesApi');
  }
  //open create report
  public openReport(val: string) {
    this.createReport = true;
    $('.cls-opacity').addClass('fn-opacity');
    if (val === 'Existing') {
      this.reportTitle = "Select Existing Report";
      this.ExistingReport = true;
    }
    else {
      this.reportTitle = "Create New Report";
      this.ExistingReport = false;
      this.appService.httpPost('expenseActions', { "userId": config.USER_ID }, 'reportNameGenerator').subscribe((data: any) => {
        this.categoryForm.controls.reportname.setValue(data.content.result.reportname);
      })  
    }
    this.submitted = true;
  }
  //close create report
  public closeReport(val: string = '') {
    if (val == 'mobile') {
      $('.cls-create-report-container').addClass('cls-close-ani');
      setTimeout(() => {
        this.createReport = false;
        $('.cls-create-report-container').removeClass('cls-close-ani');
      }, 400);
    }
    else {
      this.createReport = false;
      $('.cls-opacity').removeClass('fn-opacity');
    }
  }
  //open image container
  public openImageCont() {
    this.getValue.emit(false);
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
    this.categoryForm.controls[formcontrolName].setValue(value);
    if(value === 'select'){
			// console.log(value);
			this.categoryForm.controls[formcontrolName].reset();
		}
    if (formcontrolName === 'currency') {
      this.currencyService();
    }
    if (this.categoryForm.controls['category'].value === 'Mileage') {
      if (this.categoryForm.controls['amount'].value !== '') {
        this.onBlurEvent();
      }
      this.distanceChoosed();
    }
  }

  /**
   * change category
   */
  public changeCategory(event: any) {
    this.submitted = false;
    this.selectVal = event;
    this.onBlurEvent();
    this.expense[0].components[this.selectVal].components.map((data: any) => {
      if (data.required === 'true') {
        this.categoryForm.addControl(data.id, new FormControl('', [Validators.required]))
      }
      else {
        this.categoryForm.addControl(data.id, new FormControl(''))
      }
    });
    this.removeControls();
    setTimeout(() => {
      if (this.categoryForm.controls['category'].value === 'Mileage') {
        this.mileageService();
      }
    }, 100)
  }
  /**
   * Desc : getReportValue
   */
  public getReportValue(index: number): void {
    this.choosedReport = this.reportExist.content[index];
    $('.cls-reports-strip').removeClass('active');
    $('.cls-reportactive' + index).addClass('active');
  }
  public save() {
    let dynamicField: any = [];
    this.reportFields.map((datadefault: any) => {
      if (datadefault.default_field != 'true') {
        dynamicField.push(datadefault.id);
      }
    });
    // console.log(dynamicField,this.categoryForm.value);
  }

  /**
   * saveExpense
   */
  public saveExpense(type: string): void {
    let proceed: boolean = true;
    if (this.mileagePolicyViolate === true) {
      proceed = false;
      toastr.error("Max mileage policy violated");
    }
    if (this.categoryForm.controls.reason) {
      this.policyArray.reason = this.categoryForm.controls.reason.value;
    }

    let val: any = {};
    switch (type) {
      case 'existing':
        this.reportFields.map((datadefault: any) => {
          this.categoryForm.removeControl(datadefault.id);
        });
        // console.log(this.reportFields);
        if (this.choosedReport.reportId) {
          val = this.choosedReport;
        } else {
          proceed = false;
          toastr.error("Choose Existing Report to add");
        }
        break;
      case 'new':
        // console.log(this.reportForm.status,"status")
        if (this.categoryForm.status !== 'VALID') {
          proceed = false;
          toastr.error("Enter mandatory fields to create new report");
        } else {
          // val['reportname'] = this.reportForm.value.reportname;
          // val['description'] =this.reportForm.value.description;
          let staticField: any = [];
          let dynamicField: any = [];
          this.reportFields.map((datadefault: any) => {
            if (datadefault.default_field === 'true') {
              staticField.push(datadefault.id);
            } else {
              dynamicField.push(datadefault.id);
            }
          });
          staticField.map((staticData: any) => {
            val[staticData] = this.categoryForm.value[staticData];
          });
          val['reportCustomData'] = {};
          dynamicField.map((dynamicData: any) => {
            if (this.categoryForm.value[dynamicData]) {
              val['reportCustomData'][dynamicData] = this.categoryForm.value[dynamicData];
            }
          });
        }
        break;
      case 'save':
        this.reportFields.map((datadefault: any) => {
          this.categoryForm.removeControl(datadefault.id);
        });
        break;
    }
    if (proceed === true) {
      const categoryVal = this.categoryForm.controls['category'].value;
      val[categoryVal] = [this.categoryForm.getRawValue()];
      val['imageid'] = [[{ "path": this.scanUrl.path, "receiptId": this.scanUrl.receiptId }]];
      val['policy'] = [this.policyArray];
      let TempKeyValues = [];
      this.categoryResponse.map((data: any) => {
        if (data.category == categoryVal) {
          data.components.map((idData: any) => {
            TempKeyValues.push(idData.id);
          })
        }
      });
      if (categoryVal === 'Mileage') {
        TempKeyValues.push('vehicleType');
      }
      val[categoryVal].map((data: any, index: number) => {
        let customData = {};
        for (const [key, value] of Object.entries(data)) {
          if (TempKeyValues.includes(`${key}`)) {
            let keyValue = `${key}`;
            let dataVal = `${value}`;
            let tempVal = { [keyValue]: dataVal };
            customData = Object.assign(customData, tempVal);
            delete data[keyValue]
          }
        }
        val[categoryVal][index].customData = JSON.parse(JSON.stringify(customData));
      });
      if (this.categoryForm.valid) {
        if (type === 'save') {
          if (this.responseData['expenseId']) {
            val['expenseId'] = this.responseData['expenseId'];
          }
          this.appService.httpPost('expenseValut', val, 'saveExpense','',true).subscribe((data) => {
            if (data.content.error) {
              console.log(val);
              this.reportFields.map((datadefault: any) => {
                this.categoryForm.addControl(datadefault.id, new FormControl('', [Validators.required]));
              });
            }
            else {
              this.imageResponse.emit(data);
            }
          });
        }
        else if (type === 'existing' || type === "new") {
          if (type === "new" && this.reportName.includes(this.categoryForm.controls.reportname.value)) {
            toastr.error("Report name already exist");
          }
          else {
            // console.log(val,categoryVal,val.reportCustomData.tripEndDate, this.categoryForm.controls.tripStartDate.value);
            let reportValid: any = false;
            let dynamicDateField: any = [];
            this.reportFields.map((datadefault: any) => {
              if (datadefault.default_field === 'false') {
                dynamicDateField.push(datadefault.id);
              }
            });
            if (dynamicDateField.length > 0) {
              val[categoryVal].map((valData: any): any => {
                // console.log(valData);
                // console.log(Object.keys(valData.customData ).length)
                if (Object.keys(valData.customData).length != 0) {
                  let count = 0;
                  for (const [key, value] of Object.entries(valData.customData)) {
                    let valuDate = this.parseDate(value);
                    // console.log(aaa,'type');
                    // console.log(typeof(aaa), aaa instanceof Date);
                    if (valuDate instanceof Date) {
                      // console.log(key);
                      var fDate, lDate, cDate;
                      fDate = new Date(val.reportCustomData.tripStartDate); // firstdate
                      cDate = new Date(this.categoryForm.controls[key].value); // date from form
                      lDate = new Date(val.reportCustomData.tripEndDate);
                      lDate.setDate(lDate.getDate()); // lastdate
                      // console.log(fDate,cDate,lDate)
                      count++;
                      if (Date.parse(cDate) >= Date.parse(fDate) && Date.parse(cDate) <= Date.parse(lDate)) {
                        // console.log('in');
                        reportValid = true;
                      }
                      else {
                        // console.log('out')
                        reportValid = false;
                        toastr.error(key + " should be inbetween to (" + this.datepipe.transform(fDate, 'dd, MMM y') + ' to ' + this.datepipe.transform(lDate, 'dd, MMM y') + ' )');
                        return false;
                      }
                    }
                    else {
                      // console.log(count);
                      if (count === 0) {
                        reportValid = true;
                      }
                    }
                  }
                }
                else {
                  reportValid = true;
                }
              });
            }
            else {
              reportValid = true
            }
            // console.log(reportValid,'not satisfied');
            if (reportValid === true) {
              // console.log(reportValid,val,'satisfied');
              this.appService.httpPost('expenseValut', val, 'addToReport','',true).subscribe((data) => {
                // console.log(val,data);
                if (!data.content.error) {
                  // console.log(data);
                  const val = { "reportname": data.content.reportname, "reportCode": data.content.reportCode }
                  this.router.navigate([
                    './' +
                    urlConfig.ROUTES.home +
                    '/' +
                    urlConfig.ROUTES.createExpense
                  ],
                    {
                      state: {
                        reportid: val,
                        path: "user"
                      }
                    });
                }
              });
            }
            if (type === 'existing') {
              this.reportFields.map((datadefault: any) => {
                this.categoryForm.addControl(datadefault.id, new FormControl('', [Validators.required]));
              });
            }
          }
        }
      }
      this.submitted = true;
    }
  }
  /**
   * check date type
   */
  public parseDate(dateStr) {
    if (isNaN(dateStr)) { //Checked for numeric
      var dt = new Date(dateStr);
      if (isNaN(dt.getTime())) { //Checked for date
        return dateStr; //Return string if not date.
      } else {
        return dt; //Return date **Can do further operations here.
      }
    } else {
      return dateStr; //Return string as it is number
    }
  }
  /**
   * remove controls
   */
  public removeControls() {
    let tempArray = ['category', 'reimbursable', 'expensedate', 'merchantname', 'currency', 'amount', 'currencyAmount', 'exchangeRate', 'reason'];
    this.reportFields.map((datadefault: any) => {
      tempArray.push(datadefault.id);
    });
    if (this.selectVal !== '') {
      this.expense[0].components[this.selectVal].components.map((data: any) => {
        tempArray.push(data.id);
      });
      if (this.categoryForm.controls['category'].value === 'Mileage') {
        tempArray.push('vehicleType');
      }
    }
    Object.keys(this.categoryForm.controls).forEach((key) => {
      if (!tempArray.includes(key)) {
        this.categoryForm.removeControl(key);
        delete this.categoryForm.value[key];
      }
    })
    return true;
  }
  /**
   * validation
   */
  get validation() {
    return this.categoryForm.controls;
  }
  /**
	 * triggerAction
	 */
	public triggerAction(name: string): void {
		this.appService.triggerAction(name);
	}
  /**
* destinationPolicy
*/
  public destinationPolicy(formControl: string): any {
    let locationdestination: any = ['airDestination', 'trainDestination', 'hotelDestination', 'busDestination', 'taxiDestination', 'mealDestination', 'allowanceDestination', 'withbillexpensesDestination', 'withoutbillexpensesDestination'];
    if (locationdestination.includes(formControl)) {
      this.onBlurEvent();
    }
  }
  //policy violation
  public onBlurEvent(): void {
    setTimeout(() => {
      this.policyDate = this.datepipe.transform(this.categoryForm.controls.expensedate.value, 'yyyy-MM-dd');
      this.policyAmount = this.categoryForm.controls.currencyAmount.value
      // console.log(this.policyDate,this.policyAmount);
      if (this.policyDate != null && this.policyAmount != null) {
        let formData = {
          [this.categoryForm.controls.category.value]: [{
            "expenseDate": this.policyDate,
            "amount": this.policyAmount,
            "currency": this.categoryForm.controls.currency.value
          }]
        };
        let indexName: string = '';
        let indexCat = this.categoryForm.controls.category.value.toLowerCase();
        indexName = indexCat + 'Destination';
        if (this.categoryForm.controls[indexName]) {
          //console.log(this.categoryForm.controls[indexName].value,"val",indexName);
          formData[this.categoryForm.controls.category.value][0]['city'] = this.categoryForm.controls[indexName].value;
        }
        //console.log(formData);
        this.policyLoader = true;
        this.appService.httpPost('policyViolation', formData, 'checkPolicyViolation').subscribe((data) => {
          setTimeout(() => {
            this.policyLoader = false;
          }, 100)
          this.policyData = data.content;
          this.policyShow = data.content.policyDetect;
          //console.log(data,"mil");
          if (data.content.status) {
            //console.log(data)
            this.policyArray = [];
            if (data.content.policyDetect != 'N') {
              this.categoryForm.addControl('reason', this.fb.control('', [Validators.required]));
              // this.policyArray = JSON.parse(JSON.stringify(data.content));
              let objVal = {
                policyDetect: "Y",
                name: data.content.name,
                policyAmount: data.content.policyAmount,
                expenseAmount: data.content.expenseAmount,
                policyId: data.content.policyId,
                details: data.content.details,
                view: data.content.view,
                receiptMandatory: data.content.receiptMandatory,
                reason: ""
              };
              this.policyArray = JSON.parse(JSON.stringify(objVal));
            }
            else {
              this.categoryForm.removeControl('reason');
              this.policyArray = JSON.parse(JSON.stringify({}));
            }
            //console.log(this.policyArray)
            setTimeout(() => {
              this.policyLoader = false;
            }, 600);
          }
        });
      }
    }, 10)
  }
}
