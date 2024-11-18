import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from "moment-timezone";

@Pipe({
  name: 'clockTime'
})
export class ClockTimePipe extends DatePipe  implements PipeTransform {

  override transform(
    value: string | number | Date,
    format?: string,
    timezone?: string,
    locale?: string
  ): string | null;
  override transform(
    value: null | undefined,
    format?: string,
    timezone?: string,
    locale?: string
  ): null;
  override transform(
    value: string | number | Date | null | undefined,
    format: string = 'MM/dd/yyyy h:mm a',
    timezone: string = 'America/New_York',
    locale?: string
  ): string | null {
    if (value === null || value === undefined) {
      return null;
    }

    const timezoneOffset = moment(value)
      .tz(timezone)
      .format('Z');
    return super.transform(value, format, timezoneOffset, locale);
  }

}
