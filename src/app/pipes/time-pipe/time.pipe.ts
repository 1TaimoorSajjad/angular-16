import { Pipe, PipeTransform } from '@angular/core';
import { PassThrough } from 'stream';

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(value: any, start: any, end: any, skip: any, selectedHour1?, selectedHour2?): any {
    value = [];
    if (start) {
      start = parseInt(start);
    } else {
      if (parseInt(skip) === 1) {
        start = 0;
      } else {
        start = 0;
      }
    }
    if (end) {
      end = parseInt(end);
    } else {
      if (parseInt(skip) === 1) {
        end = 23;
      } else {
        end = 60;
      }
    }
    skip = parseInt(skip);

    if (selectedHour1 && selectedHour2) {
      if (selectedHour1 < selectedHour2) {
        start = 0;
      }
    }
    for (let i = start; i <= end; i = i + skip) {
      if (i<10) {
        value.push("0"+i.toString())
      } else {
        value.push(i.toString());
      }
    }
    return value;
  }

}
