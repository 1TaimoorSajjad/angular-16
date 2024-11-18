
const b64toBlob = (b64Data: any, contentType = '', sliceSize = 512) => {
  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};

export function downloadBase64File(content: any, name: any) {
  const blob = b64toBlob(content, 'application/pdf');
  const blobUrl = URL.createObjectURL(blob);

  // const linkSource = `data:application/pdf;base64,${content}`;
  const downloadLink = document.createElement('a');
  const fileName = name;
  downloadLink.href = blobUrl;
  downloadLink.download = fileName;
  downloadLink.click();
}

export function downloadFile(url: any, extention: any, fileName: any) {
  console.log(url, fileName);
  const body = <HTMLDivElement>document.body;
  const linkSource = url;
  const downloadLink = document.createElement('a');
  downloadLink.href = linkSource;
  downloadLink.target = '_blank';
  downloadLink.download = fileName;
  body.appendChild(downloadLink);
  downloadLink.click();
}
