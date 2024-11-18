import { Observable, Subject } from 'rxjs';

export class ImageSnippet {
  constructor(public src: string, public file: File) { }
}
export function imageProcessing(imageInput: any): Observable<any> {
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    const selectedFileObserver = new Subject<any>();
    reader.addEventListener('load', (event: any) => {
      const selectedFile = new ImageSnippet(event.target.result, file);
      selectedFileObserver.next(selectedFile);
    });
    reader.readAsDataURL(file);
    return selectedFileObserver;
}
