import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AppService } from '../../../core-module/services/app.service';
import { DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { config } from '../../../core-module/config/app';
declare var $: any;
/**
 * Author : PadmaPriya CK 
 * Desc :  advance form
 */
@Component({
  selector: 'app-advanceform',
  templateUrl: './advanceform.component.html',
  styleUrls: ['./advanceform.component.scss']
})
export class AdvanceformComponent implements OnInit {
  /**
   * report create
   */
  @Output() public createForm: EventEmitter<any> = new EventEmitter();
  /**
   * close form
   */
  @Output() public closeForm: EventEmitter<boolean> = new EventEmitter();
  /**
   * Desc : form val edit
   */
  @Input() public editResponseForm: object = {};
  /**
   * exchangeRate
   */
  public exchangeRateVal: any = {};
  /**
   * currentAction
   */
  public currentAction: string = '';
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * confirmationContent
   */
  public confirmationContent: any = {};
  /**
   * Desc : confirmation
   */
  public confirmation: boolean = false;
  /**
   * Desc : settleform
   */
  public settleform: boolean = false;
  /**
   * Desc : tabIndexVal
   */
  public tabIndexVal: boolean = true;
  /**
   * popupVal
   */
  public popupVal: any = {
    'flag': false,
    'module': 'advanceReport',
    'action': 'previewAdvanceContent',
    'value': { 'staticContent': 'yes' },
    'currencyAmount': ''
  };
  /**
   * Field JSOn
   */
  public fieldJson: any = [];
  /**
   * currenct variable
   */
  public currency: any = [];
  /**
   * validation variable
   */
  public submitted = false;
  public currencyAmt: any;
  /**
* To send list create / update response status to settings component
*/
  @Output() public emitListStatus = new EventEmitter();
  /**
   * Form value
   */
  @Output() public emitFormValue = new EventEmitter();
  /**
   * Save & Send for approval flow
   */
  @Output() public sendForApproval = new EventEmitter();

  constructor(private appService: AppService, public datepipe: DatePipe) { }
  /**
   * report formgroup
   */
  public report: FormGroup = new FormGroup({
    // amount : new FormControl('',[Validators.required,Validators.pattern(/^[1-9][0-9]*$/)]),
    // currency: new FormControl('',Validators.required),
    // description:new FormControl('',[Validators.required,Validators.pattern(/^([a-zA-Z]+\s?)*$/) ]),
    currencyAmount: new FormControl(1),
    exchangeRate: new FormControl(1)
  });

  ngOnInit() {
    console.log(this.editResponseForm, this.editResponseForm['report'], typeof (this.editResponseForm), this.editResponseForm != undefined, "get");
    this.userCurrency = config.USER_CURRENCY;
    this.appService.httpPost('customFieldData', { "type": "advance" }, 'fetchCustomField', 'false').subscribe((data) => {
      this.fieldJson = data.content.customData;
      this.fieldJson.map((data: any) => {
        if (data.required === true) {
          this.report.addControl(data.id, new FormControl('', [Validators.required, Validators.pattern(data.pattern)]));
        } else {
          this.report.addControl(data.id, new FormControl(''));
        }
      })
      this.report.controls['currency'].setValue(this.userCurrency);
      // JSON.stringify(this.editResponseForm) !== '{}'
      //  if(this.editResponseForm['report'].length !== 0){  //c
      if (this.editResponseForm && this.editResponseForm['report'] != undefined) {
        if (this.editResponseForm['report']?.tabIndex > 2) {  //c
          this.tabIndexVal = false;
        }
        for (let keyVal of Object.keys(this.editResponseForm['report'][0])) {
          console.log(keyVal, this.editResponseForm['report'][0][keyVal]);
          if (this.report.controls[keyVal]) {
            this.report.controls[keyVal].setValue(this.editResponseForm['report'][0][keyVal]);
          }
        }
        //console.log(this.report,this.editResponseForm[0]);
        // this.report.controls['amount'].setValue(this.editResponseForm['amount']);  //c
        // this.report.controls['currency'].setValue(this.editResponseForm['currency']);  //c
        // this.report.controls['description'].setValue(this.editResponseForm['description']);  //c
        // this.report.controls['currencyAmount'].setValue(this.editResponseForm['currencyAmount']);  //c
        const exchangeRateVal = (this.report.controls['currencyAmount'].value) / (this.report.controls['amount'].value);
        // //console.log(parseFloat(exchangeRateVal.toFixed(2)),"foar");
        this.report.controls['exchangeRate'].setValue(parseFloat(exchangeRateVal.toFixed(2)))
        //console.log("sdsa",this.editResponseForm[0].amount);
        this.editResponseForm['report']['reimbursableAmount'] = this.editResponseForm['report']['currencyAmount'];   //c
        this.editResponseForm['report']['currencyType'] = 'INR';  //c
      }
    });
    //console.log(this.report,this.userCurrency);
    // this.editResponseForm['tabIndex'] =1;
    //console.log(this.editResponseForm);
    this.appService.httpPost('currencyList', {}, 'getList', 'false').subscribe((data) => {
      //console.log(data.content.currencyList,"curency")
      this.currency = data.content.currencyList;
      //console.log(this.currency);
    });
    // this.popupVal['currencyAmount'] = this.userCurrency +' '+ (this.report.value['currencyAmount'].toLocaleString());
    this.currencyAmt = "hi";
    //console.log(this.report)
    this.emitFormValue.emit(this.report.value);
  }
  /**
   * string validation
   */
  public stringValidation(event: any) {
    //console.log(event);
    const strOnly = /^[A-Za-z ]+$/;
    let inputChar = String.fromCharCode(event.charCode);
    if (!strOnly.test(inputChar)) {
      event.preventDefault();
    }
  }
  /**
 * amountCalculate
 */
  public amountCalculate(id: any): void {
    // setTimeout(() => {
    //console.log(id);
    if (id === 'amount') {
      const val = this.report.controls['amount'].value;
      const amount = val * (this.report.controls['exchangeRate'].value);
      //console.log(val,amount,this.report.controls['exchangeRate'].value)
      this.report.controls['currencyAmount'].setValue(amount);
      //console.log(this.report.controls['currencyAmount'].value,"sdassa")
    }
    // },10);
  }
  /**
   * Desc : closeAlert
   */
  public closeAlert(): void {
    this.closeForm.emit(false);
  }
  /**
   * Desc: currencyCall
   */
  public currencyService(): void {
    let val = this.datepipe.transform(new Date(), 'yyyy-MM-dd');
    const dataReq: any = {
      "userCurrency": "INR",
      "convertCurrency": this.report.controls['currency'].value,
      "date": val
    }
    //console.log(dataReq);
    this.appService.httpPost('currencyConversion', dataReq, 'convert', 'false').subscribe((data) => {
      this.exchangeRateVal = JSON.parse(JSON.stringify(data.content));
      //console.log(this.exchangeRateVal,"sdas")
      this.report.controls['exchangeRate'].setValue(this.exchangeRateVal.exchangeRate);
      const amount = this.report.controls['amount'].value;
      const currencyAmount = amount * (this.exchangeRateVal.exchangeRate);
      if (amount !== '') {
        this.report.controls['currencyAmount'].setValue(currencyAmount);
      } else {
        this.report.controls['currencyAmount'].setValue(this.exchangeRateVal.exchangeRate);
      }
      // }
    });
  }
  /**
   * popUpInfo
   */
  public popUpInfo(val: any): void {
    //console.log(val);
    this.popupVal['flag'] = false;
    //console.log(val);
    if (val.flag === true) {
      this.appService.httpPost('advanceReport', this.report.value, 'submitAdvanceReport').subscribe(() => {
        //console.log(data)
        this.createForm.emit({
          'flag': true,
          'type': 'save'
        });
      });
    }

  }
  /**
   * advanceReport
   */
  public advanceReport(type: string): void {
    //console.log(this.report);
    console.log(type);
    this.appService.checkScript(this.report.value);
    //console.log(this.appService.checkScript(this.report.value));
    if (this.appService.checkScript(this.report.value) === true) {
      //  if(this.editResponseForm['report'].length >=1){
      if (this.editResponseForm && this.editResponseForm['report'] != undefined) {
        // this.report.value['reportname'] =this.editResponseForm[0].reportname;
        this.report.value['reportCode'] = this.editResponseForm['report'][0]['reportCode'];
      }
      if (this.report.valid) {
        this.currentAction = type;
        switch (type) {
          case 'sendforapproval':
            // this.popupVal['flag'] = true;
            // this.popupVal['currencyAmount'] = this.userCurrency + ' ' + (this.report.value['currencyAmount'].toLocaleString());
            // this.currencyAmt = "hi";
            // this.appService.httpPost('advanceReport', this.report.value, 'submitAdvanceReport').subscribe((data) => {
            //   //console.log(data)
            //   this.createForm.emit({
            //     'flag' : true,
            //     'type' : 'save'
            //   });
            // });
            let formData = {
              "value":this.report.value,
              "status":true
            }
            this.sendForApproval.emit(formData);
            // this.appService.httpPost('advanceReport', this.report.value, 'submitAdvanceReport','false').subscribe((data) => {
            //   //console.log(data)
            //   // this.createForm.emit({
            //   //   'flag' : true,
            //   //   'type' : 'save'
            //   // });
            //   this.createForm.emit(data.content);
            // });
            break;
          case 'save':
            this.appService.httpPost('advanceReport', this.report.value, 'createAdvance', 'false').subscribe((data:any) => {
              console.log(data)
              // this.createForm.emit({
              //   'flag': true,
              //   'type': 'save'
              // });
              this.createForm.emit(data.content);
            });
            break;
          case 'update':
            this.appService.httpPost('advanceReport', this.report.value, 'updateAdvanceAmount', 'false').subscribe((data: any) => {
              //console.log(data)
              // this.createForm.emit({
              //   'flag' : true,
              //   'type' : 'update'
              // });
              this.emitListStatus.emit(data.content);
            });
            break;
        }
      }
      else {
        this.submitted = true;
      }
    }
    //console.log(this.report.value)
  }
  // Search Dropdown Function
  public searchDropdown(id: any) {
    setTimeout(() => {
      $("#" + id).focus();
    }, 100);
  }
  // search filter function
  public filterFunction(aa: any, bb: any) {
    this.appService.commonSearchFilter(aa, bb);
  }
  // search filter set value function
  public setFilterValue(formcontrolName: string, value: string) {
    // //console.log(this.categoryForm)
    this.report.controls[formcontrolName].setValue(value);
    if (formcontrolName === 'currency') {
      this.currencyService();
    }
    if (value === 'select') {
      // console.log(value);
      this.report.controls[formcontrolName].reset();
    }
  }
  get validation() {
    return this.report.controls;
  }
  /**
   * hide create advance form in mobile view
   */
  public closeMobileModal(): void {
    $('.cls-mbl-container').addClass('cls-close-ani');
    setTimeout(() => {
      $('.cls-advance-report-container').removeClass('d-block');
      $('.cls-mbl-container').removeClass('cls-close-ani');
    }, 400);
  }
}

