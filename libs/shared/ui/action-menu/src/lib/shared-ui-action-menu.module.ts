import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedUiIconModule } from '@private-video-server/shared/ui/icon';

import { ActionMenuDropdownDirective } from './action-menu-dropdown.directive';
import { ActionMenuItemComponent } from './action-menu-list/action-menu-item/action-menu-item.component';
import { ActionMenuListComponent } from './action-menu-list/action-menu-list.component';
import { ActionMenuOriginDirective } from './action-menu-origin.directive';
import { ActionMenuComponent } from './action-menu.component';

@NgModule({
  imports: [CommonModule, SharedUiIconModule],
  declarations: [
    ActionMenuComponent,
    ActionMenuOriginDirective,
    ActionMenuDropdownDirective,
    ActionMenuListComponent,
    ActionMenuItemComponent,
  ],
  exports: [
    ActionMenuComponent,
    ActionMenuOriginDirective,
    ActionMenuDropdownDirective,
    ActionMenuListComponent,
    ActionMenuItemComponent,
  ],
})
export class SharedUiActionMenuModule {}
