import { Directive, ElementRef, AfterViewInit, EventEmitter, Output, HostListener, Input } from '@angular/core';
// import Swiper from 'swiper';

@Directive({
  selector: '[appImageslider]'
})
export class ImagesliderDirective implements AfterViewInit {
  @Input() dataList;
  private defaultImageSrc: string;
  // private hoverImageSrc: string;
  constructor(private el: ElementRef) { }

  ngAfterViewInit(): void {
    const imgElement = this.el.nativeElement.querySelector('img');
    this.defaultImageSrc = imgElement.src;
    // this.hoverImageSrc = 'https://images.pexels.com/photos/14454919/pexels-photo-14454919.jpeg'

    imgElement.src = this.defaultImageSrc;
  }

  
  @HostListener('mouseenter')
 async onMouseEnter(): Promise<void> {
    const imgElement = this.el.nativeElement.querySelector('img');
    // imgElement.src = this.hoverImageSrc; // Change the image source on hover
    console.log("Check Images", this.dataList)
    // for(let image of this.images){
    // await new Promise<void>((resolve) => {
    //    setTimeout(function () {
    //     imgElement.src = image.slice();
    //     console.log("how many images", imgElement.src)
    //     resolve();
    //   }, 3000); 
    // });
    // }

    for (let image of this.dataList.images) {
      await new Promise<void>((resolve) => {
        setTimeout(() => {
          image= image ? image : 'assets/images/placeholders/no_image.png';
          imgElement.src = image;
          console.log("how many images", image)
          imgElement.setAttribute('data-fancybox', 'slider');
          imgElement.setAttribute('data-src', image);
          imgElement.setAttribute('data-caption', this.dataList.title);
          imgElement.classList.add('fancybox');
          console.log("Image source changed:", image);
          resolve();
        }, 2000);
      });
    }
  
    // Initialize FancyBox
  // $('[data-fancybox="slider"]').fancybox({
  //   // FancyBox options
  // });
  }
  

  @HostListener('mouseleave')
  onMouseLeave(): void {
    const imgElement = this.el.nativeElement.querySelector('img');
    imgElement.src = this.defaultImageSrc; // Revert back to the default image source on mouse leave
  }
}
