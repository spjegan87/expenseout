import { Component, Output, EventEmitter, Input, OnChanges, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { AppService } from './../../../core-module/services/app.service';
import { config } from '../../../core-module/config/app';
declare var $: any;
// declare var moment: any;
declare var toastr: any;
/**
 * Author : PadmaPriya CK 
 * Desc :  allowance
 */
@Component({
  selector: 'app-create-allowance-creation',
  templateUrl: './create-allowance-creation.component.html',
  styleUrls: ['./create-allowance-creation.component.scss']
})
export class CreateAllowanceCreationComponent implements OnInit, OnChanges {

  /**
   * currenct variable
   */
  public currency: any = [];
  /**
* exchangeRate
*/
  public exchangeRateVal: any = {};
  /**
   * input editresponse
   */
  @Input() public editResponse: object = {};
  /**
   * Desc : profile group
   */
  public profileGroupList: any;
  /**
   * desc : config currency
   */
  public userCurrency: string = '';
  /**
   * alertShow
   */
  public submitted: boolean = false;
  /**
   * open over ride variable
   */
  public overrideAmount: boolean = false;
  /**
   * choosedCriteria
   */
  public choosedCriteria: any = [];
  /**
   * city val
   */
  public overrideCityVal: any = {};
  /**
   *  override input value
   */
  public overrideAlertVal: any = {};
  /**
   * close profilegroup
   */
  @Output() public createdAllowance: EventEmitter<any> = new EventEmitter();
  /**
 * To send list create / update response status to settings component
 */
  @Output() public emitListStatus = new EventEmitter();
  constructor(private fb: FormBuilder, private appService: AppService) { }
  /**
   * DEsc : form group
   */
  public allowanceForm: FormGroup = this.fb.group({
    claimType: new FormControl('days', Validators.required),
    allowanceName: new FormControl('', Validators.required),
    description: new FormControl(''),
    currency: new FormControl('', Validators.required),
    amount: new FormControl(0),
    choosedProfile: new FormControl('')
    // currencyAmount: new FormControl('')
    // exchangeRate : new FormControl('')
  });
  // public showSelect : boolean = false;
  /**
   * onInit
   */
  // public ngOnInit(): void {
  //   this.userCurrency = config.USER_CURRENCY;
  //   console.log(this.userCurrency,this.allowanceForm,this.allowanceForm.controls,this.allowanceForm.controls['currency']);
  //   // if(this.allowanceForm.controls['currency'] && this.allowanceForm.controls['currency'] != undefined){
  //   //   this.allowanceForm.controls['currency'].setValue('INR');
  //   // }
  //   // if(this.editResponse == undefined || JSON.stringify(this.editResponse) == '{}'){
  //   //   console.log(this.userCurrency)
  //   // this.allowanceForm.controls['currency'].setValue(this.userCurrency);
  //   // }
  //   // if(JSON.stringify(this.editResponse) == '{}' && this.allowanceForm.controls['currency'] && this.allowanceForm.controls['currency'] != undefined){
  //   //   console.log(true,this.userCurrency,this.allowanceForm,"1");
  //   //   this.userCurrency = (this.userCurrency.replace(/"([^"]+(?="))"/g, '$1'));
  //   //   console.log(this.userCurrency,"2");
  //   // this.allowanceForm.controls['currency'].setValue(this.userCurrency);
  //   // }
  // }
  /**
   * onchanges
   */
  // public ngOnChanges(): void {
  //   console.log(this.editResponse,"edit");
  //   this.userCurrency = config.USER_CURRENCY;
  //   // console.log(this.userCurrency);
  //   let cur = "INR";
  //   console.log(cur,(cur.replace(/"([^"]+(?="))"/g, '$1')),this.allowanceForm,this.allowanceForm.controls,this.allowanceForm.controls['currency']);
  // this.allowanceForm.controls['currency'].setValue(cur);
  //   setTimeout(() => {
  //     $('.cls-profilegroup').select2({
  //       placeholder: "select"
  //     })
  //   }, 10);
  //   if(JSON.stringify(this.editResponse) == '{}' && this.allowanceForm.controls['currency'] && this.allowanceForm.controls['currency'] != undefined){
  //     console.log(true,this.userCurrency,this.allowanceForm,"1");
  //     this.userCurrency = (this.userCurrency.replace(/"([^"]+(?="))"/g, '$1'));
  //     console.log(this.userCurrency,"2");
  //     let cur = "INR";
  //     console.log(cur,(cur.replace(/"([^"]+(?="))"/g, '$1')));
  //   this.allowanceForm.controls['currency'].setValue(cur);
  //   }
  //   // this.allowanceForm.controls['currency'].setValue(this.userCurrency);
  //   this.appService.httpPost('profileGroupMaster', {}, 'getProfileGroups', 'false').subscribe((data) => {
  //     this.profileGroupList = data.content;
  //     if (this.editResponse['type'] === 'edit' || this.editResponse != undefined) {
  //       let editFormArray = ['claimType', 'allowanceName', 'currency', 'amount'];
  //       editFormArray.map((data: any) => {
  //        // if (this.editResponse['value'][data]) {  //this.editResponse['value'][data]
  //       //   this.allowanceForm.controls[data].setValue(this.editResponse['value'][data]);
  //       // }
  // if(this.editResponse && this.editResponse != undefined){
  //   this.allowanceForm.controls[data].setValue(this.editResponse[data]);
  // }
  //         //console.log(this.editResponse['value']);
  //       })
  // if (this.editResponse['profileGroupDetails'] && this.editResponse['profileGroupDetails'].length >= 1) {
  //   //console.log("12");
  //   this.editResponse['profileGroupDetails'].map((data: any) => {
  //     //console.log(data,index);
  //     let trimmedVal = data.profileGroupName;
  //     (this.allowanceForm as FormGroup).addControl(
  //       [trimmedVal] as any,
  //       this.fb.group([])
  //     );
  //     //console.log(this.allowanceForm);
  //     ((this.allowanceForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('amount', new FormControl(data.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]));
  //     ((this.allowanceForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('currencyAmount', new FormControl(data.amount));
  //     //console.log(data);
  //     this.choosedCriteria.push(data.profileGroupName);
  //     this.overrideCityVal[data.profileGroupName] = data.cityGroup;
  //     //console.log(this.overrideAlertVal,this.overrideCityVal,data.profileGroupName,'oou')
  //   });
  //   //console.log(this.choosedCriteria,"dsds",data,this.profileGroupList);
  //   let selectVal: any = [];
  //   this.choosedCriteria.map((criteria: any) => {
  //     this.profileGroupList.map((dataname: any) => {
  //       if (criteria === dataname.name.replace(/\s/g, '')) {
  //         selectVal.push(dataname.name)
  //       }
  //     })
  //   })
  //   // setTimeout(()=>{
  //   this.allowanceForm.controls['choosedProfile'].setValue(selectVal);
  //   //console.log(this.allowanceForm.controls['choosedProfile'],"dsdsdsdsd");     
  // }
  // }
  // });
  //   $('.cls-profilegroup').on('select2:select', (event: any) => {
  //     //console.log(event,"event");
  //     let dataTrimmed: string = event.params.data.text.replace(/\s+/g, '');
  //     //console.log(dataTrimmed,"dataTrimmed",this.choosedCriteria.includes(dataTrimmed));
  //     if (this.choosedCriteria.includes(dataTrimmed) === false) {
  //       this.choosedCriteria.push(dataTrimmed);
  //       (this.allowanceForm as FormGroup).addControl([dataTrimmed] as any, this.fb.group([]));
  //       ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('amount', new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]));
  //       ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('currencyAmount', new FormControl(''));
  //       ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('receipt', new FormControl('Y', [Validators.required]));
  //       //console.log(this.allowanceForm,"allowanceformval");
  //       this.overrideCityVal[dataTrimmed] = [];
  //     }
  //   });
  //   $('.cls-profilegroup').on('select2:unselect', (event: any) => {
  //     let dataTrimmed: string = event.params.data.text.replace(/\s+/g, '');
  //     //console.log(dataTrimmed,this.choosedCriteria,event.params.data.text);
  //     (this.allowanceForm as FormGroup).removeControl(dataTrimmed);
  //     var index = this.choosedCriteria.indexOf(dataTrimmed);
  //     if (index !== -1) {
  //       this.choosedCriteria.splice(index, 1);
  //     }
  //     //console.log(this.choosedCriteria,"cvvvvv");
  //     //console.log(this.allowanceForm,"allowanceformval");
  //   });
  // }

  //ccc
  /**
   * onInit
   */
  // public ngOnInit(): void {
  //   this.userCurrency = config.USER_CURRENCY;
  //   setTimeout(() => {
  //     $('.cls-profilegroup').select2({
  //       placeholder: "select"
  //     })
  //   }, 10);
  //   this.allowanceForm.controls['currency'].setValue(this.userCurrency);
  //   this.appService.httpPost('profileGroupMaster', {}, 'getProfileGroups', 'false').subscribe((data) => {
  //     this.profileGroupList = data.content;
  //     if (this.editResponse['type'] === 'edit' || this.editResponse && this.editResponse != undefined) {
  //       let editFormArray = ['claimType', 'allowanceName', 'currency', 'amount'];
  //       editFormArray.map((data: any) => {
  //         // if(this.editResponse['value'][data]){
  //         // if(this.editResponse && this.editResponse != undefined)
  //         this.allowanceForm.controls[data].setValue(this.editResponse[data]);
  //         // }
  //         //console.log(this.editResponse['value']);
  //       })
        // if (this.editResponse && this.editResponse['profileGroupDetails'].length >= 1) {
        //   //console.log("12");
        //   this.editResponse['profileGroupDetails'].map((data: any) => {
  //           //console.log(data,index);
  //           let trimmedVal = data.profileGroupName;
  //           (this.allowanceForm as FormGroup).addControl(
  //             [trimmedVal] as any,
  //             this.fb.group([])
  //           );
  //           //console.log(this.allowanceForm);
  //           ((this.allowanceForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('amount', new FormControl(data.amount, [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]));
  //           ((this.allowanceForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('currencyAmount', new FormControl(data.amount));
  //           //console.log(data);
  //           this.choosedCriteria.push(data.profileGroupName);
  //           this.overrideCityVal[data.profileGroupName] = data.cityGroup;
  //           //console.log(this.overrideAlertVal,this.overrideCityVal,data.profileGroupName,'oou')
  //         });
  //         //console.log(this.choosedCriteria,"dsds",data,this.profileGroupList);
  //         let selectVal: any = [];
  //         this.choosedCriteria.map((criteria: any) => {
  //           this.profileGroupList.map((dataname: any) => {
  //             if (criteria === dataname.name.replace(/\s/g, '')) {
  //               selectVal.push(dataname.name)
  //             }
  //           })
  //         })
  //         // setTimeout(()=>{
  //         this.allowanceForm.controls['choosedProfile'].setValue(selectVal);
  //         //console.log(this.allowanceForm.controls['choosedProfile'],"dsdsdsdsd");     
  //       }
  //     }
  //   });
  // }
  // /**
  //  * onchanges
  //  */
  // public ngOnChanges(): void {
  //   $('.cls-profilegroup').on('select2:select', (event: any) => {
  //     //console.log(event,"event");
  //     let dataTrimmed: string = event.params.data.text.replace(/\s+/g, '');
  //     //console.log(dataTrimmed,"dataTrimmed",this.choosedCriteria.includes(dataTrimmed));
  //     if (this.choosedCriteria.includes(dataTrimmed) === false) {
  //       this.choosedCriteria.push(dataTrimmed);
  //       (this.allowanceForm as FormGroup).addControl([dataTrimmed] as any, this.fb.group([]));
  //       ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('amount', new FormControl('', [Validators.required, Validators.pattern(/^[1-9][0-9]*$/)]));
  //       ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('currencyAmount', new FormControl(''));
  //       ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('receipt', new FormControl('Y', [Validators.required]));
  //       //console.log(this.allowanceForm,"allowanceformval");
  //       this.overrideCityVal[dataTrimmed] = [];
  //     }
  //   });
  //   $('.cls-profilegroup').on('select2:unselect', (event: any) => {
  //     let dataTrimmed: string = event.params.data.text.replace(/\s+/g, '');
  //     //console.log(dataTrimmed,this.choosedCriteria,event.params.data.text);
  //     (this.allowanceForm as FormGroup).removeControl(dataTrimmed);
  //     var index = this.choosedCriteria.indexOf(dataTrimmed);
  //     if (index !== -1) {
  //       this.choosedCriteria.splice(index, 1);
  //     }
  //     //console.log(this.choosedCriteria,"cvvvvv");
  //     //console.log(this.allowanceForm,"allowanceformval");
  //   });
  // }
  //ccc

  ngOnInit(){
    this.userCurrency = config.USER_CURRENCY;
    setTimeout(()=>{
      $('.cls-profilegroup').select2({
        placeholder: "select"
      })
    },10);
    this.allowanceForm.controls['currency'].setValue(this.userCurrency);
      this.appService.httpPost('profileGroupMaster', {}, 'getProfileGroups','false').subscribe((data) => {
        this.profileGroupList = data.content;
        // if(this.editResponse['type'] === 'edit'){
          if(this.editResponse && this.editResponse != undefined){

          let editFormArray =['claimType','allowanceName','description','currency','amount'];
          editFormArray.map((data: any)=>{
            //  if(this.editResponse && this.editResponse != undefined)
          this.allowanceForm.controls[data].setValue(this.editResponse[data]);
          // }
            //console.log(this.editResponse['value']);
          })
          //console.log(this.editResponse,this.editResponse['profileGroupDetails'])
          if (this.editResponse['profileGroupDetails'] && this.editResponse['profileGroupDetails'].length >= 1) {
            //console.log("12");
            this.editResponse['profileGroupDetails'].map((data: any) => {
              //console.log(data,index);
              let trimmedVal = data.profileGroupName;
              (this.allowanceForm as FormGroup).addControl(
                [trimmedVal] as any,
                this.fb.group([])
              );
              //console.log(this.allowanceForm);
              ((this.allowanceForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('amount',new FormControl(data.amount,[ Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/) ]));
              ((this.allowanceForm as FormGroup).controls[trimmedVal] as FormGroup).addControl('currencyAmount',new FormControl(data.amount));
              //console.log(data);
              this.choosedCriteria.push(data.profileGroupName);
              this.overrideCityVal[data.profileGroupName] = data.cityGroup;
              //console.log(this.overrideAlertVal,this.overrideCityVal,data.profileGroupName,'oou')
            });
            //console.log(this.choosedCriteria,"dsds",data,this.profileGroupList);
            let selectVal : any = [];
            this.choosedCriteria.map((criteria : any)=>{
              this.profileGroupList.map((dataname: any)=>{
                if(criteria === dataname.name.replace(/\s/g, '')){
                  selectVal.push(dataname.name)
                }
              })
            })
            // setTimeout(()=>{
              this.allowanceForm.controls['choosedProfile'].setValue(selectVal);
              //console.log(this.allowanceForm.controls['choosedProfile'],"dsdsdsdsd");     
          } 
        }
      });
  }
  /**
   * onchanges
   */
     public ngOnChanges() : void {
      $('.cls-profilegroup').on('select2:select', (event : any)=>{
        //console.log(event,"event");
        let dataTrimmed : string = event.params.data.text.replace(/\s+/g, '');
        //console.log(dataTrimmed,"dataTrimmed",this.choosedCriteria.includes(dataTrimmed));
        if(this.choosedCriteria.includes(dataTrimmed) === false){
          this.choosedCriteria.push(dataTrimmed);
          (this.allowanceForm as FormGroup).addControl([ dataTrimmed] as any,this.fb.group([]));
          ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('amount',new FormControl('', [ Validators.required, Validators.pattern(/^[1-9]\d*(\.\d+)?$/) ]));
          ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('currencyAmount',new FormControl(''));
          ((this.allowanceForm as FormGroup).controls[dataTrimmed] as FormGroup).addControl('receipt',new FormControl('Y', [ Validators.required ]));
          console.log(this.choosedCriteria,"allowanceformval",this.allowanceForm);
          this.overrideCityVal[dataTrimmed] = [];
        }
      });
      $('.cls-profilegroup').on('select2:unselect', (event : any)=>{
        let dataTrimmed : string = event.params.data.text.replace(/\s+/g, '');
        //console.log(dataTrimmed,this.choosedCriteria,event.params.data.text);
        (this.allowanceForm as FormGroup).removeControl(dataTrimmed);
        var index = this.choosedCriteria.indexOf(dataTrimmed);
        if (index !== -1) {
          this.choosedCriteria.splice(index, 1);
        }
        //console.log(this.choosedCriteria,"cvvvvv");
        console.log(this.choosedCriteria,"allowanceformval");
      });
    }
  /**
   * ngAfterViewInit
   */
    public ngAfterViewInit(){
      setTimeout(()=>{
        this.allowanceForm.controls['currency'].setValue(config.USER_CURRENCY);
        if(Object.entries(this.editResponse).length === 0 || this.editResponse === undefined){
          this.allowanceForm['controls']['claimType'].setValue('days');
        }
      },100)
    }
  /**
 * override output value 
 */
  public overrideVal(data: any) {
    //console.log(data);
    if (data.length > 0) {
      this.overrideCityVal[this.overrideAlertVal.category] = data;
      //console.log(this.overrideCityVal);
      this.overrideAmount = false;
    }
    else if (data.length === 0) {
      this.overrideCityVal[this.overrideAlertVal.category] = [];
      this.overrideAmount = false;
    }
    else {
      this.overrideAmount = false;
    }
    //console.log(this.allowanceForm,"allowance");
  }
  /**
   * open override
   */
  public openOverride(data: any) {
    //console.log(data);
    this.overrideAmount = true;
    let objVal = {
      category: data,
      editVal: this.overrideCityVal
    }
    this.overrideAlertVal = objVal;
    //console.log(this.overrideAlertVal);
  }
  // Search Dropdown Function
  public searchDropdown(id: any) {
    setTimeout(() => {
      $("#" + id).focus();
    }, 100);
  }
  // search filter function
  public filterFunction(aa: any, bb: any) {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById(aa);
    filter = input.value.toUpperCase();
    ul = document.getElementById(bb);
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
      a = li[i].getElementsByTagName("a")[0];
      txtValue = a.textContent || a.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
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
   * Desc: create allowance
   * 
   */
  public createAllowance(type: string): void {
    var profileGroupVal = [];
    let profileGroupDetails: any = [];
    //console.log(this.overrideCityVal,"cityVal");
    $('.profileselect').select2('data').map((index: any) => {
      profileGroupVal.push(index.id);
      //console.log(index,profileGroupVal)
    })
    let allowanceFormVal: any;
    allowanceFormVal = this.allowanceForm.value;
    let formData: any = this.allowanceForm.value;
    formData['amount'] = (this.allowanceForm.value['amount'] == undefined)?0:this.allowanceForm.value['amount'];
    formData['status'] = 1;
    formData['profileGroupId'] = profileGroupVal;
    formData['currencyAmount'] = this.allowanceForm.value['amount'];
    //console.log(this.allowanceForm.value,type);
    for (const [key, _value] of Object.entries(this.allowanceForm.value)) {
      //console.log(key,value,"object");
      if (this.choosedCriteria.includes(`${key}`)) {
        let keyValue = `${key}`;
        profileGroupDetails.push(allowanceFormVal[keyValue]);
        // categoryDetails['name'] = keyValue;
        //console.log(profileGroupDetails,allowanceFormVal,keyValue,"keyvalue");
        delete allowanceFormVal[keyValue];
      }
    }
    profileGroupDetails.map((data: any, i: number) => {
      //console.log(data,i,this.overrideCityVal);
      profileGroupDetails[i]['profileGroupName'] = this.choosedCriteria[i];
      profileGroupDetails[i]['currencyAmount'] = data.amount;
      // profileGroupDetails[i]['cityGroup'] = this.overrideCityVal[i];
      for (const [key, value] of Object.entries(this.overrideCityVal)) {
        //console.log(key,value,"object");
        if (data.profileGroupName === key) {
          profileGroupDetails[i]['cityGroup'] = value;
        }
      }
    });
    formData['profileGroupDetails'] = profileGroupDetails;
    let actionName = '';
    let moduleName = 'allowanceInterface';
    if (this.allowanceForm.valid && !(this.allowanceForm.value['amount'] == 0 && profileGroupDetails.length <= 0)) {
      if (type === 'create') {
        actionName = 'insertAllowanceDetails';
      } else if (type === 'update') {
        actionName = 'updateAllowanceDetails';
        formData['allowanceMasterId'] = this.editResponse['allowanceMasterId'];
      }
      this.appService.httpPost(moduleName, formData, actionName, 'false', true).subscribe((data) => {
        //console.log(data)
        // if (data.content.status === 'success') {
        // this.createdAllowance.emit({ 'tableId': 'allowanceTable', 'tabDataIndex': 3 });
        this.emitListStatus.emit(data.content);
        // }
      });
    }else if(this.allowanceForm.value['allowanceName']==undefined || this.allowanceForm.value['allowanceName'].length<=0){
      toastr.error('Enter name');
      this.submitted = true;
    }else if(this.allowanceForm.value['amount'] == 0 && formData['profileGroupDetails'].length <= 0){
      toastr.error('Enter amount or select profile group');
      this.submitted = true;
    }
    else {
      toastr.error('Enter mandatory fields');
      this.submitted = true;
    }
  }
  /**
    * redirectList
    */
  public redirectList(): void {
    // this.createdAllowance.emit({ 'tableId': 'allowanceTable', 'tabDataIndex': 3 });
    this.createdAllowance.emit(false);
  }
  /**
   * validation
   */
  get validation() {
    return this.allowanceForm.controls;
  }
}

