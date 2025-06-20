import { Directive, Input, ElementRef, OnChanges } from '@angular/core';
import { config } from '../config/app';

import * as englishFont from '../../../assets/languages/English/font.json';
import * as tamilFont from '../../../assets/languages/Tamil/font.json';
/**
 * Desc: font size directive
 * Author: Shailesh
 * Modified By: Padma Priya CK
 */
// tslint:disable-next-line: no-any
const font: any = {
  en: englishFont,
  de: tamilFont
};
/**
 * Author: Padma Priya CK
 * Desc: Control font size for different languages
 */
@Directive({
  selector: '[appFontSize]'
})
export class FontSizeDirective implements OnChanges {

  /**
   * Desc: Input for the directive(language string)
   */
  @Input('appFontSize') public fontSize: string = '';
  constructor(private elementRef: ElementRef) {
  }

  /**
   * Desc: Control font size for different languages
   */
  public ngOnChanges(): boolean {
    const fontSize: string = font[config.CURRENTLANGUAGE] !== undefined ? font[config.CURRENTLANGUAGE].default[this.fontSize] : '';
  //  console.log(fontSize,"fontSize",font[config.CURRENTLANGUAGE],config.CURRENTLANGUAGE)
    if (fontSize !== '') {
      this.elementRef.nativeElement.style.fontSize = fontSize + 'px';
    } else {
      this.elementRef.nativeElement.removeAttribute('style');
    }
    return true;
  }

}
