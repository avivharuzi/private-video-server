import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
} from '@angular/core';

@Directive({
  selector: '[sharedClickOutside]',
})
export class ClickOutsideDirective {
  @Output() sharedClickOutside = new EventEmitter<MouseEvent>();

  constructor(private elementRef: ElementRef) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    const clickedInside = this.elementRef.nativeElement.contains(target);

    if (!clickedInside) {
      this.sharedClickOutside.emit(event);
    }
  }
}
