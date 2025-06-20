import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'amount'
})
export class AmountPipe implements PipeTransform {

 public transform(value: any): any {
        if (value != null || value != undefined){
        const amount = parseInt(value);
        return amount.toLocaleString('en-IN');
    }
  }

}