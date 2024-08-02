import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appClickAnim]',
  standalone: true
})
export class ClickAnimDirective {

  constructor(
    private self: ElementRef,
    private renderer: Renderer2,
  ) { }

  @HostListener('click') click() {
    const el = this.self.nativeElement;
    this.renderer.addClass(el, 'clicked');
    setTimeout(() => {
      this.renderer.removeClass(el, 'clicked');
    }, 300);
  }

}
