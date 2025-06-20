import { Component, OnInit, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../../core-module/services/validation.service';
import { AppService } from '../../core-module/services/app.service';
import { Router } from "@angular/router";
import { urlConfig } from "src/app/core-module/config/url";
import { config } from './../../core-module/config/app';
declare var $: any;
declare var toastr: any;
/**
 * Author: Padma Priya CK , Naveen.S
 * Desc: Reset component
 */
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  /**
   * Desc: variable to store the text value exist
   */
  public className: string = '';
  /**
   * Submit
   */
  public submitted: boolean = false;
  /**
   * error
   */
  public error: boolean = false;
  /**
   * Form
   */
  public resetForm: any;
  /**
   * newPasswordVal
   */
  public newPasswordVal: string;
  /* 
  *  
  */
  public buttonName: string = 'Reset';
  /**
   * constructor
   */
  constructor(private validation: ValidationService,
    public appService: AppService,
    private router: Router,
    private fb: FormBuilder,
    private fieldFocus: ElementRef
  ) {
    this.resetForm = this.fb.group({
      newPassword: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }
  ngOnInit() {
    this.appService.httpPost('JWT', '', '', 'false').subscribe((data) => {
      config.CSRF = data.csrfToken;
      if (data['content']['token'] !== undefined) {
        localStorage.setItem('token', data['content']['token']);
      }
    });
    if (this.appService.resetPasswordType == 'NUP') {
      this.buttonName = 'Create';
    }
  }
  /**
   * Author:Padma Priya C.K.
   * Desc: Password strength function
   */
  public passwordStrength(): boolean {
    this.className = this.validation.passwordStrength(this.resetForm.controls.newPassword.value);
    return true;
  }
  /**
   * confirmPass
   */
  public confirmPass(): void {
    if (this.resetForm.controls['confirmPassword'].value !== this.resetForm.controls['newPassword'].value) {
      this.error = true;
    } else {
      this.error = false;
    }
  }
  /**
   * Author: naveen.s
   * Desc: reset Password 
   */
  public resetPassword() {
    let formData: any = this.resetForm.value;
    if (this.resetForm.valid) {
      if (!this.error && this.className === 'success') {
        formData['user'] = this.appService.resetPasswordUrl;
        formData['type'] = this.appService.resetPasswordType;
        this.appService.httpPost('forgotPassword', formData, 'changePasswordUpgrade').subscribe((data: any) => {
          if (data.content.status === 'success') {
            this.router.navigate(['./' + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.login]);
          }
        });
      }
      else if(!this.error && this.className != 'success'){
        toastr.error('Enter valid password');
      }
      else {
        toastr.error('Password does not match');
      }
    }
    else {
      toastr.error('Enter mandatory fields');
      this.submitted = true;
      const invalidControl = this.fieldFocus.nativeElement.querySelector('.form-control.ng-invalid');
      if (invalidControl) {
        invalidControl.focus();
      }
    }
  }
  /**
   * form validation
   */
  get formValidation() {
    return this.resetForm.controls;
  }
  /**
   * back to login
   */
  public backToLogin() {
    this.router.navigate(['./' + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.login]);
  }
}