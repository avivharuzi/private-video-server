import {
  ChangeDetectionStrategy,
  Component,
  Input,
  TemplateRef,
} from '@angular/core';

import { SharedUiToastrColor } from '../shared-ui-toastr-color';

@Component({
  selector: 'shared-toast[color]',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  @Input() set color(color: SharedUiToastrColor) {
    this.toastrColor = color;

    if (color === 'error') {
      this.iconName = 'error';
    } else if (color === 'success') {
      this.iconName = 'check';
    }
  }

  @Input() hasIcon = true;

  @Input() hasClose = false;

  @Input() content = '';

  @Input() templateContent: TemplateRef<unknown> | null = null;

  iconName = '';

  toastrColor!: SharedUiToastrColor;
}
