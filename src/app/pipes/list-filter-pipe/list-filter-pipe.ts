import { Pipe, PipeTransform, Injectable } from '@angular/core';


@Pipe({
    name: 'filter',
    pure: false
})
@Injectable()
export class FilterPipe implements PipeTransform {

    /**
     *
     * @param items List of items to filter
     * @param term  a string term to compare with every property of the list
     * @param excludes List of keys which will be ignored during search
     *
     */
    static filter(items: Array<{ [key: string]: any }>, term: string, excludes: any): Array<{ [key: string]: any }> {

        const toCompare = term.toLowerCase();

        function checkInside(item: any, term1: string) {
            for (const property in item) {
                if (item[property] === null || item[property] === undefined || excludes.includes(property)) {
                    continue;
                }
                if (typeof item[property] === 'object') {
                    if (checkInside(item[property], term1)) {
                        return true;
                    }
                } else if (item[property].toString().toLowerCase().includes(toCompare)) {
                    return true;
                }
            }
            return false;
        }

        return items.filter( (item) => {
            return checkInside(item, term);
        });
    }

    transform(items: any, term: string, excludes: any = []): any {
        if (!term || !items) { return items; }

        return FilterPipe.filter(items, term, excludes);
    }
}
