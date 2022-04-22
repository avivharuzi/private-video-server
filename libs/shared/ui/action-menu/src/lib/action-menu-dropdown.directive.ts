import { Directive, ElementRef, HostBinding } from '@angular/core';

@Directive({
  selector: '[sharedActionMenuDropdown]',
})
export class ActionMenuDropdownDirective {
  @HostBinding('style.display') display = 'none';
  @HostBinding('style.zIndex') zIndex = 'var(--z-index-dropdown)';

  constructor(public elementRef: ElementRef) {}

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
