import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'shared-toastr-container',
  templateUrl: './toastr-container.component.html',
  styleUrls: ['./toastr-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastrContainerComponent {
  @ViewChild('items') items!: ElementRef<HTMLDivElement>;
}
