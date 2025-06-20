import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class CurrencyPipe implements PipeTransform {
  transform(items: any[], searchCurrency: string): any[] {
    if (!items) return [];
    if (!searchCurrency) return items;
  
    return items.filter(item => {
      return Object.keys(item).some(key => {
        return String(item[key]).toLowerCase().includes(searchCurrency.toLowerCase());
      });
    });
   }

}