import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'shared-modal-body',
  templateUrl: './modal-body.component.html',
  styleUrls: ['./modal-body.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalBodyComponent {
  @Output() closed = new EventEmitter<void>();

  onModalBodyClick(event: MouseEvent, modalBodyElement: HTMLDivElement) {
    if (event.target === modalBodyElement) {
      this.closed.emit();
    }
  }
}
