/**************************************************************************************
Description: Custom content component child element of dynamic form module
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

// tslint:disable-next-line: no-any
const templateConfig: any = {
  header: '<h1 class=\'header-label\'>{label}</h1>',
  tabTitle: '<h2 class=\'header-label\'>{label}</h2>',
  subTitle: '<h3 class=\'header-sub-title\'>{label}</h3>',
  row: '<div class=\'col-sm-12\'></div>',
  column: 'form-group col-sm-4 p-sm-1 px-xl-3'
};

/**
 * custom content component
 */
@Component({
  selector: 'app-custom-content',
  template: `<div *ngIf="field.type !== 'captcha'" class="{{field.class}}"
                  [innerHtml]="field.content ? (field.content | translate) : field.content">
              </div>
              <ng-container *ngIf="field.type === 'captcha'">
                <img class="captchaimg"
                      src="http://localhost/Allotment/trunk/AllotmentManager/index.php/captcha?namespace=forgotPassword"
                      alt="captcha" height="50" width="150">
                <em title="Refresh captcha" class="fn-refreshcaptcha icon-16-refresh"></em>
              </ng-container>`,
  styleUrls: ['./customcontent.component.scss'],
})
export class CustomContentComponent implements OnInit {

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
   * component initialisation
   */
  public ngOnInit(): boolean {
    this.field.content = this.field.label ? templateConfig[this.field.type].replace('{label}', this.field.label) : '';
    return true;
  }

}
