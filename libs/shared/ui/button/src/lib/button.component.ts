import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SharedUiButtonColor } from './shared-ui-button-color';
import { SharedUiButtonShape } from './shared-ui-button-shape';
import { SharedUiButtonSize } from './shared-ui-button-size';
import { SharedUiButtonVariant } from './shared-ui-button-variant';

@Component({
  selector: '[sharedButton]',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() iconName = '';

  @Input() variant: SharedUiButtonVariant = 'contained';

  @Input() shape: SharedUiButtonShape = 'rectangle';

  @Input() color: SharedUiButtonColor = 'primary';

  @Input() size: SharedUiButtonSize = 'md';

  @Input() hasPadding = true;
}
