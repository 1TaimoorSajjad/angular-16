import { Directive, Output, EventEmitter, ElementRef } from '@angular/core';

@Directive({
  selector: '[timeFormat]'
})
export class TimeFormatDirective {
  @Output() format: EventEmitter<any> = new EventEmitter();
  constructor(elRef: ElementRef) {
    console.log("elref ",elRef)
   }

  ngOnInit() {
    this.format.emit('MM/dd/yyyy HHmm');

  }

}
