/**************************************************************************************
Description: Input component child element of dynamic form module
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { Component, ViewChildren } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
import { ValidationDirective } from '../../../core-module/directives/validation.directive';
// tslint:disable-next-line: no-any
declare var $: any;
/**
 * input component
 */
@Component({
  selector: 'app-input',
  template: `<ng-container *ngIf="group" [formGroup]="group">
              <div [ngClass]="{'cls-pass' : field.type == 'password'}">
                <label *ngIf="field.label"  for="{{field.name}}" class="position-label">{{field.label | translate}}</label>
                <input name="{{field.name}}" type="{{field.type}}" aria-required="true"
                  attr.aria-label="{{field.description}}" validation [params]="field.validation"
                  formControlName="{{field.name}}" class="form-control cls-{{field.type}} {{ field.classname }}" autocomplete="off"
                  formEvent [listener] = "field.action" [component]="this" id="{{field.name}}" placeholder = "{{field.placeholder | translate}}" required/>
                  <em *ngIf="field.type == 'password'" (click)="passwordview()" class="icon-43-view-off"></em>
              </div>
                  </ng-container>`,
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  // <em class="{{field.iconClass}}" (click)= "passwordview()" ></em>
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
   * validation instance
   */
  // tslint:disable-next-line: no-any
  @ViewChildren(ValidationDirective) public Validation: any;

  constructor(private appService: AppService) { }

  /**
   * validation instance
   */
  public valueCheck(id: string, module: string, action: string, objName: string, erroMsg: string): boolean {
    // tslint:disable-next-line: no-any
    const ele: any = document.getElementById(id);
    if (ele.parentElement.nextSibling !== null) {
      ele.parentElement.nextSibling.remove();
      ele.parentElement.parentElement.classList.remove('error');
    }
    const username: string = $('#' + id).val();
    this.appService.httpPost(module, username, action).subscribe(data => {
      if (data !== 'Error' && data !== undefined) {
        if (data.content[objName] === false) {
          ele.parentElement.insertAdjacentHTML('afterend', '<div class="validation-msg">' + erroMsg + '</div>');
          ele.parentElement.parentElement.classList.add('error');
        } else {
          if (ele.parentElement.nextSibling !== null) {
            ele.parentElement.nextSibling.remove();
          }
        }
      }
    });
    return true;
  }
/**************************************************************************************
Description: change the input type attr and eye icon
Author: Arun R
Created Date: 31-Jan-2020
***************************************************************************************/
  public passwordview() {
    return  $('.cls-password').attr('type') == 'password' ? $('.cls-password').attr('type','text') && $('.icon-43-view-off').attr('class','icon-44-view') : $('.cls-password').attr('type','password')&& $('.icon-44-view').attr('class','icon-43-view-off');
}
  /**
   * username check
   */
  public usercheck(): void {
    const id: string = this.field.name;
    this.valueCheck(id, 'manageUsers', 'userNameDuplication', 'userName', 'User name already exists');
  }

  /**
   * email check
   */
  public emailcheck(): void {
    const id: string = this.field.name;
    const value: string = (document.getElementById(id) as HTMLInputElement).value;
    if (this.Validation.first.emailRegex.test(value) !== false) {
      this.valueCheck(id, 'manageUsers', 'emailAddressDuplication', 'email', 'Email address already exists');
    }
  }

  /**
   * Set date
   */
  public setDate(): void {
    // tslint:disable-next-line: no-any
    const params: any = this.field.param;
    this.appService.customDatepicker(this.group, params.id, params.target, params.min, params.max);
  }
}
