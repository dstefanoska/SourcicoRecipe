import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longTextEllipsis'
})
export class LongTextEllipsisPipe implements PipeTransform {

  transform(value: string): string {
    if (value.length > 50) {
      for (let i = 50; i < value.length; i++) {
        if (value.charAt(i) === ' ') {
          return value.substring(0, i - 1) + '...';
        }
      }
    } else {
      return value;
    }
  }

}
