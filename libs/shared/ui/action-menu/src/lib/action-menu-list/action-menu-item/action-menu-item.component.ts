import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { SharedUiActionMenuItemColor } from '../../shared-ui-action-menu-item-color';

@Component({
  selector: 'shared-action-menu-item',
  templateUrl: './action-menu-item.component.html',
  styleUrls: ['./action-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuItemComponent {
  @Input() iconName = '';

  @Input() color: SharedUiActionMenuItemColor = 'text';
}
