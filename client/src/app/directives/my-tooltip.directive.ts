import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMyTooltip]'
})
export class MyTooltipDirective {

  constructor(private elRef: ElementRef,private renderer: Renderer2) { }

  @Input('appTooltip') tooltipContent: string = '';

  createToolTip(): HTMLElement{
    const tooltip = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipContent);
    this.renderer.appendChild(tooltip,text);
    this.renderer.addClass(tooltip,'toolTipMy');
    this.renderer.setStyle(tooltip,'position','absolute');
    return tooltip;
  }

  @HostListener('mouseenter')
  onMouseEnter(){
    setTimeout(() => {
      const myToolTip = this.createToolTip();
      this.renderer.appendChild(this.elRef.nativeElement,myToolTip);
    }, 300);
  }
  @HostListener('mouseout')
  onMouseOut(){
    const tooltip = this.elRef.nativeElement.querySelector('.toolTipMy')
    this.renderer.removeChild(this.elRef.nativeElement, 'toolTipMy');
    console.log('Mouse out')
  }

}
