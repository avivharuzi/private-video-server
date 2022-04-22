import { Directive, ElementRef } from '@angular/core';

import { fromEvent } from 'rxjs';

@Directive({
  selector: '[sharedActionMenuOrigin]',
})
export class ActionMenuOriginDirective {
  click$ = fromEvent(this.element, 'click');

  constructor(private readonly elementRef: ElementRef) {}

  get element(): HTMLElement {
    return this.elementRef.nativeElement;
  }
}
