import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMyTooltip]'
})
export class MyTooltipDirective {
  private tooltip: HTMLElement | null = null;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  @Input('appTooltip') tooltipContent: string = '';

  createToolTip(): HTMLElement {
    const tooltip = this.renderer.createElement('div');
    const text = this.renderer.createText(this.tooltipContent);
    this.renderer.appendChild(tooltip, text);
    this.renderer.addClass(tooltip, 'toolTipMy');
    this.renderer.setStyle(tooltip, 'position', 'absolute');
    return tooltip;
  }

  shouldShowTooltip(): boolean {
    const element = this.elRef.nativeElement;
    return element.offsetWidth < element.scrollWidth;
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    if (!this.tooltip && this.shouldShowTooltip()) {
      this.tooltip = this.createToolTip();
      this.renderer.appendChild(this.elRef.nativeElement, this.tooltip);
    }
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    if (this.tooltip) {
      this.renderer.removeChild(this.elRef.nativeElement, this.tooltip);
      this.tooltip = null; // Reset tooltip reference
    }
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.tooltip) {
      const x = event.clientX + 10; // Adjust the offset as needed
      const y = event.clientY - this.tooltip.offsetHeight - 10; // Adjust the offset as needed
      this.renderer.setStyle(this.tooltip, 'left', `${x}px`);
      this.renderer.setStyle(this.tooltip, 'top', `${y}px`);
    }
  }
}