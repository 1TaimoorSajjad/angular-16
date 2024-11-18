import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

// Error handling
export function errorHandl(error: HttpErrorResponse) {
    let errorMessage = '';
    // console.log(error.instanceof());
    if (error.error instanceof ErrorEvent) {

        // Get client-side error
        errorMessage = error.error.message;
    } else {
        // Get server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;

        if (error.error) {
            console.log("if error", error)
            if(error.error.message) {
                errorMessage = error.error.message;
            }
        }
    }
    return throwError(errorMessage);
}

// setting form data
export function setFormData(imgFiles: any, staffData: any, dataRef: any) {
    const formData = new FormData();
    Object.keys(imgFiles).forEach(key => {
            if (imgFiles[key] !== null) {
                formData.append(key, imgFiles[key], imgFiles[key].name);
            }
        });
    Object.keys(staffData).forEach(key => formData.append(`${dataRef}[${key}]`, staffData[key]));
    return formData;
}

// Data Ref. like staff[name] wherein staff is data ref.
export function setFormDataV2(data: any, dataRef?: any) {
    const formData: FormData = new FormData();
    Object.keys(data).forEach((key) => {
        const name = dataRef ? `${dataRef}[${key}]` : key;
        const value = data[key];
        if (value instanceof File) {
            formData.append(key, value, value.name);
        } else if (value instanceof Array) {
            if (value.length) {
                value.forEach(v => {
                    formData.append(name, v);
                });
            } else {
                formData.append(`${name}[]`, '');
            }
        } else {
            formData.append(name, value);
        }
    });
    return formData;
}


export function setOnlyFieldFormData(staffData: any, dataRef: any) {
    const formData = new FormData();
    Object.keys(staffData).forEach(key => formData.append(`${dataRef}[${key}]`, staffData[key]));
    return formData;
}
