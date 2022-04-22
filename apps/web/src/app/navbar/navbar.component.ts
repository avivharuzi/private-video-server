import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'web-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isNewCollectionModalOpen = false;

  onNewCollection(event: MouseEvent): void {
    event.stopPropagation();

    this.isNewCollectionModalOpen = true;
  }

  onCollectionAdded(): void {
    this.isNewCollectionModalOpen = false;
  }
}
