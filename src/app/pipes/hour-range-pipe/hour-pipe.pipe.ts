import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hourPipe'
})
export class HourPipePipe implements PipeTransform {

  transform(value: any, start?:any): any {
    value = [];
    
    if (!start) {
      start = 5;
    } else {
      start = parseInt(start)
    }
    for (let i = start; i <= 23; i++) {
      if (i<10) {
        value.push("0"+i.toString())
      } else {
        value.push(i.toString());
      }
    }
    return value;
  }

}
