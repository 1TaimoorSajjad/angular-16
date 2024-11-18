import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tripFilter'
})
export class TripFilterPipe implements PipeTransform {
  transform(value: any, filterKey: string): any {
    let filteredTrips = {};
    Object.keys(value).forEach(key => {
      filteredTrips[key] = [];
      value[key].forEach(element => {
        if(element.filter === filterKey) {
          filteredTrips[key].push(element);
        }
      });
    })
    return filteredTrips;
  }

  // transform(value: any, filter: string | object): any {
  //   console.log('TEST100: pipe', value);
  //   let filteredTrips = [];
  //   value.forEach(element => {
  //     if (typeof filter === 'string') {
  //       if (element.filter === filter) {
  //         filteredTrips.push(element);
  //       }
  //     } else if (typeof filter === 'object') {
  //       let isMatched = true;
  //       Object.keys(filter).forEach(key => {
  //         if (!(element[key] === filter[key])) {
  //           isMatched = false;
  //           return;
  //         }
  //       });

  //       if (Object.keys(filter).length && isMatched) {
  //         filteredTrips.push(element);
  //       }
  //     }
      
  //   })
  //   return filteredTrips;
  // }

}
