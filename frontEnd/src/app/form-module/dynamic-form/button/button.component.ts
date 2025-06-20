/**************************************************************************************
Description: Button component child element of dynamic form module
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { Component, OnInit } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { DynamicFormComponent } from "../dynamic-form.component";
import { urlConfig } from "src/app/core-module/config/url";
/**
 * Button component
 */
@Component({
  selector: "app-button",
  template: ` <ng-container [formGroup]="group">
    <button
      class="btn   cls-login-btn {{ field.className }}"
      type="{{ field.type }}"
      attr.aria-label="{{ field.description }}"
      (click)="this[action]()"
    >
      <span *ngIf="field.textlink">
        {{ field.textlink }} </span
      >{{ field.label | translate }}
    </button>
  </ng-container>`,
  styleUrls: ["./button.component.scss"],
})
export class ButtonComponent implements OnInit {
  /**
   * field info
   */
  // tslint:disable-next-line: no-any
  public field: any;
  /**
   * form group
   */
  public group = new FormGroup({});
  /**
   * action name
   */
  public action = "";
  constructor(private router: Router, private dForm: DynamicFormComponent) {}

  /**
   * component initialisation
   */
  public ngOnInit(): boolean {
    this.action = this.field.action ? this.field.action.click : "noop";
    return true;
  }
  /**
   * sign up routing
   */
   public signUp(): boolean { 
    this.router.navigate(["./" + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.signup]);
    return true;
  }
  /**
   * empty functions
   */
  public noop(): boolean {
    return true;
  }
  /**
   * Form reset
   */
  public resetForm(): boolean {
    this.group.reset();
    return true;
  }
  /**
   * back to login
   */
  // tslint:disable-next-line: no-any
  public backToLogin(): any {
    return this.router.navigate(["./index"]);
  }

  /**
   * form values
   */
  public buttonEvent(): boolean {
    this.dForm.buttonEmit(this.field.param);
    return true;
  }
  /**
   * forget password
   */
  public forgotpassword(){
    this.router.navigate(["./" + urlConfig.ROUTES.auth + "/" + urlConfig.ROUTES.forgetPassword]);
  }
}
