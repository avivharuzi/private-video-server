import { TemplateRef } from '@angular/core';

import { SharedUiToastrColor } from './shared-ui-toastr-color';

export interface SharedUiToastrMessageOptions {
  color: SharedUiToastrColor;
  hasIcon: boolean;
  hasClose: boolean;
  content: string;
  templateContent: TemplateRef<unknown> | null;
  timeout: number;
}
