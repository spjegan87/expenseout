/**************************************************************************************
Description: Radio component child element of dynamic form module
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
/**
 * Radio component
 */
@Component({
  selector: 'app-radio',
  template: `<ng-container class="form-group" [formGroup]="group">
              <span class="label radio-group mr-2">{{ field.label | translate }}</span>
              <label *ngFor="let option of options; let i=index" for="{{option.id | lowercase }}">
                <input class="sr-only" type="radio"
                formControlName="{{field.name}}" name="{{field.name}}" id="{{option.id | lowercase }}" value="{{option.value}}">
                <em aria-hidden="true" [ngClass] = "(i === 0) ? 'icon-7-radio-on mx-1' : 'icon-6-radio-off mx-1'"></em>
                {{option.label | translate}}
              </label>
          </ng-container>`,
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent implements OnInit {

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
   * form values
   */
  // tslint:disable-next-line: no-any
  public formValues: any;
  /**
   * options
   */
  // tslint:disable-next-line: no-any
  public options: any;

  /**
   * component initialisation
   */
  public ngOnInit(): void {
    this.options = this.formValues.content[this.field.name];
    this.group.controls[this.field.name].setValue(this.options[0].value);
  }

}
