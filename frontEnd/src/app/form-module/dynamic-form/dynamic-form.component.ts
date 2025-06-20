/**************************************************************************************
Description: Dynamic form module, common for all components, rendered through 'FormField'
           directive based on JSON input
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { Component, EventEmitter, Input, Output, ViewChildren, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { AppService } from '../../core-module/services/app.service';
import { ValidationDirective } from '../../core-module/directives/validation.directive';
// tslint:disable-next-line: no-any
declare var $: any;
let group: FormGroup;
/**
 * Author: Shailesh R
 * Desc: Dynamic form componet renders forms based on JSON
 */
@Component({
  selector: 'dynamic-form',
  templateUrl: './dynamic-form.html',
  styles: []
})
export class DynamicFormComponent implements OnChanges {
  /**
   * Form fields
   */
  // tslint:disable-next-line: no-any
  @Input() public fields: any;
  /**
   * Instance for validation directive
   */
  // tslint:disable-next-line: no-any
  @ViewChildren(ValidationDirective) public Validation: any;
  /**
   * Emit form values
   */
  @Output() public submit: EventEmitter<object> = new EventEmitter<object>();
  /**
   * Emit custom button events
   */
  // tslint:disable-next-line: no-any
  @Output() public buttonEvent: EventEmitter<any> = new EventEmitter<any>();
  /**
   * Form group
   */
  public form: FormGroup = this.fb.group({});
  /**
   * Form value for submit
   */
  public formValues = {
    module: '',
    content: [],
    action: ''
  };
  /**
   * Flag to create form
   */
  public createForm: boolean = false;

  /**
   *
   * @type {string}
   * @memberof DynamicFormComponent
   */
  public actionId: string = '';
  /**
   * Static element types
   */
  public staticElements = ['submit', 'button', 'container', 'captcha', 'tabTitle', 'row'];
  // get value() {
  //   return this.form.value;
  // }
  constructor(private fb: FormBuilder, private appService: AppService) {
    // console.log('Dynamic Login Components..');

  }

  /**
   * Detect input changes
   */
  public ngOnChanges(): boolean {
    this.actionId = (this.fields[1] !== undefined) ? this.fields[1].action_id : '';
    if (this.fields[0].module !== undefined) {
      this.appService.httpPost(this.fields[0].module, this.actionId, this.fields[0].action).subscribe(data => {
        this.formValues = {
          module: this.fields[0].module,
          content: data.content,
          action: this.fields[0].action
        };
        this.initiateControl();
      });
    } else {
      this.initiateControl();
    }
    return true;
  }

  /**
   * Emits the form values to the parent component after successful validation
   */
  public onSubmit(event: Event): Event {
    event.stopPropagation();
    const reqFields: Array<object> = [];
    // tslint:disable-next-line: no-any
    this.fields[0].components.forEach((field: any) => {
      if (field.components !== undefined) {
        // tslint:disable-next-line: no-any
        field.components.forEach((Component: any) => {
          if (Component.validation !== undefined) {
            if (Component.validation.required !== undefined) {
              reqFields.push({
                value: this.form.controls[Component.name].value,
                id: Component.name
              });
            }
          }
        });
      }
    });

    if (this.Validation.first.required(reqFields) === 1 || !$('.validation-msg').is(':visible')) {
      let formData = {
        formValue: this.form.value,
        csrfToken: this.fields.csf
      }
      this.submit.emit(formData);
      // (this.submit.emit(
      //   { formValue: this.form.value }));
    }
    return event;
  }

  /**
   * Initiate form control creation
   */
  public initiateControl(): boolean {
    if (this.fields[0].components !== undefined) {
      group = this.fb.group({});
      this.form = this.createControl(this.fields[0].components);
    }
    return true;
  }
  /**
   * Create form control for all elementa
   */
  // tslint:disable-next-line: no-any
  public createControl(components: Array<any>): FormGroup {
    components.forEach(field => {
      if (field.components !== undefined) {
        this.createControl(field.components);
      } else {
        if (this.staticElements.indexOf(field.type) > -1) {
          return;
        }
        const control: FormControl = this.fb.control(
          this.fields[1] !== undefined ? this.fields[1][field.name] : this.formValues.content[field.name]
        );
        group.addControl(field.name, control);
      }
    });
    this.createForm = true;
    return group;
  }
  /**
   * Create form control for all elementa
   */
  public buttonEmit(event: Event): Event {
    console.log(event, 'evt');
    this.buttonEvent.emit(event);
    return event;
  }
}
