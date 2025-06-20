import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../core-module/services/app.service';
import { LoggerService } from 'src/app/core-module/services/logger.service';
// import { HttpClient } from '@angular/common/http';
import { LoginService } from 'src/app/core-module/services/login.service';
import { config } from './../../core-module/config/app';
import { urlConfig } from "src/app/core-module/config/url";

// tslint:disable-next-line: no-any
declare var $: any;
// declare var toastr: any;
// // tslint:disable-next-line: no-any
// declare let CryptoJS: any;
// declare function showLoader(): any;
// declare function hideLoader(): any;
// // tslint:disable-next-line: no-any
// declare let CryptoJSAesJson: any;
/**
 * Author: Shailesh R
 * Modified By : Padma Priya CK
 * Desc: Login component
 */
@Component({
	selector: 'app-login-form',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	/**
	 * Current page
	 */
	public page = '';
	/**
	 * Login status
	 */
	public loginStatus = {};
	/**
	 * Reset password user mail id
	 */
	public emailId = '';
	/**
	 * Form
	 */
	public signinForm: any;
	constructor(
		private appService: AppService,
		private router: Router,
		private route: ActivatedRoute,
		private logger: LoggerService,
		private loginService: LoginService,
		private fb: FormBuilder
	) {
		this.signinForm = this.fb.group({
			userid: new FormControl('', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
			rememberme: new FormControl('N'),
			password: new FormControl('', Validators.required)
		});
		this.page = this.router.url.replace('/', '');
		this.route.queryParams.subscribe((params) => {
			this.emailId = params.emailId;
		});
	}
	/**
   * Toggle between forms
   */
	public item = true;
	/**
   * Login form field array
   */
	public loginForm: Array<any> = [[]];
	/**
   * Forgot password form field array
   */
	public forgotPassForm: Array<any> = [[]];
	/**
   * Reset password form field array
   */
	public resetPassForm: Array<any> = [[]];
	/**
   * Page loader
   */
	public loader = true;
	/**
   * Form content loader
   */
	public contentloader = true;
	/**
   * Submit
   */
	public submitted: boolean = false;
	/**
   * Form content loader
   */
	public ngOnInit(): void {
		// this.contentloader = true;
		// $('.cls-mobile-landpage').delay(3000).removeClass('d-none');
		this.appService.httpPost('JWT', '', '', 'false').subscribe((data) => {
			config.CSRF = data.csrfToken;
			if (data['content']['token'] !== undefined) {
				localStorage.setItem('token', data['content']['token']);
				// tslint:disable-next-line: no-any
				this.appService.httpPost('getJson', 'index', '', 'false').subscribe((data: any) => {

					this.logger.log(data.response);
					this.loginForm = data.content.login;
					this.forgotPassForm = data.content.forgotpassword;
					this.resetPassForm = data.content.resetpassword;
					// this.contentloader = false;
					// setTimeout(()=>{
					this.loader = false;
					// },3000)
					if (location.pathname.indexOf('/sso/') > -1) {
						this.userLoginSSO();
					} else {
						this.contentloader = false;
					}
				});
			}
		});
	}

	private setCookie(name: string, value: string, expireDays: number, path: string = '') {
		let d: Date = new Date();
		d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
		let expires: string = `expires=${d.toUTCString()}`;
		let cpath: string = path ? `; path=${path}` : '';
		document.cookie = `${name}=${value}; ${expires}${cpath}`;
	}

	private userLoginSSO() {
		let ssoParams = this.route.snapshot.params;
		var loginCheckData = {
			formValue: {}
		};
		if ('id' in ssoParams && 'sso' in ssoParams) {
			// To set the session cookie
			this.setCookie('app', ssoParams.id, 1, '/');
			this.appService.SSODetails = ssoParams.id;
			localStorage.setItem('sso', ssoParams.id);
			// Get the sso token
			loginCheckData.formValue = ssoParams;
		} else {
			// @ToDo: Redirect to error page
		}
		this.loginService.userLoginSSO(loginCheckData);
	}
	/**
	 * change remember me status
	 */
	public changeRememberStatus() {
		if (this.signinForm.controls.rememberme.value === 'N') {
			this.signinForm.controls.rememberme.value = 'Y'
		}
		else {
			this.signinForm.controls.rememberme.value = 'N';
		}
	}
	/**
	 * view password
	 */
	public passwordview() {
		return $('.cls-password').attr('type') == 'password' ? $('.cls-password').attr('type', 'text') && $('.icon-43-view-off').attr('class', 'icon-44-view') : $('.cls-password').attr('type', 'password') && $('.icon-44-view').attr('class', 'icon-43-view-off');
	}
	/**
	 * signup
	 */
	public signUp() {
		this.router.navigate(["./" + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.signup]);
	}
	/**
	 * forget password
	 */
	public forgotPassword() {
		this.router.navigate(["./" + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.forgetPassword]);
	}
	/**
	 * login 
	 */
	public login() {
		if (this.signinForm.valid) {
			const objVal: any = {
				'formValue': this.signinForm.value,
				'csrfToken': ''
			}
			this.loginService.userLoginSSO(objVal);
		}
		else {
			this.submitted = true;
		}
	}
	/**
	 * form validation
	 */
	get formValidation() {
		return this.signinForm.controls;
	}

	/**
   * Forgot password
   */
	// tslint:disable-next-line: no-any
	// public forgotPassword(data: any): boolean {
	//   if (data.formValue !== undefined) {
	//     this.appService.httpPost('forgotPassword', data.formValue, 'checkCaptcha').subscribe(data => {
	//       $('validation-msg').remove();
	//       if (data.content.captcha === false && data.content.email === false) {
	//         $('#captcha').parents('.form-group').append('<div class="validation-msg">Enter valid credentials</div>');
	//       } else if (data.content.captcha === true && data.content.email === false) {
	//         $('#emailid').parents('.form-group').append('<div class="validation-msg">Enter valid emailid</div>');
	//       } else if (data.content.captcha === false && data.content.email === true) {
	//         $('#captcha').parents('.form-group').append('<div class="validation-msg">Enter valid captcha</div>');
	//       }
	//     });
	//   }
	//   return true;
	// }
	/**
   * Forgot password
   */
	// public formtoggle(): boolean {
	//   this.item = !this.item;
	//   // tslint:disable-next-line: no-any
	//   const test: any = document.getElementById('login') || {};
	//   // tslint:disable-next-line: no-any
	//   const testClass: any = test.classList;
	//   if (testClass.contains('login-form') === false) {
	//     $('.animate-div').slideDown(400);
	//   } else {
	//     $('.animate-div').animate({ top: '320px' }, 500);
	//   }
	//   return true;
	// }
}
