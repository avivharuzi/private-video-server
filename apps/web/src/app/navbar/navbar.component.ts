import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AuthService } from '@private-video-server/shared/data-access-auth';

@Component({
  selector: 'web-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  isNewCollectionModalOpen = false;

  constructor(private readonly authService: AuthService) {}

  onNewCollection(event: MouseEvent): void {
    event.stopPropagation();

    this.isNewCollectionModalOpen = true;
  }

  onCollectionAdded(): void {
    this.isNewCollectionModalOpen = false;
  }

  logout(): void {
    this.authService.logout();
  }
}
