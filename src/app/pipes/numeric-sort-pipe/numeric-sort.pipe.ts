import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numericSort'
})
export class NumericSortPipe implements PipeTransform {
  transform(array: any[], property: string): any[] {
    return array.slice().sort((a, b) => a[property] - b[property]);
  }
}
