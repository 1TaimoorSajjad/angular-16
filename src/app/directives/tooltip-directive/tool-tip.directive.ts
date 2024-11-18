import { Directive, ElementRef, AfterViewInit, EventEmitter, Output, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appToolTip]'
})
export class ToolTipDirective {

  constructor(private elRef: ElementRef, private renderer: Renderer2) { }
  @Input('toolTip') tooltipContetnt: string = '';

  createToolTip(): HTMLElement {
    const tooltip = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipContetnt);
    this.renderer.appendChild(tooltip, text);
    this.renderer.addClass(tooltip, 'toolTipMy');
    this.renderer.setStyle(tooltip, 'position', 'absolute');
    return tooltip;
  }

  @HostListener('mouseover')
  onMouseOver() {
    const myTooltip = this.createToolTip();
    this.renderer.appendChild(this.elRef.nativeElement, myTooltip);
    // console.log('mouse in---');
  }

  @HostListener('mouseout')
  onMouseOut() {
    setTimeout(() => {
      const toolTip = this.elRef.nativeElement.querySelector('.toolTipMy');
      this.renderer.removeChild(this.elRef.nativeElement, toolTip);
    }, 300);
  }
}
