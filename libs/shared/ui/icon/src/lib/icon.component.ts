import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'shared-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() set name(name: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        `/assets/svg/${name}.svg`
      )
    );
    this.#name = name;
  }

  get name(): string {
    return this.#name;
  }

  #name = '';

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {}
}
