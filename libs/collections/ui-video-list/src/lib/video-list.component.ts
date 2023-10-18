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

import { VideoListFilterFormValue } from './video-list-filter-form-value';
import { VIDEO_LIST_SORT_BY_STORAGE_KEY } from './video-list-sort-by-storage-key';

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
    sortBy: this.formBuilder.control(this.getVideoListSortByInitValue()),
  });

  private _videos: Video[] = [];

  private sourceVideos: Video[] = [];

  private destroySubject = new Subject<void>();

  constructor(
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly formBuilder: FormBuilder,
  ) {
    this.listenToVideoListFilterFormValueChanges();
  }

  ngOnDestroy(): void {
    this.destroySubject.next();
  }

  onVideoDeleted(deletedVideo: Video): void {
    this.videos = this.sourceVideos.filter(
      (video) => video.id !== deletedVideo.id,
    );
  }

  private getVideoListSortByInitValue(): VideoSortBy {
    const sortByFromStorage = localStorage.getItem(
      VIDEO_LIST_SORT_BY_STORAGE_KEY,
    );

    if (
      sortByFromStorage &&
      Object.values(VideoSortBy).includes(sortByFromStorage as VideoSortBy)
    ) {
      return sortByFromStorage as VideoSortBy;
    }

    return VideoSortBy.TitleAsc;
  }

  private listenToVideoListFilterFormValueChanges(): void {
    this.videoListFilterForm.valueChanges
      .pipe(
        takeUntil(this.destroySubject),
        debounceTime(300),
        distinctUntilChanged(),
        tap(() => {
          this.updateVideosByFilter();
        }),
      )
      .subscribe();
  }

  private updateVideosByFilter(): void {
    const { searchTerm, sortBy } = this.videoListFilterForm
      .value as VideoListFilterFormValue;
    localStorage.setItem(VIDEO_LIST_SORT_BY_STORAGE_KEY, sortBy);
    const searchTermTrim = searchTerm.trim();

    let videos: Video[];

    if (searchTermTrim === '') {
      videos = deepClone(this.sourceVideos);
    } else {
      videos = this.sourceVideos.filter(
        (video) =>
          video.title.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1,
      );
    }

    switch (sortBy) {
      case VideoSortBy.CreatedAtAsc:
        videos = videos.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );

        break;
      case VideoSortBy.CreatedAtDesc:
        videos = videos.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
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
