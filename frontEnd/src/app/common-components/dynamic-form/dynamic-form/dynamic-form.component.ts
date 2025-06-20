import { Component, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { urlConfig } from 'src/app/core-module/config/url';
import { AppService } from 'src/app/core-module/services/app.service';
import { Options } from 'select2';
import { ValidationService } from 'src/app/core-module/services/validation.service';
// import { config } from 'src/app/core-module/config/app';
declare var $: any;

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnChanges {

  constructor(private appService: AppService, private router: Router, private validation: ValidationService) {
  }
  /**
   * Get Form field data from parent component
   */
  @Input() public form: any = {};
  /**
   * Emit Tab change event active class add
   */
  @Output() public changeTab = new EventEmitter();

  @Output() public emitTabModule = new EventEmitter();
  /**
   * Form Group name
   */
  public dynamicTabForm: FormGroup = new FormGroup({});
  //Form submit action
  public submitted: boolean = false;
  //Ng-Select2 Options
  public options: Options;
  /**
 * Desc: Password validation class add
 */
  public className: string = '';
  /**
   * Selected Index
   */
  @Input() public clickedIndex: number = 0;
  //Get List data key stored in updateValue
  @Input() public updateValue: any = {};
  //Get Profile Type
  @Input() public type: string = "";
  public error: boolean = false;

  //Onchanges
  ngOnChanges() {
    console.log(this.updateValue);
    if (this.form != undefined) {
      this.form.data.map((data: any) => {
        data[data.id]?.map((element: any) => {
          element.header.map((header: any) => {
            element.body.map((body: any) => {
              body[header['template']].map((control: any) => {
                if (control.format == 'number') {
                  this.dynamicTabForm.addControl(control.id, new FormControl('', [Validators.required, Validators.minLength(control.maxlength), Validators.maxLength(control.maxlength)]));
                  this.dynamicTabForm.addControl(control.parent_id, new FormControl('', [Validators.required, Validators.minLength(control.maxlength), Validators.maxLength(control.maxlength)]));
                }
                else if (control.format == 'email') {
                  this.dynamicTabForm.addControl(control.id, new FormControl('', [Validators.required, Validators.email,
                  Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]));
                }
                else {
                  this.dynamicTabForm.addControl(control.id, new FormControl('', Validators.required));
                }
                // this.dynamicTabForm.addControl(control.id,new FormControl('',Validators.required));
                // Validators.pattern(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)]));
                // var regularExpression = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))){2,6}$/i;

              })
            })
          })
        })
      })
    }
    this.dynamicTabForm.addControl('userId', new FormControl(''));
    this.dynamicTabForm.addControl('employeeId', new FormControl(''));

    //Form Edit details 
    if (this.updateValue && this.updateValue != undefined && this.type != 'new') {
      let title = this.updateValue?.title?.split('.');
      console.log(this.updateValue,"update");
      this.updateValue?.expenseApprover?.map((_data: any,index:number) => {
        this.dynamicTabForm?.controls?.['approver' + index].setValue(this.updateValue?.expenseApprover[index]);
      });
      this.updateValue?.exceptionApprover?.map((_data: any,index:number) => {
        this.dynamicTabForm?.controls?.['exceptional' + index].setValue(this.updateValue?.exceptionApprover[index]);
      });
      this.updateValue?.advanceApprover?.map((_data: any,index:number) => {
        this.dynamicTabForm?.controls?.['advance' + index].setValue(this.updateValue?.advanceApprover[index]);
      });
      if (!this.submitted) {
        this.dynamicTabForm?.patchValue({
          userId: this.updateValue.userId,
          employeeId: this.updateValue.employeeId,
          employeeCode: this.updateValue.employeeCode,
          firstName: this.updateValue.firstName,
          lastName: this.updateValue.lastName,
          email: this.updateValue.email,
          mobile: this.updateValue.mobile
        });
        this.setFilterValue(this.updateValue?.groupId, this.updateValue?.groupName, 'group_id', 'groupId');
        this.setFilterValue(this.updateValue?.title, title[0], 'title_code', 'title');
        this.setFilterValue(this.updateValue?.mobileCode, this.updateValue?.mobileCode, 'mobile_code', 'mobileCode');
        this.setFilterValue(this.updateValue?.country_code, this.updateValue?.country, 'country_code', 'country');
        this.setFilterValue(this.updateValue?.profileGroupId, this.updateValue?.profileGroupName, 'profileGroupName', 'profileGroupId');
        this.setFilterValue(this.updateValue?.designationCode, this.updateValue?.designationName, 'designation', 'designationCode');
        this.setFilterValue(this.updateValue?.departmentCode, this.updateValue?.departmentName, 'department', 'departmentCode');
        this.setFilterValue(this.updateValue?.branchCode, this.updateValue?.branchName, 'branch', 'branchCode');
        this.setFilterValue(this.updateValue?.gradeCode, this.updateValue?.gradeName, 'grade', 'gradeCode');
        this.setFilterValue(this.updateValue?.profitCenterCode, this.updateValue?.profitCenterName, 'profitCenter', 'profitCenterCode');
        this.setFilterValue(this.updateValue?.costCenterCode, this.updateValue?.costCenterName, 'costCenter', 'costCenterCode');
        this.setFilterValue(this.updateValue?.financeApproverId, this.updateValue?.financeApprover, 'finance', 'financeApprover');
        this.setFilterValue(this.updateValue?.siteCode, this.updateValue?.siteName, 'site', 'siteCode');
      }
    }

    this.options = {
      multiple: true,
      tags: true
    };
    this.changeTab.emit(0);   //Form fields initally loaded   
    this.type == 'myprofile' ? this.confirmPass() : false;  //Confirm password initially loaded
  }

  /**
   * Form Validation
   */
  get formValidation() {
    return this.dynamicTabForm.controls;
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
    this.appService.commonSearchFilter(aa, bb);
  }
  /**
 * Input field Validation
 */
  public inputValidation(event: any, data: any): any {
    if (data['validation'] == 'strnumOnly') {
      let k: any;
      document.all ? k = event.keyCode : k = event.which;
      return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    }
    if (data['validation'] == 'strOnly') {
      const strOnly = /^[A-Za-z ]+$/;
      let inputChar = String.fromCharCode(event.charCode);
      if (!strOnly.test(inputChar)) {
        event.preventDefault();
      }
    }
    if (data['validation'] == 'numbersOnly') {
      // this.appService.numberValidation(event);
      const charCode = (event.which) ? event.which : event.keyCode;
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
      }
    }
    // if(data['format'] == 'email'){
    //   let email:string;
    //   const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   return re.test(String(email).toLowerCase());
    // }
  }
  /**
   * Desc:Set Formcontrol value input tag & Id send to backend
   * @param id 
   * @param value 
   * @param formcontrol 
   * @param formId 
   */
  public setFilterValue(id: string, value: string, formcontrol: string, formId: string) {
    this.dynamicTabForm.controls[formcontrol].setValue(value);
    this.dynamicTabForm.addControl(formId, new FormControl(''));
    this.dynamicTabForm.controls[formId].setValue(id);
  }
  /**
   *  click select to reset search with select value
   */
  public setFilterSelectValue(formcontrol: any) {
    this.dynamicTabForm.controls[formcontrol.id].reset();
    this.dynamicTabForm.controls[formcontrol.form_id].reset();
  }
  /**
   * Submit Action
   */
  public submitAction(data: object, index: number) {
    this.submitted = true;
    // this.dynamicTabForm.removeControl("");
    let control = this.commonFunction();
    let lastData = this.form.data.slice(this.form.data.length - 1);
    let lastId: string; let lastIndex: number;
    lastData.map((data: any) => {
      lastIndex = data.index;
      data[data.id].map((element: any) => {
        element.header.map((header: any) => {
          element.body.map((body: any) => {
            body[header['template']].map((lastVal: any) => {
              lastId = lastVal['id'];
            })
          })
        })
      })
    })
    // console.log(lastData, lastId, lastIndex);

    //Back action
    if (data['action'] == 'back') {
      this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.manageprofile]);
    }
    //Save action
    else if (data['action'] == 'save') {
      // this.dynamicTabForm.removeControl("");
      // control['control3'] = [];
      // control['control3']['id'] = 'finance';
      // control['control3'].required = true;
      // let valid = this.validate(control['control3']);
      control['control' + lastIndex]['id'] = lastId;
      control['control' + lastIndex]['required'] = true;
      let valid = this.validate(control['control' + lastIndex]);
      if (valid.length == 0) {
        // let action = (this.type == 'new') ? data['action_name'] : 'updateUserSetting';
        this.appService.httpPost(data['module_name'], this.dynamicTabForm.value, data['action_name'], 'false', data['csrf']).subscribe((_result: any) => {
          // console.log(_result, "edit");
          this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.manageprofile]);
        })
      }
    }
    //Next action
    else {
      let expenseArray: any = [];
      let exceptionalArray: any = [];
      let advanceArray: any = [];
      if (this.form != undefined) {
        this.form.data.map((data: any) => {
          data[data.id]?.map((element: any) => {
            element.header.map((header: any) => {
              // this.multiplepush(data, header);
              element.body.map((body: any) => {
                body[header['template']].map((control: any) => {
                  //Multiple dropdown data pushing
                  if (data?.multiple) {
                    // console.log(header?.form_id, "multid")
                    this.dynamicTabForm.addControl(header?.form_id + 'Approver', new FormControl(""));
                    if (header?.form_id == 'expense') {
                      expenseArray.push(this.dynamicTabForm.controls[control.id].value);
                      this.dynamicTabForm.controls[header?.form_id + 'Approver'].setValue(expenseArray);
                    }
                    if (header?.form_id == 'exceptional') {
                      exceptionalArray.push(this.dynamicTabForm.controls[control.id].value);
                      this.dynamicTabForm.controls[header?.form_id + 'Approver'].setValue(exceptionalArray);
                    }
                    if (header?.form_id == 'advance') {
                      advanceArray.push(this.dynamicTabForm.controls[control.id].value);
                      this.dynamicTabForm.controls[header?.form_id + 'Approver'].setValue(advanceArray);
                    }
                  }
                })
              })
            })
          })
        })
      }
      let validation = this.validate(control['control' + index]);
      if (validation.length == 0) {
        this.submitted = false;
        this.changeTab.emit(index + 1);   //Get next tab index value when click next button 
      }
    }
  }

  /**
   * Desc : Form field validation
   * @param control 
   * @returns true when form valid
   */
  public validate(control: any) {
    let formValid = control.filter((data: any) => (this.dynamicTabForm.controls[data['id']].invalid || this.dynamicTabForm.controls[data['parent_id']]?.invalid) && data.required);
    // console.log(formValid)
    return formValid;  //Form valid boolean
  }

  /**
   * Desc:New passowrd validation & status bar show
   * @returns 
   */
  public passwordStrength() {
    if (this.type == 'myprofile')
      this.className = this.validation.passwordStrength(this.dynamicTabForm.controls.newPassword.value);
    return true;
  }
  /**
   * Desc:To validate New Password & Confirm password 
   */
  public confirmPass() {
    if (this.dynamicTabForm.controls['confirmPassword'].valueChanges != undefined)
      this.dynamicTabForm.controls['confirmPassword'].valueChanges.subscribe((value: any) => {
        // console.log(value);
        if (value !== this.dynamicTabForm.controls['newPassword'].value) {
          this.error = true;
          this.dynamicTabForm.controls['confirmPassword'].setErrors({ 'validate': false });
        }
        else {
          this.error = false;
        }
      })
  }

  public updatetAction(btn: object, data: any) {
    // console.log(btn, data);
    //Back action
    if (btn['action'] == 'back') {
      this.router.navigate(['./' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.manageprofile]);
    }
    else {
      this.submitted = true;
      let formCcontrol = this.commonFunction();
      let validation = this.validate(formCcontrol['control' + data.index]);
      if (validation.length == 0) {
        this.submitted = false;
        let formData = this.dynamicTabForm.value;
        formData['userId'] = this.updateValue.userId;
        formData['employeeId'] = this.updateValue.employeeId;
        //Create profile form update & passwod update service call
        if (data.id == 'changePassword') {
          this.appService.httpPost(data.id, formData, data.id).subscribe((_data: any) => {
          })
        }
        else {
          console.log(this.dynamicTabForm.value);
          let reqData : any = this.dynamicTabForm.value;
          reqData['expenseApprover'] = [
            this.dynamicTabForm.controls.approver0.value ? this.dynamicTabForm.controls.approver0.value : [],
            this.dynamicTabForm.controls.approver1.value ? this.dynamicTabForm.controls.approver1.value : [],
            this.dynamicTabForm.controls.approver2.value ? this.dynamicTabForm.controls.approver2.value: [],
            this.dynamicTabForm?.controls?.approver3?.value ? this.dynamicTabForm?.controls?.approver3?.value: [],
            this.dynamicTabForm?.controls?.approver4?.value ? this.dynamicTabForm?.controls?.approver4?.value: [],
            this.dynamicTabForm?.controls?.approver5?.value ? this.dynamicTabForm?.controls?.approver5?.value: [],
          ];
          reqData['exceptionalApprover'] = [
            this.dynamicTabForm.controls.exceptional0.value ? this.dynamicTabForm.controls.exceptional0.value : [],
            this.dynamicTabForm.controls.exceptional1.value ? this.dynamicTabForm.controls.exceptional1.value : [],
            this.dynamicTabForm.controls.exceptional2.value ? this.dynamicTabForm.controls.exceptional2.value: [],
            this.dynamicTabForm?.controls?.exceptional3?.value ? this.dynamicTabForm?.controls?.exceptional3?.value: [],
            this.dynamicTabForm?.controls?.exceptional4?.value ? this.dynamicTabForm?.controls?.exceptional4?.value: [],
            this.dynamicTabForm?.controls?.exceptional5?.value ? this.dynamicTabForm?.controls?.exceptional5?.value: [],
          ];
          reqData['advanceApprover'] = [
            this.dynamicTabForm.controls.advance0.value ? this.dynamicTabForm.controls.advance0.value : [],
            this.dynamicTabForm.controls.advance1.value ? this.dynamicTabForm.controls.advance1.value : [],
            this.dynamicTabForm.controls.advance2.value ? this.dynamicTabForm.controls.advance2.value: [],
            this.dynamicTabForm?.controls?.advance3?.value ? this.dynamicTabForm?.controls?.advance3?.value: [],
            this.dynamicTabForm?.controls?.advance4?.value ? this.dynamicTabForm?.controls?.advance4?.value: [],
            this.dynamicTabForm?.controls?.advance5?.value ? this.dynamicTabForm?.controls?.advance5?.value: [],
          ];
          this.appService.httpPost('userSettings', this.dynamicTabForm.value, 'updateUserSetting').subscribe((_data: any) => {
          })
        }
      }
    }
  }
  /**
   * 
   * @returns 
   */
  public commonFunction() {
    let formControl = {};
    if (this.form != undefined) {
      this.form.data.map((data: any) => {
        // this.multiplepush(data);
        formControl['control' + data.index] = [];
        data[data.id]?.map((element: any) => {
          element.header.map((header: any) => {
            element.body.map((body: any) => {
              body[header['template']].map((control: any) => {
                if (control.id == "") {
                  this.dynamicTabForm.removeControl(control.id);
                }
                else {  //if(control.id != ""){
                  formControl['control' + data.index].push(control);
                }
              })
            })
          })
        })
      })
    }
    return formControl;
  }
  // public multiplepush(data: any, header: any) {
  //   let expenseArray: any = [];
  //   let exceptionalArray: any = [];
  //   let advanceArray: any = [];
  //   let formCcontrol = this.commonFunction();
  //   console.log(data, header, formCcontrol);
  //   if (data?.multiple) {
  //     //   // console.log(header?.form_id, "multid")
  //     this.dynamicTabForm.addControl(header?.form_id + 'Approver', new FormControl(""));
  //     console.log(formCcontrol['control' + data.index])
  //     formCcontrol['control' + data.index].map((control:any)=>{
  //       if (header?.form_id == 'expense') {
  //         console.log(control.id)
  //         expenseArray.push(this.dynamicTabForm.controls[control.id].value);
  //         this.dynamicTabForm.controls[header?.form_id + 'Approver'].setValue(expenseArray);
  //       }
  //       if (header?.form_id == 'exceptional') {
  //         console.log(control.id)
  //         exceptionalArray.push(this.dynamicTabForm.controls[control.id].value);
  //         this.dynamicTabForm.controls[header?.form_id + 'Approver'].setValue(exceptionalArray);
  //       }
  //       if (header?.form_id == 'advance') {
  //         console.log(control.id)
  //         advanceArray.push(this.dynamicTabForm.controls[control.id].value);
  //         this.dynamicTabForm.controls[header?.form_id + 'Approver'].setValue(advanceArray);
  //       }
  //     })
  //   }
  // }
}
