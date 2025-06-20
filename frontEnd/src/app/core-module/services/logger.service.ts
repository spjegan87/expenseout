import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

/**
 * Author: Shailesh R
 * Desc: Service for conslole events
 */

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  /**
   * Desc: Method to console log data
   */

  // tslint:disable-next-line: no-any
  public log(..._data: Array<any>): boolean {
    if (environment.logger) {
      // tslint:disable-next-line: no-console
      // console.log(data);
    }
    return true;
  }
  /**
   * Desc: Method to console error data
   */
  // tslint:disable-next-line: no-any
  public error(..._data: any): boolean {
    if (environment.logger) {
      // tslint:disable-next-line: no-console
      // console.error(data);
    }
    return true;
  }
}
