import { Pipe } from '@angular/core';
/**
 * Author: Shailesh R
 * Desc: pipe to perform limitTo
 */
@Pipe({
  name: 'limitTo'
})
export class TruncatePipe {
  transform(value: string, args: string) : string {
    // let limit = args.length > 0 ? parseInt(args[0], 10) : 10;
    // let trail = args.length > 1 ? args[1] : '...';
    let limit = args ? parseInt(args, 10) : 10;
    let trail = '...';

    return value.length > limit ? value.substring(0, limit) + trail : value;
  }
}