import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
import { SharedDataService } from 'src/app/services/shared-service/shared-data.service';
@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {
  timeZone: any;

  constructor(
    private sharedDataService: SharedDataService
  ) {
    if (!this.timeZone) {
      this.sharedDataService
        .getUser()
        .subscribe(user => {
          if (user && user.timeZone) {
            this.timeZone = user.timeZone;
          }
        });
    }
  }
  transform(value: any, format: any): any {
    if (value) {
      if (format) {
        value = moment.utc(value).tz(this.timeZone).format(format);
      } else {
        value = moment.utc(value).tz(this.timeZone).format('MM/DD/YYYY HHmm');
      }
    }
    return value;
  }

}
