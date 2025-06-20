import { Injectable } from '@angular/core';
/***
 * Author: Padma Priya C.K.
 * Desc :Common validation services
 * Powered by : Infiniti software solutions
 */
@Injectable({
  providedIn: 'root'
})
export class ValidationService {
  // constructor() { }
  /**
   * Desc: number exist
   */
  public numericRegex = /\d/;
  /**
   * Desc: Special characer exist
   */
  public specialChar = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/;
  /**
   * Desc: Lowercase letter exist
   */
  public lowerCase = /^[a-z]+$/;
  /**
   * Desc: both number ,text both upper and lower case
   */
  public alphaNumericRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/;
  /**
   * Desc: both upper and lower case letter
   */
  public upperLowercase = /([a-z].*[A-Z])|([A-Z].*[a-z])/;
  /**
   * Desc: Uppercase letter only
   */
  public upperCase = /^[A-Z]+$/;
  /**
   * Desc: Uppercase,Lowercase,Number all
   */
  public alphaNumbericboth = /([a-zA-Z])/ && /([0-9])/;
  /**
   * Desc:  number Exist
   */
  public numberExist(value: string): boolean {
    return this.numericRegex.test(value);
  }
  /**
   * Desc:  Both Upper and Lower Case exist
   */
  public textExist(value: string): boolean {
    return this.upperLowercase.test(value);
  }
  /**
   * Desc:  minimum length validation
   */
  public minLength(value: string, character: number): boolean {
    return !(value.length < character);
  }
  /**
   * Desc:  Both upper case,lower case,number should exist
   */
  public alphaNumberic(value: string): boolean {
    return this.alphaNumbericboth.test(value);
  }
  /**
   * Desc:  Special character should exist
   */
  public specialCharExist(value: string): boolean {
    return this.specialChar.test(value);
  }
  /**
   * Author:Padma Priya C.K.
   * Desc: Pasword Strength function
   */
  public passwordStrength(value: string): string {
    // If the entered password has number the percentage increase to 25
    let percentage: number = 0;
    const numberExistval: boolean = this.numberExist(value);
    percentage = percentage + (numberExistval === true ? 25 : 0);
    // If the entered password has upper and lower case letters the percentage increase to 25
    const alphaExist: boolean = this.textExist(value);
    percentage = percentage + (alphaExist === true ? 25 : 0);
    // If the entered password has minimum length increase to 25
    const minLengthExist: boolean = this.minLength(value, 8);
    percentage = percentage + (minLengthExist === true ? 25 : 0);
    // If the entered password has special characters the percentage increase to 25
    const charval: boolean = this.specialCharExist(value);
    percentage = percentage + (charval === true ? 25 : 0);
    let className: string = '';
    if (percentage < 49) {
      className = 'error';
    } else if (percentage >= 50 && percentage <= 75 && minLengthExist) {
      className = 'warning';
    } else if (percentage >= 76 && percentage <= 100) {
      className = 'success';
    }
    return className;
  }
}
