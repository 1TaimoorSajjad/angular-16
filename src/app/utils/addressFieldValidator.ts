import { AbstractControl } from '@angular/forms';

export function addressValidation(control: AbstractControl): { [key: string]: any } | null {
    const address: string = control.value;
    if (address === '' || address === null) {
      return {"address": true};
    }
    else {
      return null;
    }
}
