/**************************************************************************************
Description: Parent container to control all child components
Author: Shailesh.R
Created Date: 11-September-2019
@Input : JSON data with child components
***************************************************************************************/

import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * parent component
 */
@Component({
  selector: 'app-parent',
  template: `
        <div class="row {{field.class}}">
          <ng-container *ngFor="let component of field['components']" >
            <div class="{{component.class}} form-group ">
              <ng-container formField [field]="component" [formValues]="formValues" [group]='group'>
              </ng-container>
            </div>
          </ng-container>
        </div>
        `
})
export class ParentComponent {

  /**
   * field info
   */
  // tslint:disable-next-line: no-any
  public field: any;
  /**
   * form values
   */
  public formValues = {};
  /**
   * Form group
   */
  public group = new FormGroup({});

}
