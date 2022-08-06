import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

import {
  BehaviorSubject,
  debounceTime,
  distinctUntilChanged,
  Observable,
  of,
  switchMap,
} from 'rxjs';

import {
  Video,
  VideosService,
} from '@private-video-server/collections/data-access';
import { AuthService } from '@private-video-server/shared/data-access-auth';

@Component({
  selector: 'web-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  @ViewChild('searchInputElement', { read: ElementRef })
  searchInputElement!: ElementRef<HTMLInputElement>;

  isNewCollectionModalOpen = false;

  searchValueSubject = new BehaviorSubject<string>('');

  searchVideos$: Observable<Video[]> = this.searchValueSubject.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    switchMap((searchTerm) => {
      if (searchTerm.trim() === '') {
        return of([]);
      }

      return this.videosService.getAll({
        searchTerm,
      });
    })
  );

  isSearchVideosVisible = false;

  constructor(
    private readonly authService: AuthService,
    private readonly videosService: VideosService
  ) {}

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

  onSearchInput(): void {
    this.searchValueSubject.next(this.searchInputElement.nativeElement.value);
  }
}
