import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../core-module/services/app.service';
import { environment } from "src/environments/environment";
import { urlConfig } from "src/app/core-module/config/url";
import { Router } from "@angular/router";
declare var $: any;
@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {

  constructor(private appService: AppService, public router: Router) { }
  /**
   * Desc : flag flagRefresh
   */
  public flagRefresh: string = '';
  /**
   * Captcha URL
   */
  captchaPath = environment.BACKEND_URL + "/captcha/captchaGenerator?q=" + new Date().getTime();
  /***
   * Des : Validation flag
   */
  public submitted: boolean = false;
  public forgetForm: FormGroup = new FormGroup({
    emailId: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
    captcha: new FormControl('', Validators.required),
    type: new FormControl('FR')
  });
  ngOnInit(): void {
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
  
  /**
   * Desc : reset password function
   */
  public resetLink(): void {
    this.submitted = true;
    if (this.forgetForm.valid) {
      this.refreshcapcha();
      this.appService.httpPost('forgotPassword', this.forgetForm.value, 'generateResetLink').subscribe((data: any) => {
        if (data.content.status == 'success') {
          this.router.navigate(['./' + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.login])
        }
      });
      this.forgetForm.get('captcha').reset();
    }
  }
}
