import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

import { SharedUiToastrColor } from '../shared-ui-toastr-color';
import { SharedUiToastrService } from '../shared-ui-toastr.service';

@Component({
  selector: 'shared-toast[id][color]',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      transition('* <=> *', animate(500)),
    ]),
  ],
})
export class ToastComponent {
  @Input() id!: string;

  @Input() color!: SharedUiToastrColor;

  @Input() hasIcon = true;

  @Input() hasClose = false;

  @Input() content = '';

  @Input() templateContent: TemplateRef<unknown> | null = null;

  constructor(private readonly sharedUiToastrService: SharedUiToastrService) {}

  onClose(): void {
    this.sharedUiToastrService.closeMessage(this.id);
  }
}
