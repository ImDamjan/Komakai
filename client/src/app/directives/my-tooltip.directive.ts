import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMyTooltip]'
})
export class MyTooltipDirective {

  constructor(private elRef: ElementRef,private renderer: Renderer2) { }

  @HostListener('mouseover')
  onMouseOver(){
    console.log('Mouse in')
  }
  @HostListener('mouseout')
  onMouseOut(){
    console.log('Mouse out')
  }

}
