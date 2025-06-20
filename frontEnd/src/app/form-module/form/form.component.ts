import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppService } from '../../core-module/services/app.service';
import { IObject } from '../../core-module/interfaces/field.interface';
import { urlConfig } from 'src/app/core-module/config/url';

/**
 * Desc: Handle all form pages in it
 * Author: Shailesh.R
 * @Input : Page URL, State Key
 */
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  /**
   * Form fields
   */
  // tslint:disable-next-line: no-any
  public form: Array<any> = [[]];
  /**
   * loader flag
   */
  public loader = false;
  /**
   * Popup data
   */
  public popup: object | undefined;
  /**
   * Store url params
   */
  public state: IObject = {};
  /**
   * Id
   */
  public key: number | undefined;
  /**
   * Form title
   */
  public title: string = 'Sign up';
  /**
   * Redirect url after successful submission
   */
  public redirectUrl: string | undefined;
  /**
   * json file name
   */
  public json: string;
  /**
   * Form action name
   */
  public action: string;
  /**
   * Function : Specify the modules and actions to proceed form actions
   * @param module : backend module name
   *        submit : Form submit action name
   *        dropDown : Form dropdown action name
   */
  // tslint:disable-next-line: no-any
  public modules: any = {
    signup: { module: 'manageUsers', submit: 'registrationProcess', redirect: '../index' },
    userapproval: { module: 'userApproval', dropDown: 'userApprovalFlow', submit: 'userApprovalAction', redirect: '../touroperatorlist' },
    adduser: { module: 'manageUsers', submit: 'addUser', redirect: '../viewusers' },
    viewprofile: { module: 'userProfile', dropDown: 'viewUserProfile', submit: 'updateUserAccountData', redirect: '../viewprofile' },
    edituser: { module: 'manageUsers', dropDown: 'editUser', submit: 'updateUser', redirect: '../viewusers' },
  };
  constructor(private appService: AppService, private router: Router, private route: ActivatedRoute) {
    if (this.router.getCurrentNavigation() !== null) {
      // tslint:disable-next-line: no-non-null-assertion
      this.key = this.router.getCurrentNavigation()!.extras.state !== undefined ?
        // tslint:disable-next-line: no-non-null-assertion
        this.router.getCurrentNavigation()!.extras.state!.key : undefined;
      this.state.key = this.key;
      this.state.jsonForm = this.route.snapshot.data.json;
    }
    this.json = this.route.snapshot.data.json;
    this.action = Object.keys(urlConfig.ROUTES).filter((key) => {
      return urlConfig.ROUTES[key] === this.router.url.substring(this.router.url.lastIndexOf('/') + 1);
    })[0];
  }

  /**
   * Component initialisation
   */
  public ngOnInit(): void {
    this.loader = true;
    if (this.state.key !== undefined) {
      this.appService.httpPost(this.modules[this.action].module, this.state, this.modules[this.action].dropDown).
        // tslint:disable-next-line: no-any
        subscribe((data: any) => {
          this.form = data.content;
          this.redirectUrl = this.modules[this.action].redirect;
          this.loader = false;
        });
    } else if (this.state.key === undefined && this.modules[this.action].dropDown !== undefined) {
      this.state.jsonForm = this.json;
      this.appService.httpPost(this.modules[this.action].module, this.state, this.modules[this.action].dropDown)
        // tslint:disable-next-line: no-any
        .subscribe((data: any) => {
          this.form = data.content;
          this.redirectUrl = this.modules[this.action].redirect;
          this.loader = false;
        });
    } else if (this.state.key === undefined && this.modules[this.action] === undefined) {
      this.router.navigate([this.modules[this.action].redirect]);
    } else {
      // tslint:disable-next-line: no-any
      this.appService.httpPost('getJson', this.json, '').subscribe((data: any) => {
        this.form = data.content;
        this.redirectUrl = '../index';
        this.loader = false;
      });
    }
  }

  /**
   * Form submit function
   */
  // tslint:disable-next-line: no-any
  public submit(data: any): void {
    if (data.formValue !== undefined) {
      // tslint:disable-next-line: no-any
      const formData: any = data.formValue;
      formData.key = this.key;
      this.redirectUrl = this.modules[this.action].redirect;
      this.loader = true;
      this.appService.httpPost(this.modules[this.action].module, formData, this.modules[this.action].submit).subscribe(data => {
        this.loader = false;
        if (data.content.status === 'success') {
          this.popup = {
            type: 'success',
            statusText: data.content.statusText,
            messageContent: data.content.message,
            actions: ['okay']
          };
        } else {
          this.popup = {
            type: 'error',
            statusText: data.content.statusText,
            messageContent: data.content.message,
            actions: ['yes', 'no']
          };
        }
      });
    }
  }
  /**
   * Modal function
   */
  // tslint:disable-next-line: no-any
  public modalStatus(data: any): void {
    if (data.data === 'okay' || data.data === 'no') {
      this.popup = undefined;
      this.router.navigate([this.redirectUrl]);
    } else {
      this.popup = undefined;
    }
  }
}
