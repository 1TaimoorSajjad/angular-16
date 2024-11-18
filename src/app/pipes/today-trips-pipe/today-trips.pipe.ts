import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';

@Pipe({
  name: 'todayTrips'
})
export class TodayTripsPipe implements PipeTransform {

  transform(value: any, date): any {
    console.log(value, date)
    console.log(moment(date).format('MM/DD/YYYY'))
    var todayDate = moment(date).format('MM/DD/YYYY');
    Object.keys(value).forEach(key => {
      console.log(value[key].key)
      console.log(todayDate)
      if (value[key].key === todayDate) {
        console.log(value[key])
        return [value[key]];
      }
    })

    // return null;
  }

}
