/**************************************************************************************
Description: Select box component child element of dynamic form module
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppService } from '../../../core-module/services/app.service';
// tslint:disable-next-line: no-any
declare var $: any;

/**
 * Select component
 */
@Component({
  selector: 'app-select',
  template: `
          <ng-container [formGroup]="group">
            <label for="{{field.name}}" class="position-label">{{field.label | translate}}</label>
            <select name="{{field.name}}"  validation [params]="field.validation" formControlName="{{field.name}}"
             class="form-control infi-input-box-style" formEvent [listener] = "field.action"
             [component]="this" id="{{field.name}}" required>
            <option *ngFor="let item of options" [value]="item.id">{{item.value}}</option>
            </select>
          </ng-container>`,
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit {

  /**
   * field info
   */
  // tslint:disable-next-line: no-any
  public field: any;

  public defaultValue:any;
  /**
   * form group
   */
  public group = new FormGroup({});
  getSelectedVal :number = 1;
  /**
   * form values
   */
  // tslint:disable-next-line: no-any
  @Input() public formValues: any;
  /**
   * form group
   */
  // tslint:disable-next-line: no-any
  public options: any;

  constructor(private appService: AppService) {
  }

  /**
   * component initialisation
   */
  public ngOnInit(): void {
    this.options = this.formValues.content.metaData[this.field.name];
    // if(this.formValues.content[this.field.name] !== undefined)
    // {
    //   this.field.name = this.formValues.content[this.field.name];
    // }

  }

  // Get the option values from backend through App service based on module name

  /**
   * Get city list for dropdown
   */
  public getcitylist(): void {
    const id: string = this.field.name;
    const target: string = this.field.param;
    // tslint:disable-next-line: no-any
    let listData: any = [{}];
    this.appService.httpPost(this.formValues.module, this.group.controls[id].value, 'signUpAttributes').subscribe((data) => {
      $('#' + target).empty();
      $('#' + target).parents('.form-group').removeClass('error').find('.validation-msg').remove();
      this.group.controls[target].setValue(null);
      listData = data.content;
      if (listData.city.length > 0) {
        this.group.controls[target].setValue(listData.city[0].id);
        // tslint:disable-next-line: forin
        for (const city in listData.city) {
          $('#' + target).append($('<option>')
            .val(listData.city[city].id)
            .html(listData.city[city].value));
        }
      }
    });
  }

}
