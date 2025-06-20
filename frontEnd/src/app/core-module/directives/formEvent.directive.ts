/**************************************************************************************
Description: Handle events for form fields
Author: Shailesh.R
Created Date: 19-September-2019
@Input : native element
***************************************************************************************/

import { Directive, Input, HostListener } from '@angular/core';
/**
 * Form event directive handles form element
 */
@Directive({
  selector: '[formEvent]'
})

/**
 * Form event directive handles form element
 */
export class FormEventDirective {

  /**
   * Event name
   */
  // tslint:disable-next-line: no-any
  @Input() public listener: any;
  /**
   * component name
   */
  // tslint:disable-next-line: no-any
  @Input() public component: any;

  /**
   * click event
   */
  @HostListener('click') public click(): void {
    if (this.listener && 'click' in this.listener) {
      this.component[this.listener.click]();
    }
  }

  /**
   * blur event
   */
  @HostListener('blur') public blur(): void {
    if (this.listener && 'blur' in this.listener) {
      this.component[this.listener.blur]();
    }
  }

  /**
   * keyup event
   */
  @HostListener('keyup') public keyup(): void {
    if (this.listener && 'key' in this.listener) {
      this.component[this.listener.keyup]();
    }
  }

  /**
   * focus event
   */
  @HostListener('focus') public focus(): void {
    if (this.listener && 'focus' in this.listener) {
      this.component[this.listener.focus]();
    }
  }

  /**
   * change event
   */
  @HostListener('change') public change(): void {
    if (this.listener && 'change' in this.listener) {
      this.component[this.listener.change]();
    }
  }

}
