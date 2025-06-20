import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './form/form.component';
import { ButtonComponent } from './dynamic-form/button/button.component';
import { InputComponent } from './dynamic-form/input/input.component';
import { SelectComponent } from './dynamic-form/select/select.component';
import { CheckboxComponent } from './dynamic-form/checkbox/checkbox.component';
import { RadioComponent } from './dynamic-form/radio/radio.component';
import { CustomContentComponent } from './dynamic-form/customcontent/customcontent.component';
import { ParentComponent } from './dynamic-form/parent-container/parent-container';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { CoreModule } from '../core-module/core.module';
/**
 * Author: Shailesh R
 * Desc: Form module creates dynamic form
 */
@NgModule({
  declarations: [
    FormComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    RadioComponent,
    CheckboxComponent,
    CustomContentComponent,
    ParentComponent,
    DynamicFormComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents:[
    FormComponent,
    ButtonComponent,
    InputComponent,
    SelectComponent,
    RadioComponent,
    CheckboxComponent,
    CustomContentComponent,
    ParentComponent
  ],
  exports: [
    DynamicFormComponent
  ]
})
export class FormModule { }
