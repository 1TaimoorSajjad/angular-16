import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'range'
})
export class RangePipe implements PipeTransform {

  transform(value: any, limit?: number): number[] {
    value = [];
    for (let i = 1; i <= limit; i++) {
      value.push(i);
    }
    return value;
  }
}
