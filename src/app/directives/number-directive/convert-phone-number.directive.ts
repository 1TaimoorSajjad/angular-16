import { Directive, ElementRef, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[phoneNumberFormat]'
})
export class ConvertPhoneNumberDirective {
  @Input() phoneNumber: string;
  constructor(private el: ElementRef) { }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.phoneNumber && this.phoneNumber) {
      const cleanValue = this.phoneNumber.replace(/\D/g, '');
      let formattedValue;
      if(cleanValue.length  && this.phoneNumber.length ){
         formattedValue = this.formatPhoneNumber(cleanValue);
      }else{
        formattedValue = this.formatPhoneNumber(this.phoneNumber);
      }
      this.el.nativeElement.textContent = formattedValue;
    }
  }
  private formatPhoneNumber(value: string): string {
    let areaCode;
    let prefix;
    let line;
    
    if (value.length >= 10) {
      areaCode = value.slice(value.length - 10, value.length - 7);
      prefix = value.slice(value.length - 7, value.length - 4);
      line = value.slice(value.length - 4, value.length);
    }

    return value && value.length >= 10 ? `(${areaCode}) ${prefix}-${line}` : value;
  }
}
