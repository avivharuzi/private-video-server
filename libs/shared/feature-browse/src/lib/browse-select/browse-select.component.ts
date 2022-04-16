import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { BrowseSelectType } from './browse-select-type';

@Component({
  selector: 'shared-browse-select[type]',
  templateUrl: './browse-select.component.html',
  styleUrls: ['./browse-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrowseSelectComponent {
  @Input() type: BrowseSelectType = 'directory';

  @Input() isActive = false;
}
