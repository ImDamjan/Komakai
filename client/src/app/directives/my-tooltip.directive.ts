import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[appMyTooltip]'
})
export class MyTooltipDirective {

  constructor() { }

  @HostListener('mouseover')
  onMouseOver(){
    console.log('Mouse in')
  }
  @HostListener('mouseout')
  onMouseOut(){
    console.log('Mouse out')
  }

}
