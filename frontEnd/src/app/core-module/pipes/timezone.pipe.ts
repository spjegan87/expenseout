import { Pipe, PipeTransform } from '@angular/core';
declare var moment : any;
@Pipe({
  name: 'timezone'
})
/**
 * Author:Padma Priya CK
 * Desc : timezone
 * Powered by : Infiniti software solutions
 */
export class TimezonePipe implements PipeTransform {

  public transform(
    value: string | Date): string {
    let timezoneVal : string = Intl.DateTimeFormat().resolvedOptions().timeZone;
  var userTime = new Date(value).toLocaleString("en-US", {timeZone: timezoneVal});
  var dateFormated  = moment(userTime).format('DD-MMM-YYYY | hh:mm A');
    return dateFormated;
  }

}
