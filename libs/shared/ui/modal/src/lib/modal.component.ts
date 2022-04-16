import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @Output() closed = new EventEmitter<void>();

  @ViewChild('contentElement') contentElementRef?: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
  }

  ngOnDestroy(): void {
    this.renderer.setStyle(document.body, 'overflow', 'auto');
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event) {
    const nativeElement = this.contentElementRef?.nativeElement;
    if (
      event.target === nativeElement ||
      !nativeElement.contains(event.target)
    ) {
      this.closed.emit();
    }
  }

  @HostListener('document:keydown.escape') onKeydownHandler(): void {
    this.closed.emit();
  }
}
