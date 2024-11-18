import { Pipe, PipeTransform } from '@angular/core';
// how to  use | filterByKey: 'cooperate._id': selectedCooperate
@Pipe({
    name: 'filterByKey'
})
export class FilterByKeyPipe implements PipeTransform {
    public transform(value, keys: string, term: string) {
        if (!term) { return value; }
        const splitArray = keys.split(',');
        let returnValue = [];
        value.forEach((item) => {
            splitArray.forEach((key) => {
                const splitArrayTwo = key.split('.');
                let tempObject = JSON.parse(JSON.stringify(item));
                splitArrayTwo.forEach((d, i) => {
                    if (tempObject && tempObject.hasOwnProperty(d)) {
                        tempObject = JSON.parse(JSON.stringify(tempObject[d]));
                    }
                });

                if (tempObject === term)
                    returnValue.push(item);
            });
        });
        return returnValue;
    }
}
