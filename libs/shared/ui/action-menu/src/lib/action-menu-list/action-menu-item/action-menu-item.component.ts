import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'shared-action-menu-item',
  templateUrl: './action-menu-item.component.html',
  styleUrls: ['./action-menu-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuItemComponent {
  @Input() iconName = '';
}
