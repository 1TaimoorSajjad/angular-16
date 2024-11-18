import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'minPipe'
})
export class MinPipePipe implements PipeTransform {

  transform(value: any, start?: any): any {
    value = [];
    if(!start) {
      start = 0;
    }else {
      start = parseInt(start)
    }
    
    for (let i = start; i < 60; i+=10) {
      value.push(i);
    }
    return value;
  }

}
