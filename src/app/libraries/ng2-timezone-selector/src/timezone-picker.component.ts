import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { TimezonePickerService } from './timezone-picker.service';
import * as moment from 'moment-timezone';

@Component({
  selector: 'ng2-timezone-picker',
  template: `
  <select #select id="select" style="width: 100%" class="form-control" [disabled]="disabled">
    <option></option>
    <ng-container *ngFor="let c of allTimezones" >
      <ng-container *ngIf="c.zones.length > 1">
        <optgroup [label]="c.iso | iso2CountryPipe">
          <option *ngFor="let t of c.zones" [value]="t">{{c.iso | iso2CountryPipe}} - {{formatTimezoneString(t)}}
            <span *ngIf="showOffset">{{offsetOfTimezone(t)}}</span>
          </option>
        </optgroup>
      </ng-container>
      <option *ngIf="c.zones.length === 1" [value]="c.zones[0]">{{c.iso | iso2CountryPipe}}
        <span *ngIf="showOffset">{{offsetOfTimezone(c.zones[0])}}</span>
      </option>
    </ng-container>
  </select>`
})
export class TimezonePickerComponent implements AfterViewInit {
  allTimezones;
  @ViewChild('select', { static: true }) select: ElementRef;

  @Input() allowClear = false;
  @Input() showOffset = false;
  @Input() guess = false;
  @Input() disabled = false;

  placeholderString = 'Select timezone';

  @Input()
  set placeholder(placeholder: string) {
    if (placeholder) {
      this.placeholderString = placeholder;
      const placeholderElem = this.select.nativeElement.parentElement.querySelector('.select2-selection__placeholder');
      if (placeholderElem) {
        placeholderElem.innerText = placeholder;
      }
    }
  }

  currentTimezone: string;
  @Input()
  set timezone(timezone: string) {
    if (timezone) {
      this.currentTimezone = timezone;
      this.triggerChangeEvent();
    } else if (this.guess) {
      this.currentTimezone = moment.tz.guess();
      this.triggerChangeEvent();
    }
  }

  @Input()
  set country(isoCode: string) {
    if (isoCode && !this.currentTimezone && !this.guess) {
      const res = this.allTimezones.find(x => x.iso === isoCode);
      if (res) {
        this.currentTimezone = res.zones[0];
        this.triggerChangeEvent();
      }
    }
  }

  @Output() timezoneChange = new EventEmitter<string>();
  @Output() change = new EventEmitter<string>();
  @Output() countryChange = new EventEmitter<string>();

  constructor(public service: TimezonePickerService) {
    this.allTimezones = service.getZones();
  }

  ngAfterViewInit() {
    const selectElement = this.select.nativeElement;

    selectElement.addEventListener('change', (event: any) => {
      this.onChange(event.target.value);
    });

    if (this.currentTimezone) {
      selectElement.value = this.currentTimezone;
      selectElement.dispatchEvent(new Event('change'));
    }
  }

  private triggerChangeEvent(): void {
    this.select.nativeElement.value = this.currentTimezone;
    this.select.nativeElement.dispatchEvent(new Event('change'));
    this.timezoneChange.emit(this.currentTimezone);
    this.change.emit(this.currentTimezone);
    this.countryChange.emit(this.allTimezones.find(x => x.zones.indexOf(this.currentTimezone) >= 0).iso);
  }

  formatTimezoneString(zone: string): string {
    const arr = zone.split('/');
    return arr[arr.length - 1].replace('_', ' ');
  }

  offsetOfTimezone(zone: string): string {
    let offset = moment.tz(zone).utcOffset();
    const neg = offset < 0;
    if (neg) {
      offset = -1 * offset;
    }
    const hours = Math.floor(offset / 60);
    const minutes = (offset / 60 - hours) * 60;
    return `(GMT${neg ? '-' : '+'}${this.rjust(hours.toString(), 2)}:${this.rjust(minutes.toString(), 2)})`;
  }

  private onChange(timezone: string) {
    this.currentTimezone = timezone;
    this.timezoneChange.emit(timezone);
    this.change.emit(timezone);
  }

  private rjust(string: string, width: number, padding = '0'): string {
    padding = padding || ' ';
    padding = padding.substr(0, 1);
    if (string.length < width) {
      return padding.repeat(width - string.length) + string;
    } else {
      return string;
    }
  }
}
