import Swal from 'sweetalert2';
function sweetAlertTwoButtons(title: any, text: any, type: any, confirmButtonText: any, cancelButtonText?: any) {
    const swalFormat = {
        title,
        text,
        type,
        showCancelButton: cancelButtonText ? true : false,
        confirmButtonColor: cancelButtonText ? '#d33' : '#3085d6',
        cancelButtonColor: '#3085d6',
        confirmButtonText,
        cancelButtonText

    };
    return swalFormat;
    // return Swal.fire(
    //     swalFormat
    //   );
}

function sweetAlertOneButtons(title: any, text: any, type: any, confirmButtonText: any) {
    const swalFormat = {
        title,
        text,
        type,
        confirmButtonColor: type === 'warning' || type === 'error' ? '#d33' : '#3085d6',
        confirmButtonText

    };
    return swalFormat;
    // return Swal.fire(
    //     swalFormat
    //   );
}

export function sweetAlert(title: any, text: any, type: any, confirmButtonText: any, cancelButtonText?: any) {
    // if (arguments.length === 5)
    if (arguments.length === 4) {
        return Swal.fire(
            sweetAlertOneButtons(title, text, type, confirmButtonText)
        );
    } else {
        return Swal.fire(
            sweetAlertTwoButtons(title, text, type, confirmButtonText, cancelButtonText)
        );
    }
}

