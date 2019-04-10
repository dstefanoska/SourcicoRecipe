import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformTime'
})
export class TransformTimePipe implements PipeTransform {

  transform(value: number): string {
    let result: string = '';
    let hours = Math.floor(value / 60);
    let minutes = value % 60;

    if ( hours > 0) {
      result += hours < 10 ? '0' + hours + ' hours ' : hours + ' hours ';
    }

    result += minutes < 10 ? '0' + minutes + ' minutes' : minutes + ' minutes';

    return result;
  }

}
