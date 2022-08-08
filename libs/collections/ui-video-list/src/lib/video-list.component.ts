import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';

import {
  debounceTime,
  distinctUntilChanged,
  Subject,
  takeUntil,
  tap,
} from 'rxjs';

import {
  getVideoSortByOptions,
  Video,
  VideoSortBy,
} from '@private-video-server/collections/data-access';
import { deepClone } from '@private-video-server/shared/util-helpers';

@Component({
  selector: 'collections-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoListComponent implements OnDestroy {
  @Input()
  set videos(videos: Video[]) {
    this._videos = deepClone(videos);
    this.sourceVideos = deepClone(videos);
    this.updateVideosByFilter();
  }

  get videos(): Video[] {
    return this._videos;
  }

  videoSortByOptions = getVideoSortByOptions();

  videoListFilterForm = this.formBuilder.group({
    searchTerm: this.formBuilder.control(''),
    sortBy: this.formBuilder.control(VideoSortBy.CreationDateDesc),
  });

  private _videos: Video[] = [];

  private sourceVideos: Video[] = [];

  private destroySubject = new Subject<void>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder
  ) {
    this.listenToVideoListFilterFormValueChanges();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onVideoDeleted(deletedVideo: Video): void {
    this.videos = this.sourceVideos.filter(
      (video) => video.id !== deletedVideo.id
    );
  }

  private listenToVideoListFilterFormValueChanges(): void {
    this.videoListFilterForm.valueChanges
      .pipe(
        takeUntil(this.destroySubject),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.updateVideosByFilter();
        })
      )
      .subscribe();
  }

  private updateVideosByFilter(): void {
    const { searchTerm, sortBy } = this.videoListFilterForm.value;
    const searchTermTrim = searchTerm.trim();

    let videos: Video[];

    if (searchTermTrim === '') {
      videos = deepClone(this.sourceVideos);
    } else {
      videos = this.sourceVideos.filter(
        (video) =>
          video.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1
      );
    }

    switch (sortBy) {
      case VideoSortBy.CreationAtAsc:
        videos = videos.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        break;
      case VideoSortBy.CreationDateDesc:
        videos = videos.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        break;
      case VideoSortBy.TitleDesc:
        videos = videos.sort((a, b) => b.title.localeCompare(a.title));

        break;
      case VideoSortBy.TitleAsc:
        videos = videos.sort((a, b) => a.title.localeCompare(b.title));

        break;
    }

    this._videos = videos;
    this.changeDetectorRef.detectChanges();
  }
}
