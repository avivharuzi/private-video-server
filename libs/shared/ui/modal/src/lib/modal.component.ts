import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalComponent {
  @Output() closed = new EventEmitter<void>();

  @ViewChild('contentElement') contentElementRef?: ElementRef;

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

  @HostListener('document:keydown.escape') onKeydownHandler() {
    this.closed.emit();
  }
}
