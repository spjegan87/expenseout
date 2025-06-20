import { Injectable } from '@angular/core';
import { AppService } from './app.service';
import { config } from '../../core-module/config/app';
import { urlConfig } from 'src/app/core-module/config/url';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { MessagingService } from './messaging.service';
declare var $: any;
declare var toastr: any;
declare let CryptoJS: any;
declare let CryptoJSAesJson: any;
@Injectable({
	providedIn: 'root'
})
export class LoginService {
	public eligibilityViolate: any;
	constructor(private appService: AppService,
		private router: Router,
		private message: MessagingService
	) { }
	public userLoginSSO(datas: any): boolean {
		if (this.appService.checkScript(datas.formValue) === true) {
			let currentUrl = window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1);
			if (datas.formValue !== undefined) {
				let formValues = datas.formValue;
				let action = 'userLoginAction';
				// To check the session check - Call from appComponent
				if ('sso' in datas.formValue) {
					formValues = { sso: datas.formValue.sso, type: 'sso' };
				} else if ('action' in datas.formValue) {
					action = datas.formValue.action;
					formValues = '';
				}
				this.appService.httpPost('signIn', formValues, action, 'false').subscribe((data) => {
					window.localStorage.setItem('cookie', 'true');
					if (data.content.loginStatus === 1) {
						this.appService.lastLoginData = data.content.lastLoginDatetime;
						config.AUTH_STATUS = true;
						config.USER_NAME = data.content.userName;
						config.USER_TYPE = data.content.userType;
						config.USER_ID = data.content.userId;
						config.USER_CURRENCY = data.content.currencyCode;
						config.USER_EMAIL = data.content.emailID;
						config.CORPORATE_ID = data.content.corporateId;
						config.CORPORATE_NAME = data.content.corporateName;
						config.CONFIGSETTINGS = data.content.configSettings;
						config.RECEIPT_MANDATORY = data.content.receiptMandatory;
						if (data?.content?.configSettings?.allowanceEligibilityCriteria) {
							config.ELIGIBILITY_CRITERIA = data.content.configSettings.allowanceEligibilityCriteria.eligibilityCriteria;
						}
						if (data?.content?.configSettings?.depth_view) {
							config.sixtyDateFlow = data?.content?.configSettings?.depth_view?.sixthyDateFlow;
						}
						// localStorage.setItem('logoPath',config.CONFIGSETTINGS['logoPath']);
						const logoPath: string = window.btoa(
							CryptoJS.AES
								.encrypt(
									JSON.stringify(config.CONFIGSETTINGS['logoPath']),
									environment.ENCRYPTION_KEY,
									{ format: CryptoJSAesJson }
								)
								.toString()
						);
						localStorage.setItem('logoPath', logoPath);
						if (action === 'checkUserLogin') {
							if (localStorage.getItem('sso')) {
								this.appService.SSODetails = localStorage.getItem('sso');
							}
							if ('url' in datas.formValue) {
								if (datas.formValue.url !== '') {
									this.router.navigate([
										'../../' + urlConfig.ROUTES.home + '/' + datas.formValue.url
									]);
								} else {
									this.router.navigate([
										'../../' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.dashboard
									]);
								}
							}
						} else {
							/**
							 * sso callback
							 */
							if (data.content.landingPage !== undefined) {
								this.router.navigate([
									'../' + urlConfig.ROUTES.home + '/' + data.content.landingPage
								]);
							} else {
								this.router.navigate([
									'../' + urlConfig.ROUTES.home + '/' + urlConfig.ROUTES.dashboard
								]);
							}
							setTimeout(() => {
								toastr.options = {
									timeOut: 2000,
									progressBar: true,
									showMethod: 'slideDown',
									hideMethod: 'slideUp',
									showDuration: 200,
									hideDuration: 200,
									positionClass: 'toast-top-center'
								};
								toastr.success('Welcome ' + config.USER_NAME);
							}, 1000);
						}
						setTimeout(() => {
							if (this.message?.fcm_key?.value) {
								this.appService.httpPost('notificationService', { firebaseKey: this.message?.fcm_key?.value, userId: data.content.userId }, 'setFireBaseKey', 'false').subscribe(() => { });
							}
						}, 8000);
					}
					else if (currentUrl === urlConfig.ROUTES.resetPassword) {
						this.router.navigate(['../' + urlConfig.ROUTES.auth + '/' + currentUrl]);
					}
					else {
						config.AUTH_STATUS = false;

						if (action === 'userLoginAction') {
							$('.landing-rightcontent .login-error-txt').remove();
							$('.loginform-about').after('<div class="login-error-txt">Enter valid credentials</div>');
							// toastr.error('Invalid Credentials');
						} else {
							this.router.navigate(['../' + urlConfig.ROUTES.home + '/' + data.content.landingPage]);
						}
					}
				});
			}
		}
		return true;
	}
}
