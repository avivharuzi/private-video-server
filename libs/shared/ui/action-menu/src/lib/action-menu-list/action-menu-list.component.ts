import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'shared-action-menu-list',
  templateUrl: './action-menu-list.component.html',
  styleUrls: ['./action-menu-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionMenuListComponent {}
