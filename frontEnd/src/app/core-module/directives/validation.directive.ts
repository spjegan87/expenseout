/**************************************************************************************
Description: Custom validation directive, validates the elements on keyup event and
            while form submit
Author: Shailesh.R
Created Date: 21-July-2019
@Input : JSON data
***************************************************************************************/

import { Directive, Input, HostListener, ElementRef } from '@angular/core';
// tslint:disable-next-line: no-any
declare var $: any;
/**
 * validation validates form element
 */
@Directive({
  selector: '[validation]'
})
export class ValidationDirective {
  /**
   * validation params for the element
   */
  // tslint:disable-next-line: no-any
  @Input() public params: any;
  /**
   * error message text
   */
  public errorMsg = '';
  /**
   * Regex for alphanumeric
   */
  public alphaNumericRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  /**
   * Regex for alphanumeric
   */
  public numberOnlyRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  /**
   * Regex for alphanumeric
   */
  public passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/;
  /**
   * Regex for alphanumeric
   */
  public emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
   /**
   * Regex for domain
   */
  public domainRegex = /(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]/;

  constructor(private el: ElementRef) {
  }
  /**
   * keyup listener
   */
  @HostListener('keyup') public keyup(): void {
    // tslint:disable-next-line: no-any
    const element: any = this.el.nativeElement;
    // tslint:disable-next-line: no-any
    const comp: any = this;
    if (this.params) {
      if (element.value !== null && element.value !== '' && element.value !== undefined) {
        for (const key in this.params) {
          if (key !== undefined && key !== 'required') {
            if (comp[key](element.value, this.params[key]) === false) {
              this.el.nativeElement.parentNode.insertAdjacentHTML('afterend', '<div class="validation-msg">' + this.errorMsg + '</div>');
              this.el.nativeElement.parentNode.parentElement.classList.add('error');
              break;
            }
          }
        }
      }
    }
  }
  /**
   * blur listener
   */
  @HostListener('blur') public function(): void {
    for (const key in this.params) {
      if (key !== undefined && key !== 'required') {
        if (this.el.nativeElement.value === null || this.el.nativeElement.value === '') {
          this.removeError();
        }
      } else if (Object.keys(this.params).length === 1 && key === 'required') {
        if (this.el.nativeElement.value !== null && this.el.nativeElement.value !== '') {
          this.removeError();
        }
      }
    }
  }
  /**
   * change listener
   */
  // tslint:disable-next-line: no-any
  @HostListener('change', ['$event']) public onchange(event: any): void {
    if (event.target.nodeName === 'SELECT' && event.target.value !== '' && event.target.value !== undefined) {
      if (event.target.parentNode.nextSibling !== null) {
        event.target.parentElement.nextSibling.remove();
        event.target.parentElement.parentElement.classList.remove('error');
      }
    }
  }

  @HostListener('submit', ['$event'])
  onSubmit(event: Event) {
    event.preventDefault();
    event.stopPropagation();
  }
  /**
   * Check min value
   */
  public min(value: string, params: number): boolean {
    this.removeError();
    if (value.length < params) {
      this.errorMsg = 'Enter atleast ' + params + ' letters';
      return false;
    }
    return true;
  }
  /**
   * Check max value
   */
  public max(value: string, params: number): boolean {
    this.removeError();
    if (value.length > params) {
      this.errorMsg = 'Max ' + params + ' letters only';
      return false;
    }
    return true;
  }
  /**
   * Check mandatory fields
   */
  // tslint:disable-next-line: no-any
  public required(value: any): number {
    let status: number = 1;
    for (const key of value) {
      // tslint:disable-next-line: no-any
      const ele: any = document.getElementById(key.id);
      if (key.value === undefined || key.value === null || key.value === '') {
        if (ele.parentElement.nextSibling !== null) {
          ele.parentElement.nextSibling.remove();
          ele.parentElement.parentElement.classList.remove('error');
        }
        this.errorMsg = 'Please fill the field';
        ele.parentElement.insertAdjacentHTML('afterend', '<div class="validation-msg">' + this.errorMsg + '</div>');
        ele.parentElement.parentElement.classList.add('error');
        // tslint:disable-next-line: no-bitwise
        status &= 0;
        // tslint:disable-next-line: no-any
        const val: any = $('.error').offset().top;
        $('html, body').stop(true, false).animate({
          scrollTop: val - 100
        }, 1000);
      } else {
        if (ele.parentElement.nextSibling !== null) {
          ele.parentElement.nextSibling.remove();
          ele.parentElement.parentElement.classList.remove('error');
        }
        // tslint:disable-next-line: no-bitwise
        status &= 1;
      }
    }
    return status;
  }
  /**
   * Check email format
   */
  public email(value: string): boolean {
    this.removeError();
    if (this.emailRegex.test(value) === false) {
      this.errorMsg = 'Enter valid email id';
      this.addError();
      return false;
    }
    return true;
  }
  /**
   * Check alphaNumeric format
   */
  public alphaNumeric(value: string): boolean {
    this.removeError();
    if (this.alphaNumericRegex.test(value) === false) {
      this.errorMsg = 'Enter atlest one uppercase, lowercase, and number';
      this.addError();
      return false;
    }
    return true;
  }
  /**
   * Check numberOnly format
   */
  public numberOnly(value: string): boolean {
    this.removeError();
    if (this.numberOnlyRegex.test(value) === false) {
      this.errorMsg = 'Enter atlest one uppercase, lowercase, and number';
      this.addError();
      return false;
    }
    return true;
  }
  /**
   * Check password format
   */
  public password(value: string): boolean {
    this.removeError();
    if (this.passwordRegex.test(value) === false) {
      this.errorMsg = 'Enter atlest one uppercase, lowercase, special character and number';
      this.addError();
      return false;
    }
    return true;
  }
  /**
   * Check domain format
   */
  public domainName(value: string): boolean {
    this.removeError();
    if (this.domainRegex.test(value) === false) {
      this.errorMsg = 'Enter valid domain name';
      this.addError();
      return false;
    }
    return true;
  }
  /**
   * Check remove error messages
   */
  public removeError(): void {
    if (this.el.nativeElement.parentNode.nextSibling !== null) {
      this.el.nativeElement.parentNode.nextSibling.remove();
      this.el.nativeElement.parentNode.parentElement.classList.remove('error');
    }
  }
  /**
   * Check remove error messages
   */
  public addError(): void {
    if (this.el.nativeElement.parentNode.nextSibling !== null) {
      this.el.nativeElement.parentNode.insertAdjacentHTML('afterend', '<div class="validation-msg">' + this.errorMsg + '</div>');
      this.el.nativeElement.parentNode.parentElement.classList.add('error');
    }
  }
  // tslint:disable-next-line: max-file-line-count
}
