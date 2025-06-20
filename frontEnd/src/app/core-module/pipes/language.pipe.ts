
import { Pipe, PipeTransform } from '@angular/core';
import { config } from '../config/app';
import * as english from '../../../assets/languages/English/language.json';
import * as tamil from '../../../assets/languages/Tamil/language.json';
import * as chinese from '../../../assets/languages/Chinese/language.json';
import * as hindi from '../../../assets/languages/Hindi/language.json';
// tslint:disable-next-line: no-any
const lang: any = {
  en: english,
  de: tamil,
  cn: chinese,
  hi:hindi
};

/**
 * Author: Shailesh R
 * Desc: pipe to perform pipe transform that performs language translation
 */
@Pipe({
  name: 'translate',
  pure: false
})
export class TranslatePipe implements PipeTransform {

  /**
   * Author: Shailesh R
   * Desc: Translate language based on JSON key
   */
  public transform(key: string): string {
    let getCurrentlang = localStorage.getItem('language');
    getCurrentlang = getCurrentlang == null ? 'EN' : getCurrentlang;
    config.CURRENTLANGUAGE = getCurrentlang;
    return lang[config.CURRENTLANGUAGE] !== undefined ?
    lang[config.CURRENTLANGUAGE].default[key] || key : key;
  }
}