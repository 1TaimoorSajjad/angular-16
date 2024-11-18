import { Pipe } from '@angular/core';

// tslint:disable-next-line: use-pipe-transform-interface
@Pipe({
    name: 'capitalize'
})

export class CamelCasePipe {
    transform(value: string) {
        if (typeof value !== 'string' || value === '' ) {
            return value;
        }
        value = value.split(/(?=[A-Z])/).join('');
        value = value[0].toUpperCase() + value.slice(1);
        return value;

    }
}
