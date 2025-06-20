import { Component, OnInit, ElementRef } from "@angular/core";
import {
  FormBuilder,
  Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { urlConfig } from "src/app/core-module/config/url";
import { AppService } from "src/app/core-module/services/app.service";
import { environment } from "src/environments/environment";
declare var $: any;
declare var toastr: any;
declare let bodymovin: any;
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {

  /**
   * Submit
   */
  public submitted: boolean = false;
  /**
 * Desc : flag flagRefresh
 */
  public flagRefresh: string = '';
  /**
  * Form
  */
  public registerForm: any;
  /**
  * Country
  */
  public countryType: any = [];
  /**
  * Errors
  */
  customErrors = { required: "Please accept the terms" };
  /**
  * Login URL
  */
  loginPath = urlConfig.ROUTES.login;
  /**
   * checkStatus
   */
  public checkStatus: string = 'N';
  /**
   * error
   */
  public error: boolean = false;
  /**
  * Captcha URL
  */
  captchaPath = environment.BACKEND_URL + "/captcha/captchaGenerator?q=" + new Date().getTime();
  /**
   * isSuccess flag
   */
  public isSuccess: boolean = false;
  // public passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).{6,42}$/;
  constructor(
    private appService: AppService,
    private router: Router,
    private fb: FormBuilder,
    private fieldFocus: ElementRef
  ) {
    this.registerForm = this.fb.group({
      firstName: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      lastName: ["", [Validators.pattern("^[a-zA-Z]+$")]],
      email: [
        "",
        [
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ],
      ],
      companyName: ["", [Validators.required, Validators.pattern("^[a-zA-Z .'/]{1,50}")]],
      phone: ["", [Validators.required, Validators.pattern("^[0-9 .'/]{1,10}")]],
      // [Validators.required, Validators.pattern("^[a-zA-Z]+$")],
      noOfEmployee: ["", [Validators.required]],
      country: ["", [Validators.required]],
      captcha: ["", [Validators.required]],
    });
  }

  public ngOnInit(): void {
    // console.log('Calling register...');
    this.appService
      .httpPost("signUp", {}, "getCountryList", "false")
      .subscribe((data) => {
        let result = data.content.countryName;
        this.countryType = Object.keys(result).map((key) => ({
          code: String(key),
          name: result[key],
        }));

      });
  }
  /**
   * animation
   */
  public lotyAnimation(): void {
    bodymovin.loadAnimation({
      container: document.getElementById('bodymovin'),
      renderer: 'svg',
      loop: false,
      autoplay: true,
      path: '../../../assets/data/lottie-success-animation.json'
    });
  }
  /**
 * string validation
 */
  public stringValidation(event: any, type: string) {
    // const strOnly = type === 'name' ? /^[A-Za-z ]+$/ : /^[a-zA-Z .'/]{1,50}/;
    let strOnly: any;
    if (type === 'name') {
      strOnly = /^[A-Za-z ]+$/;
    } else if (type === 'phone') {
      strOnly = /^[0-9]{1,10}/;
    } else {
      strOnly = /^[a-zA-Z .'/]{1,50}/;
    }
    let inputChar = String.fromCharCode(event.charCode);
    if (!strOnly.test(inputChar)) {
      event.preventDefault();
    }
  }
  /**
   * create user
   */
  public createAccount() {
    this.submitted = true;
    this.registerForm.value['terms'] = this.checkStatus;
    // console.log(this.registerForm.value);
    if (this.registerForm.valid) {
      if (this.checkStatus === 'Y') {
        this.appService.httpPost('signUp', this.registerForm.value, 'insertSignUpDetails').subscribe(data => {
          // console.log(data);
          if (data.content.status === "success") {
            // this.router.navigate(['./' + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.login]);
            this.isSuccess = true;
            setTimeout(() => {
              this.lotyAnimation();
            }, 1)
            this.registerForm.reset();
          } else {
            this.isSuccess = false;
            this.refreshcapcha();
            this.registerForm.controls.captcha.reset();
            // toastr.error(data.content.message);
          }
        });
      }
      else if (this.checkStatus != 'Y') {
        toastr.error('Kindly accept Term and conditions');
      }
    }
    else {
      const invalidControl = this.fieldFocus.nativeElement.querySelector('.form-control.ng-invalid');
      if (invalidControl) {
        invalidControl.focus();
      }
    }
  }
  /**
   * view password
   */
  public passwordview() {
    return $('.cls-password').attr('type') == 'password' ? $('.cls-password').attr('type', 'text') && $('.icon-43-view-off').attr('class', 'icon-44-view') : $('.cls-password').attr('type', 'password') && $('.icon-44-view').attr('class', 'icon-43-view-off');
  }
  /**
   * Desc : refresh button
   */
  public refreshcapcha(): void {
    this.flagRefresh = 'cls-ani-refresh';
    setTimeout(() => {
      $('.captchaimage').removeAttr('src');
      $('.captchaimage').attr(
        'src', this.captchaPath + '?q=' + new Date().getTime()
      );
    }, 100);
    setTimeout(() => {
      this.flagRefresh = 'null';
    }, 100);
  }
  // Search Dropdown Function
  public searchDropdown(id: any) {
    setTimeout(() => {
      $('#' + id).focus();
    }, 100);
  }
  // search filter function
  public filterFunction(aa: any, bb: any) {
    this.appService.commonSearchFilter(aa, bb);
  }
  /**
   * select box value set
   */
  public setFilterValue(formCtrlName: string, optionVal: string) {
    this.registerForm.controls[formCtrlName].setValue(optionVal);
    if (optionVal === 'select') {
      // console.log(value);
      this.registerForm.controls[formCtrlName].reset();
    }
  }
  /**
   * check box select
   */
  public changeStatus() {
    this.checkStatus = (this.checkStatus === 'N') ? 'Y' : 'N';
  }
  /**
   * confirmPass
   */
  public confirmPass(): void {
    if (this.registerForm.controls['confirmPassword'].value !== this.registerForm.controls['password'].value) {
      this.error = true;
    } else {
      this.error = false;
    }
  }
  /**
   * open terms and conditions
   */
  public openTerms(type: string) {
    if (type === 'terms') {
      window.open('https://www.expenseout.com/terms-and-conditions/');
      // window.open('https://www.termsandconditionsgenerator.com/live.php?token=SiwE7uhOyl4808tJFAuoyomw4ETUHwej');
    }
    else {
      this.router.navigate(['./' + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.login]);
    }
  }
}
