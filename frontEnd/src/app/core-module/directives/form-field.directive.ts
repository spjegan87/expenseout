/**************************************************************************************
Description: Render the form components of the dynamic form through component factory
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
  InputComponent,
  ButtonComponent,
  SelectComponent,
  RadioComponent,
  CheckboxComponent,
  CustomContentComponent,
  ParentComponent
} from '../../form-module/dynamic-form';

// tslint:disable-next-line: no-any
const componentMapper: Array<any> = [
  { types: ['text', 'email', 'password', 'number', 'date', 'url', 'time'], component: InputComponent },
  { types: ['submit', 'button'], component: ButtonComponent },
  { types: ['select'], component: SelectComponent },
  { types: ['radio'], component: RadioComponent },
  { types: ['container'], component: ParentComponent },
  { types: ['checkbox'], component: CheckboxComponent },
  { types: ['captcha', 'tabTitle', 'subTitle', 'row'], component: CustomContentComponent }
];
/**
 * Author: Shailesh R
 * Desc: Directive to create form components
 */
@Directive({
  selector: '[formField]'
})
export class FormFieldDirective implements OnInit {
  /**
   * form field configs
   */
  // tslint:disable-next-line: no-any
  @Input() public field: any;
  /**
   * form field values
   */
  @Input() public formValues = {};
  /**
   * form group
   */
  @Input() public group: FormGroup = new FormGroup({});

  /**
   * Define the Form Component (default: InputComponent)
   */
  // tslint:disable-next-line: no-any
  public element: any = InputComponent;
  /**
   * Define the Form Component (default: InputComponent)
   */
  // tslint:disable-next-line: no-any
  public componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  /**
   * component initialisation
   */
  public ngOnInit(): boolean {
    // Get the component based on type
    componentMapper.forEach(components => {
      if (components.types.indexOf(this.field.type) > -1) {
        this.element = components.component;
      }
    });

    // tslint:disable-next-line: no-any
    const factory: any = this.resolver.resolveComponentFactory(this.element);
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.formValues = this.formValues;
    this.componentRef.instance.group = this.group;
    return true;
  }
}
