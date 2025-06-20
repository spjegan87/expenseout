/**************************************************************************************
Description: Checkbox component child element of dynamic form module
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

/**
 * Checkbox component
 */
@Component({
  selector: 'app-checkbox',
  template: `
  			<div class="form-group">
	            <div class="checkbox checkbox-purple" [formGroup]="group">
	              <input id="{{field.name}}" [formControlName]="field.name" type="checkbox" data-parsley-multiple="field.name">
	              <label for="{{field.name}}">
	                {{field.label}}
	              </label>
	            </div>
          </div>`,

  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {

  /**
   * element filed config
   */
  public field: any;
  /**
   * Checkbox component
   */
  public group = new FormGroup({});

  /**
   * component initialisation
   */
  public ngOnInit(): boolean {
    return true;
  }

}
